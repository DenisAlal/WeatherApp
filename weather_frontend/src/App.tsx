import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.module.css';
import axios from 'axios'
import classes from "./App.module.css";
import {WeatherData} from "./App.interface";
function App() {
    const [dataWeather, setDataWeather] = useState<WeatherData | null>(null);
    const [iconRef, setIconRef] = useState("");
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    postData(latitude, longitude)
                    console.log(latitude, longitude);
                },
                (error) => {
                    console.error('Ошибка получения геопозиции:', error);
                }
            );
        } else {
            console.error('Геолокация не поддерживается');
        }
    }, []);
    useEffect(() => {
        getIcon()
    }, [dataWeather]);



    const postData = async (latitude: number, longitude: number) => {
        const apiUrl = 'http://127.0.0.1:8000/api/weather';
        try {
            const response = await axios.post(apiUrl, {
                lat: latitude,
                lon: longitude,
                lang: "ru"
            });
            setDataWeather(response.data[0])
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getIcon = () => {
        if (dataWeather && dataWeather.weather && dataWeather.weather.length > 0) {
            const iconUrl = `https://openweathermap.org/img/wn/${dataWeather.weather[0].icon}.png`;
            setIconRef(iconUrl);
        }
    };

    return (
        <div className={classes.App}>
            <div className={classes.header}>dmjkanwkjdnw</div>
            <div className={classes.bodyWeather} >
                {dataWeather && <h1>{dataWeather.name}</h1>}
                {dataWeather && dataWeather.weather.map(weather => (
                    <div key="body" >{weather.description}</div>
                ))}
                {iconRef &&  <img
                    src={iconRef}
                    alt="iconWeather"
                />}
                <button onClick={()=> postData(0,0)}>dawhjdawhjdhahvjdaw</button>
            </div>
            <div className={classes.footer}>dhgahjdgajwdaw</div>
        </div>
    );
}

export default App;
