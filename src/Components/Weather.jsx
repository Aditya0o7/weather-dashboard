import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./weatherStyle.css";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";

const Weather = () => {
    const [notification, setNotification] = useState(null);
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [fadeInClass, setFadeInClass] = useState("");
    const navigate = useNavigate();
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {

        setFadeInClass("fade-in");
    }, []);

    const fetchWeather = async () => {
        if (!city) {
            setNotification({ message: "Please enter a city name", type: "error" });
            return;
        }
        setNotification(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            if (!response.ok) {
                setNotification({ message: "City not found", type: "error" });
                throw new Error("City not found");
            }
            const data = await response.json();
            setWeatherData({
                temp: data.main.temp,
                description: data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                city: data.name,
            });
            setError(null);
        } catch (err) {
            setWeatherData(null);
            setError(err.message);
            setNotification({ message: err.message, type: "error" });
        }
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className={`weather-container ${fadeInClass}`}>
            <div className="weather-header">
                <h1>🌤 Fetch Weather</h1>
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className="search-section">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="search-bar"
                />
                <button onClick={fetchWeather} className="search-btn">
                    Search
                </button>
            </div>
            {error && <p className="error-message">{error}</p>}
            {weatherData && (
                <div className="weather-details">
                    <h2>{weatherData.city}</h2>
                    <p>
                        Temperature: {weatherData.temp}°C <br />
                        Description: {weatherData.description}
                    </p>
                    <img src={weatherData.icon} alt="weather icon" />
                </div>
            )}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </div>
    );
};

export default Weather;
