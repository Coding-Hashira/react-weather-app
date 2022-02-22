import React, { useState, useEffect } from "react";
import "./card.css";

const Card = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [weatherBg, setWeatherBg] = useState("coldBase");
  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 19;

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather/?q=${query}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((weather) => {
          setQuery("");
          setWeather(weather);
          console.log(weather);
        });
    }
  };

  useEffect(() => {
    if (weather.weather) {
      if (weather.weather[0].main === "Clear" && isDayTime) {
        setWeatherBg("dayClear");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Clear" && !isDayTime) {
        setWeatherBg("nightClear");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Thunderstorm") {
        setWeatherBg("thunderstorm");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Rain") {
        setWeatherBg("rainy");
        console.log(weatherBg);
      } else if (
        weather.weather[0].main === "Dust" &&
        weather.weather[0].main === "Sand"
      ) {
        setWeatherBg("sandy");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Snow" && isDayTime) {
        setWeatherBg("daySnow");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Snow" && !isDayTime) {
        setWeatherBg("nightSnow");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Clouds" && isDayTime) {
        setWeatherBg("dayCloudy");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Clouds" && !isDayTime) {
        setWeatherBg("nightCloudy");
        console.log(weatherBg);
      } else if (weather.weather[0].main === "Haze" && isDayTime) {
        setWeatherBg("dayMist");
      } else if (
        (weather.weather[0].main === "Haze" ||
          weather.weather[0].main === "Mist" ||
          weather.weather[0].main === "Fog") &&
        isDayTime
      ) {
        setWeatherBg("dayMist");
      } else if (
        (weather.weather[0].main === "Haze" ||
          weather.weather[0].main === "Mist" ||
          weather.weather[0].main === "Fog") &&
        !isDayTime
      ) {
        setWeatherBg("nightMist");
      } else if (weather.weather[0].main === "Smoke") {
        setWeatherBg("smoke");
      } else if (weather.weather[0].main === "Smoke") {
        setWeatherBg("smoke");
      } else if (weather.weather[0].main === "Tornado") {
        setWeatherBg("tornado");
      } else if (weather.weather[0].main === "Ash") {
        setWeatherBg("volcanicAsh");
      }
    }
  }, [weather]);

  const DateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={`Card ${weatherBg}`}>
      <main>
        <div className="searchBox">
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            className="searchBar"
            placeholder="Search"
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="">
            <div className="locationBox">
              <div className="location">
                {weather?.name}, {weather?.sys.country}
              </div>
              <div className="date">{DateBuilder(new Date())}</div>
            </div>
            <div className="weatherBox">
              <div className="temp">
                {`${Math.round(weather?.main.temp)}ºc`}
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="baseBox">
            <h1 className="baseText">
              Enter Any Location View Weather
            </h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default Card;
