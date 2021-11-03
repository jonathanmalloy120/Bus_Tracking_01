mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXRoYW5tYWxsb3kxMjAiLCJhIjoiY2t1eTh4czY4NzBqODMxbzNhcGp6d3Z6MiJ9.HwXNB6LtjYW5blpxI0f3lw';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.104081,42.36554],
        zoom: 13
    });
	const markerArray = [];

	//old, but good example how to add a marker
    // var marker = new mapboxgl.Marker()
    //   .setLngLat([-71.092761, 42.357575])
    //   .addTo(map);

	//fuctions to get bus data
	async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	
	//console.log(locations[0].attributes.latitude); <-- this will get you the latitude for one bus
	locations.forEach((bus) => {
		//make sure marker array and locations array are the same length
		while (locations.length != markerArray.length){
			//if there are more buses, add bus to array
			if (locations.length > markerArray.length) {
				let addMarker = new mapboxgl.Marker({
					color: "red"
				}).setLngLat([-71.092761, 42.357575]).addTo(map);
				markerArray.push(addMarker);
			//if there are too many markers, remove one
			} else {
				let removeMarker = markerArray.pop();
				removeMarker.remove();
			}
			//console.log("length of locations is " + locations.length);
			//console.log(markerArray)
		}
		//not that the arrays are the same, we can update them with the new long/lat
		//position = [bus.attributes.longitude,.attributes.latitude]
		markerArray.forEach((marker,i) => {
			//console.log("counter = " + i);
			//console.log("long and lat = " + locations[i].attributes.longitude,locations[i].attributes.latitude)
			marker.setLngLat([locations[i].attributes.longitude,locations[i].attributes.latitude]);
		})
	})

	// timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

run();
