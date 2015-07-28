class FSApiController{
	constructor(){
		this.api = "https://api.foursquare.com/v2/";
		this.version = 20150404;
		this.mode = "swarm";
		this.token = document.location.hash.split('=')[1];
		this.history = [];

		this.status = document.createElement("div");
		let statusText;
		if(this.token){
			statusText = document.createTextNode('logged in');
		} else {
			statusText = document.createTextNode("unable to fetch token from URL");
		}
		this.status.appendChild(statusText);
		document.body.appendChild(this.status);
	}

	getCheckinHistory(offset = 0){
		console.log(`offset ${offset}`);
		const xhr = new XMLHttpRequest();
		const url = `https://api.foursquare.com/v2/users/self/checkins?oauth_token=${this.token}&sort=oldestfirst&offset=${offset}&v=20150404&m=swarm&limit=250`
	    xhr.open("GET", url);
	    xhr.send(null);
	    const promise = new Promise((resolve, reject)=>{
	    	xhr.onload = (res) =>{
		    	this.history.push(...JSON.parse(xhr.responseText).response.checkins.items);
		    	// console.log(this.history);
	    		// console.log(JSON.parse(xhr.responseText).response.checkins.items);
		    	if(JSON.parse(xhr.responseText).response.checkins.items.length === 250){
		    		var newOffset = offset+250;
		    		// console.log(newOffset);
		    		// I don't want to have to make a bunch of calls during development. Uncomment next line, and remove following when done debugging
		    		// this.getCheckinHistory(newOffset).then(resolve);
		    		resolve();
		    	} else{
			    	const statusText = document.createTextNode("fetched history");
			    	this.status.appendChild(statusText);
		    		resolve();
		    	}
	    	}
	    });

	    return promise;
	}


	getCheckinsInRange(startDate, endDate){
		// this.db.
	}

	getNewestCheckins(){
		//Look at latest checkin
		//Fetch next 250 checkins (max allowed at once by API)
		//If there are more, recurse
	}
}