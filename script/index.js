const APIKey = "6373229dcd4074fabc8a8b3e0d64d47f";
const WeatherAPIUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const CountryAPIUrl = "https://restcountries.com/v2/all";


const countryContainer = document.getElementById("country-cards");
const block = document.getElementById("weather-block");
const blockTitle = document.getElementById("weather-title");
const weatherDetails = document.getElementById("weather-details");
const closeBlock = document.getElementById("close-block");

fetch(CountryAPIUrl)
    .then(response => response.json())
    .then(data =>{
        data.forEach(country =>{
            const card = document.createElement('div');
            card.className = 'country-card';
            card.innerHTML = `
                <img src = "${country.flag}" alt = "Flag of ${country.name}">
                <h3>${country.name}</h3>
                <p>Capital: ${country.capital || 'NA'}</p>
                <p>Region: ${country.region}</p>
                <p>Code: ${country.alpha3Code}</p>
                <button data-capital= "${country.capital}" data-country = "${country.name}"> Click for Weather</button>
            `;
            countryContainer.appendChild(card);
        });

        const buttons = document.querySelectorAll('.country-card button');
        buttons.forEach(button =>
            button.addEventListener('click', event =>{
                const capital = event.target.dataset.capital;
                fetchWeather(capital);
            })
        );
    });

    function fetchWeather(capital){
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${APIKey}`)
            .then(response => response.json())
            .then(data =>{
                if(data.cod === 200){
                    alert(`Weather in ${data.name}: ${data.weather[0].description}, Temperature : ${data.main.temp}F`)
                }else{
                    alert('No data found for this location')
                }
            })
            .catch(error => console.error('Error fetching weather:', error))
    }

    // function fetchWeather(capital){
    //     if(!capital){
    //         weatherDetails.textContent = 'Weather data is not available';
    //         block.classList.remove('hidden');
    //         return;
    //     }

    //     const url = `${WeatherAPIUrl}?q=${capital}&appid=${APIKey}&units=metric`;
    //     weatherDetails.textContent= 'Loading...';

    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data =>{
    //             if(data.cod === 200){
    //                 weatherDetails.innerHTML = `
    //                     <p><strong>${country}</strong></p>
    //                     <p>Temperature: ${data.main.temp}C</p>
    //                     <p>Weather: ${data.weather[0].description}</p>
    //                     <p>Humidity: ${data.main.humidity}%</p>
    //                 `;
    //             }else{
    //                 weatherDetails.textContent = "Failed to fetch data";
    //             }
    //             block.classList.remove('hidden');
    //         });

    //         .catch(() =>{
    //             weatherDetails.textContent = 'Error fetching data';
    //             block.classList.remove('hidden');
    //         });
    // }

    // closeBlock.addEventListener('click', () =>{
    //     block.classList.add('hidden');
    // });