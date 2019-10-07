window.addEventListener('load', ()=> {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimezone = document.querySelector('.locationTimezone');

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.lattitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";

			const api = `https://api.darksky.net/forecast/47a38e34b18cf776b5fa33fb30247db8/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.JSON.parse();
				});

				.then(data => {
					console.log(data);
					// the const vairiable wrapped in brackets will allow this to pull data directly from currently
					const {temperature, summary} = data.currently;
				}); 
			});

		   };
	});


				.then(data => {
					console.log(data);