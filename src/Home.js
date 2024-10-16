import React, { useState } from "react";
import axios from "axios";
import "./Style.css";

const Home = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleInputValue = () => {
    setError("");
    if (name !== "") {
      setLoading(true);
      // const apiKey = "b3469aacdace7557a8c6a339dd602976";
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`;

      axios
        .get(apiURL)
        .then((res) => {
          setError("");
          let imagePath = "";
          if (res.data.weather[0].main === "Clouds") {
            imagePath = "/images/clouds.png";
          } else if (res.data.weather[0].main === "Clear") {
            imagePath = "/images/clear.png";
          } else if (res.data.weather[0].main === "Rain") {
            imagePath = "/images/rain.png";
          } else if (res.data.weather[0].main === "Drizzle") {
            imagePath = "/images/drizzle.png";
          } else if (res.data.weather[0].main === "Mist") {
            imagePath = "/images/mist.png";
          } else {
            imagePath = "/images/clouds.png";
          }
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            image: imagePath,
          });
          setName("");
          setLoading(false);
        })
        .catch((err) => {
          //   // console.log(err);
          setLoading(false);
          setError("❌🌍 Location not found. Please enter a valid city. 🌆🔍");
          setName("");
        });
    }
  };

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city name"
            onChange={(e) => setName(e.target.value.toLowerCase())}
            value={name}
            autoFocus
          />
          <button onClick={handleInputValue}>
            <img src="images/search.png" alt="search button" />
          </button>
        </div>

        {loading && <div className="loader"></div>}

        {error && <p className="error">{error}</p>}

        {!data && !loading && !error && (
          <div className="message">
            {" "}
            <p>🌍✨ Please enter a city name to get weather information! ☀️🌧️</p>
          </div>
        )}

        {data && !loading && !error && (
          <>
            <div className="winfo">
              <img src={data.image} alt="weather" />
              <h1>{Math.round(data.celcius)}°c</h1>
              <h2>{data.name}</h2>
            </div>
            <div className="details">
              <div className="col">
                <img src="images/humidity.png" alt="" />
                <div>
                  <p>{Math.round(data.humidity)}%</p>
                  <p>humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="images/wind.png" alt="" />
                <div>
                  <p>{Math.round(data.speed)} km/h</p>
                  <p>wind</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
