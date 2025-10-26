
import './App.css'
import {geocodingApi,weatherApi,countryApi,API_KEY} from "./services/api.js"
import { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [Fetch, setFetch] = useState('New York');
  const [loading, setLoading] = useState(true);
  const [countryData, setCountryData] = useState(null);
  const [GeoData, setGeoData] = useState(null);
  const fetchWeatherData = async (cityName) => {
      try {
        // Fetch geocoding data to get latitude and longitude
        setLoading(true);
        const geoResponse = await geocodingApi.get('direct', {
          params: {
            q: cityName ,
            limit: 1,
            appid: API_KEY
          }
        });
        
        if (geoResponse.data.length === 0) {
          console.error('Location not found');
          return;
        }
        console.log(geoResponse.data);

        const { lat, lon} = geoResponse.data[0];
        // Fetch weather data using the obtained latitude and longitude
      
          const weatherResponse = await weatherApi.get('weather', {
            params: {
              lat,
              lon,
              appid: API_KEY,
              units: 'metric' // Use 'imperial' for Fahrenheit
            }
          });
      const {country} = geoResponse.data[0];
      const countryResponse = await countryApi.get('paises/'+country);
      console.log("Dados País");
        console.log(country);
          console.log(countryResponse);
          setWeatherData(weatherResponse.data);
          setCountryData(countryResponse.data);
          setGeoData(geoResponse.data);
          console.log("Dados:");
          console.log(weatherResponse.data.main);
          console.log(weatherResponse);
          if (countryResponse.data[0]== undefined) {
          setWeatherData(null);
          console.error('Location not found');
          return;
        }
        }catch(e) {
          console.error('Error fetching geocoding data:', e);
        }
      }

      useEffect(() => {
        
        fetchWeatherData(Fetch);
        setLoading(false);
      },[Fetch]);

      const linkimg = ()=> {
        const imglink = "https://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png";
        return(
            <img src={imglink} width="50" height="50"></img>
        )
      }
  return (

/*  OU VOCÊ PODE FAZER ASSIM:
    // Exemplo usando ifs ao invés de operador ternário { loading ? ... } para renderização condicional
  let content;
  if (loading) {
    content = <p>Carregando...</p>;
  } else if (weatherData) {
    content = (
      <>
        <p>Temperatura: {weatherData.main.temp}°C</p>
        <p>Clima: {weatherData.weather[0].description}</p>
        <p>Humidade: {weatherData.main.humidity}%</p>
        <p>Velocidade do Vento: {weatherData.wind.speed} m/s</p>
      </>
    );
  } else {
    content = <p>Dados do clima não disponíveis.</p>;
  }

  return (
    <>
      <h1>Tempo</h1>
      <div>
        <p>Cidade: {city}</p>
        {content}
      </div>
    </>
  
  */

    <>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous"></link>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
      </head>
      <h1 class="display-1">Como está o tempo em: {Fetch}?</h1> <br></br>
      <div>
    <form>
    <div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Digite uma Cidade:  </span>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Cidade" value={Fetch} onChange={(e) => setFetch(e.target.value)}>
</input>
</div> 
<br></br>
    </form>
        <h2 class="display-6">Dados</h2>
        {loading ? (
          <p>Carregando...</p>
        ) : weatherData ? (
          <>
            <div class="card text-bg-dark mb-3">
              <div class="card-body">
                <h5 class="card-title">País</h5>
                <p class="card-text">O nome do pais é: {countryData[0].nome.abreviado}. A sigla do Páis é {weatherData.sys.country}.</p>
                <p class="card-text">O estado é: {GeoData[0].state}</p>
                <p class="card-text">Língua oficial: {countryData[0].linguas[0].nome}</p>

              </div>
            </div>
            <div class="card text-bg-dark mb-3">
              <div class="card-body">
              <h5 class="card-title">Temperatura</h5>
            <p class="card-text">Atual: {weatherData.main.temp}°C</p>
            <p class="card-text">Sensação Térmica: {weatherData.main.feels_like}°C</p>
            <p class="card-text">Clima: {weatherData.weather[0].description}{linkimg()}</p>
            </div>
            </div>
            <div class="card text-bg-dark mb-3">
              <div class="card-body">
              <h5 class="card-title">Outros:</h5>
            <p class="card-text">Humidade: {weatherData.main.humidity}%</p>
            <p class="card-text">Velocidade do Vento: {weatherData.wind.speed} m/s</p>
                        </div>
            </div>

          </>
        ) : (
          <p>Dados do clima não disponíveis.</p>
        )}
      </div>
    </>
  )
}

export default App
