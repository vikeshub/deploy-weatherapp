import React, { useState, useEffect } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./Weather.css";

const Weather = ({ darkMode }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();
  const [error, setError] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const API_KEY = "5acc1683650652bab831ecf7d57fd397";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function handleonchange(e) {
    setCity(e.target.value);
  }

  async function fetchData() {
    try {
      let response = await fetch(url);
      let output = await response.json();
      if (response.ok) {
        setWeather(output);
        setError("");
      } else {
        setError("No data found. Please enter correct city name.");
      }
    } catch (error) {}
  }

  return (
    <div className={darkMode ? "container dark" : "container"}>
      <div className="city">
        <input
          type="text"
          value={city}
          onChange={handleonchange}
          placeholder="Enter your city name"
          className={darkMode ? "dark" : ""}
        />
        <button onClick={fetchData} className={darkMode ? "dark" : ""}>
          <FaSearch></FaSearch>
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weatherimg"
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>
          <div className="weather-temp">
            <h2>
              {weather.main.temp}
              <span>&deg;C</span>
            </h2>
          </div>
          <div className="weather-city">
            <div className="location">
              <MdLocationOn></MdLocationOn>
            </div>
            <p>
              {weather.name},<span>{weather.sys.country}</span>
            </p>
          </div>

          <div className="weather-stats">
            <div className="wind">
              <div className="wind-icon">
                <FaWind></FaWind>
              </div>
              <h3 className="wind-speed">
                {weather.wind.speed}
                <span>Km/h</span>
              </h3>
              <h3 className="wind-heading">Wind Speed</h3>
            </div>
            <div className="humidity">
              <div className="humidity-icon">
                <WiHumidity></WiHumidity>
              </div>
              <h3 className="humidity-percent">
                {weather.main.humidity}
                <span>%</span>
              </h3>
              <h3 className="humidity-heading">Humidity</h3>
            </div>
          </div>
          <div className="date-time">
            <h3 className="current-datetime">
              {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
