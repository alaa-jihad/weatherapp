import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Weatherapp.css';
import { WiDayCloudy, WiHumidity, WiStrongWind } from 'weather-icons-react';


const WeatherApp = () => {
  const [currentData, setCurrentData] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState('');
  const [temp, setTemp] = useState('');
  const [location, setLocation] = useState('');
  const [humidity, setHumidity] = useState('');
  const [wind, setWind] = useState('');
  const [dy, setDY] = useState('');

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city === '') {
        return;
      }

      const apiKey = '822fb5f78a029a1428a38b676861f623';
      const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apiKey}`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=Metric&appid=${apiKey}`;

      try {
        // Fetch current weather data
        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();

        // Fetch forecast data
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        setCurrentData(currentData);
        setHumidity(currentData.main.humidity+"%");
        setWind(currentData.wind.speed+" km/h");
        setTemp(currentData.main.temp+" c");
        setLocation(currentData.name);
        setDY(currentData.dt_txt);
        setForecastData(forecastData.list.slice(0, 5)); // Assuming 5 days of forecast data

      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error gracefully in a real-world application
      }
    };

    fetchWeatherData();
  }, [city]);
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="search" />
        <div className="search-icon" onClick={() => setCity(document.getElementsByClassName('cityInput')[0].value)}>
          <i className="bi bi-search" style={{ fontSize: '1.5rem', color: '#007BFF' }}></i>
        </div>
      </div>
      <div className="weather-image">
        <WiDayCloudy size={150} color="#dceb12" />
      </div>
      <div className="weather-temp">{temp}</div>
      <div className="weather-location">{location}</div>
      <div className="data-container">
        <div className="element">
          <WiHumidity size={40} color="#007BFF" />
          <div className="data">
            <div className="humidity">{humidity}</div>
            <div className="text">Hum</div>
          </div>
        </div>
        <div className="element">
          <WiStrongWind size={40} color="#007BFF" />
          <div className="data">
            <div className="wind">{wind}</div>
            <div className="text">WS</div>
          </div>
        </div>
      </div>
      <div className="forecast-container-vertical">
        {forecastData.map((forecastItem, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-day-vertical">{forecastItem.dt_txt}</div>
            <div className="forecast-icon-vertical"></div>
            <div className="forecast-temperature-vertical">{forecastItem.main.temp}</div></div>))}
            
         
        
      </div>
    </div>
     
  );
};

export default WeatherApp;