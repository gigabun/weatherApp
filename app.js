window.addEventListener('load', ()=> {
	const long;
	const lat;
	const temperatureDescription = document.querySelector('.temperature-description');
	const temperatureDegree = document.querySelector('.temperature-degree');
	const locationTimezone = document.querySelector('.location-timezone');
	const temperatureSection = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = "https://cors-anywhere.herokuapp.com/";

			const api = `${proxy}https://api.darksky.net/forecast/47a38e34b18cf776b5fa33fb30247db8/${lat},${long}`;

			fetch(api)
				.then(response => {
					return response.json();
				})

				.then(data => {
					console.log(data);

					// the const vairiable wrapped in brackets will allow this to pull data directly from currently
					const {temperature, summary, icon} = data.currently;

					// set DOM elements from the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					// formula for celcius 
					const celcius = (temperature - 32) * (5 /9);

					// set icon
					setIcons(icon, document.querySelector('.icon'));

					// toggle between fahrenheit and celsius 
					temperatureSection.addEventListener('click', () => {
						if(temperatureSpan.textContent === 'F') {
							temperatureSpan.textContent = 'C';
							temperatureDegree.textContent = Math.floor(celcius);

						} else {
							temperatureSpan.textContent = 'F';
							temperatureDegree.textContent = temperature;

						}
					})

				}); 
			});

		};

		function setIcons(icon, iconID) {
			const skycons = new Skycons({color: "white"});
			const currentIcon = icon.replace(/-/g, "_").toUpperCase();
			skycons.play();
			return skycons.set(iconID, Skycons[currentIcon]);
		}


	});


				