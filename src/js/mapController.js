class fourStoryMap{
	constructor(elementId){
		this.map = L.map(elementId);
		this.customTilesUrl = 'http://{s}.tiles.mapbox.com/v4/alanmoo.ll4kikll/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiYWxhbm1vbyIsImEiOiIzN0pFVDVZIn0.MUpIBwrMiV7QB2H8OtDUvQ';
		L.tileLayer(this.customTilesUrl, {maxZoom: 18}).addTo(this.map);
		this.map.setView([0,0],2);
		this.initPromise = new Promise((resolve, reject)=>{
			//TODO: Initalize to fixed location after X seconds/getCurrentPosition failure, or maybe location of last checkin
			navigator.geolocation.getCurrentPosition((loc)=>{
				this.currentLocation = loc.coords;
				this.map.setView([loc.coords.latitude, loc.coords.longitude], 15, {animate:true});
				// this.bindMapRedraw();
				resolve();
			});
		});
	}
	updateMarkers(checkins){
		//Only gets passed in on the first call
		// this.map.eachLayer((layer)=>{
		// 	console.log(layer);
		// 	this.map.removeLayer(layer);
		// });
		if(checkins){
			this.checkins = checkins;
		}

		for (var checkin of this.checkins){
			//Figure out how to check if a marker exists for this location
			//If it does, maybe add the date of the checkin to the marker?
			if(checkin.venue){
				const checkincoords = [checkin.venue.location.lat, checkin.venue.location.lng];

			//Not sure I need to worry about amount of markers on the map. Will test for performance when I have more data.
			// if(this.map.getBounds().contains(checkincoords)){
				L.marker(checkincoords).bindPopup(`${checkin.venue.name} ${new Date(checkin.createdAt*1000)}`).addTo(this.map);
			// }
			}
		};
	}
	
	//Not sure I need to worry about amount of markers on the map. Will test for performance when I have more data.
	// bindMapRedraw(){
	// 	this.map.on('moveend', ()=>{
	// 		this.updateMarkers();
	// 	});
	// }
}