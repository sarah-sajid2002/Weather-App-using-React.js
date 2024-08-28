import "./index.css";
import { FaSearchLocation } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsClouds } from "react-icons/bs";
import { FaWind } from "react-icons/fa";

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
          setCityName("");
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
      setCityName("");
    } else {
      toast("fill city name!");
    }
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
            <input
              type="text"
              placeholder="Enter City"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
            />
            <FaSearchLocation className="searchIcon" onClick={handelSubmit} />
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
              {weatherData != null ? <hr /> : null}
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
                  <div className="Clouds">
                    <h3>
                      <BsClouds /> Clouds
                    </h3>
                    <h3>{weatherData.clouds.all}%</h3>
                  </div>
                  <div className="Wind">
                    <h3>
                      <FaWind /> Wind
                    </h3>
                    <h3>{weatherData.wind.speed} m/s</h3>
                  </div>
                  <div className="Weather">
                    <h3>
                      <FaWind /> Weather
                    </h3>
                    <h3>{weatherData.weather[0].main}</h3>
                  </div>
                  <div className="Weather">
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
