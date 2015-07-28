// import fourStoryMap from "mapController"

const apiController = new FSApiController();
const map = new fourStoryMap('map');

apiController.openDatabase();
// Object.observe(apiController.history, (value)=>{
// 	map.updateMarkers(apiController.history);
// });
Promise.all([apiController.openDatabase()]).then(function(results){
	console.log('opened database');
	console.log(apiController.history);
	map.updateMarkers(apiController.history);
});

// window.setTimeout(function(){
// 	map.updateMarkers(apiController.history);
// 	console.log("timeout!");
// }, 10000);