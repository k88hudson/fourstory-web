class databaseController{
	constructor(){
		var db;
		var request = indexedDB.open("FourStoryDB");
		request.onerror = (event) => {
		  // Generic error handler for all errors targeted at this database's
		  // requests!
		  alert("Database error: " + event.target.errorCode);
		};

		request.onsuccess = (event) => {
			console.log("db successfully opened");
			this.db = event.target.result;
			//Ok the DB is opened and data is added to it (because this gets called after onupgradeneeded is successful)
			//So let's try and pull checkins in a fixed time range out of the IndexedDB.
			let endTime = parseInt(Date.now()/1000);
			var dateRange = IDBKeyRange.bound(0, endTime, true, true);
			var objectStore = this.db.transaction("checkins").objectStore("checkins");
			var index = objectStore.index("createdAt");
			let i=0;
			index.openCursor(dateRange, "prev").onsuccess = (event) =>{
				var cursor = event.target.result;
				if (cursor) {
					this.history.push(cursor.value);
					// console.log(cursor.value.venue.name);
					cursor.continue();
				}
			}
			//This works, so some things next up: Fetch all of the user's data, bind the date range searching to a UI element


			// var index = this.db.objectStore.index("createdAt")
			// this.db.transaction("checkins","readonly").objectStore("checkins").get("55288597498ead4043c9ef40").onsuccess = (event)=>{
				// console.log(event.target.result);
			// };

		};

		request.onupgradeneeded = (event)=>{
			console.log("upgrading db");
			this.db = event.target.result;
			//1.) dump DB, then fetch oldest checkins
			//2.) call method to fetch checkins newer than those
			//3.) recurse 2
			var objectStore = this.db.createObjectStore("checkins", { keyPath: "id" });
			objectStore.createIndex("createdAt", "createdAt", { unique: true });
			// objectStore.createIndex("latitude", "venue.location.lat", { unique: false });
			// objectStore.createIndex("longitude", "venue.location.lng", { unique: false });
			objectStore.transaction.oncomplete = (event) => {
			    let historyPromise = apiController.getCheckinHistory();
			    historyPromise.then(()=>{
			    // Store values in the newly created objectStore.
			    var checkinObjectStore = this.db.transaction("checkins", "readwrite").objectStore("checkins");
			    // let foo = checkinObjectStore.add({"createdAt":1258993332});
			    // console.log(checkinObjectStore);
			    // foo.onsuccess = function(){
			    // 	console.log('success');
			    // }
			    // foo.onerror = function(){
			    // 	console.log('error');
			    // }
			    	console.log(this.history);
			    	console.log("history promise completed");
					 for (var checkin of this.history) {
					 	// console.log(checkin);
				        let save = checkinObjectStore.add(checkin);
				        save.onsuccess=()=>{
					    	console.log("write transaction");
				        }
				    }
				});
			};
		}
	}
}