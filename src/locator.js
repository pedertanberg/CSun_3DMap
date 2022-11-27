export async function shopLocator() {
	const searchUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
	//get current geolocation position
// const pos = navigator.geolocation.getCurrentPosition(position => console.log(position))
	
// console.log(pos)

	const params = {
		f: 'json',
		category: 'Bar or Pub,Restaurant, Winery',	
		location: [10.70083053, 59.922662976],
		outFields: ['Place_addr', 'PlaceName'],
		maxLocations: 350,
	};

	const paramVals = [];
	for (const k in params) {
		const val = encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
		paramVals.push(val);
	}
	const url = `${searchUrl}?${paramVals.join('&')}`;
	const data = await fetch(url);
	const { candidates } = await data.json();
	return candidates;
}
