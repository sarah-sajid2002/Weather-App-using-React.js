import "./index.css";
import { FaSearchLocation } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsClouds } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { FaClock } from "react-icons/fa";

import weatherImagesData from "./Data";
import { useState } from "react";
function App() {
  let [cityName, setCityName] = useState("");
  let [weatherData, setWeatherData] = useState(null);
  let [imageToShow, setImageToShow] = useState("clouds");
  let Url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=751d66e130befad396405dc13796a57c`;

  let getData = () => {
    fetch(Url)
      .then((res) => res.json())
      .then((finalRes) => {
        if (finalRes.cod === "404") {
          setWeatherData(null);
          toast("City not found!");
        } else {
          setWeatherData(finalRes);
          setImageToShow(finalRes.weather[0].main.toLowerCase());
        }
      });
  };
  function handelSubmit() {
    if (cityName) {
      getData();
      console.log(weatherData);
    } else {
      toast("fill city name!");
    }
  }
  function getCurrentDate() {
    const now = new Date();

    // Options for date formatting
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    // Formatting date and time
    const date = now.toLocaleDateString(undefined, dateOptions);
    const time = now.toLocaleTimeString(undefined, timeOptions);

    return `${date}`;
  }
  function getCurrentTime() {
    const now = new Date();
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const time = now.toLocaleTimeString(undefined, timeOptions);
    return `${time}`;
  }

  return (
    <>
      <div
        className="mainDiv"
        style={{
          backgroundImage: `url(${
            weatherImagesData[imageToShow] || weatherImagesData.clouds
          })`,
        }}
      >
        <ToastContainer />

        <div className="header">Weather App ⛅ </div>
        <div className="weatherDiv">
          <div className="inputDiv">
            <div className="input">
              <input
                type="text"
                placeholder="Enter City"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
              <FaSearchLocation className="searchIcon" onClick={handelSubmit} />
            </div>

            <div className="time">
              <p>
                <SlCalender />
                {`  ${getCurrentDate()}`}
              </p>
              <p>
                <FaClock />
                {` ${getCurrentTime()}`}
              </p>
            </div>
          </div>

          <div className="herSection">
            <div className="showWeatherDiv">
              {weatherData != null ? (
                <>
                  <h1>
                    {(weatherData.main.temp - 273.15).toFixed(1)}°<sub>C</sub>
                  </h1>
                  <h3>
                    Feels Like :
                    {(weatherData.main.feels_like - 273.15).toFixed(1)}°
                    <sub>C</sub>
                  </h3>

                  <p>
                    {weatherData.name}, {weatherData.sys.country}
                  </p>
                </>
              ) : (
                <h2>No Data To Show!</h2>
              )}
              {weatherData != null ? <hr className="line" /> : null}
              {weatherData != null ? (
                <>
                  <p>
                    min-temp : {(weatherData.main.temp_min - 273.15).toFixed(1)}
                    °<sub>C</sub>
                  </p>

                  <p>
                    max-temp : {(weatherData.main.temp_max - 273.15).toFixed(1)}
                    °<sub>C</sub>
                  </p>
                </>
              ) : null}
            </div>
            {weatherData != null ? <span></span> : null}

            <div className="extras">
              {weatherData != null ? (
                <>
                  <div className="Clouds extraFeatures">
                    <h3>
                      <BsClouds /> Clouds
                    </h3>
                    <h3>{weatherData.clouds.all}%</h3>
                  </div>
                  <div className="Wind extraFeatures">
                    <h3>
                      <FaWind /> Wind
                    </h3>
                    <h3>{weatherData.wind.speed} m/s</h3>
                  </div>
                  <div className="Weather extraFeatures">
                    <h3>
                      <FaWind /> Weather
                    </h3>
                    <h3>{weatherData.weather[0].main}</h3>
                  </div>
                  <div className="Pressure extraFeatures">
                    <h3>Pressure</h3>
                    <h3>{weatherData.main.pressure}</h3>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
