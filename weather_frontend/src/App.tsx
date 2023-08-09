import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.module.css';
import axios from 'axios'
import styles
 from "./App.module.css";
import {WeatherData} from "./interface/App.interface";
function App() {
    const [dataWeather, setDataWeather] = useState<WeatherData | null>(null);
    const [iconRef, setIconRef] = useState("");
    const [units, setUnits] = useState("metric")


    const getPosition = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    localStorage.setItem("latitude", JSON.stringify(latitude));
                    localStorage.setItem("longitude", JSON.stringify(longitude));
                    postData(latitude, longitude, units)
                },
                (error) => {
                    console.error('Ошибка получения геопозиции:', error);
                }
            );
        } else {
            console.error('Геолокация не поддерживается');
        }
    }

    const getMyPosition = (type: string ) => {
        if (type === "checkLocalStorage") {
            if (localStorage.getItem("longitude") === null ||
                localStorage.getItem("latitude") === null) {
                getPosition()
            } else {
                const latitude = localStorage.getItem("latitude");
                const longitude = localStorage.getItem("longitude");
                if (latitude !== null && longitude !== null) {
                    const latitudeFloat = parseFloat(latitude);
                    const longitudeFloat = parseFloat(longitude);
                    postData(latitudeFloat, longitudeFloat, units)
                } else {
                    getPosition()
                }


            }
        } else {
            getPosition()
        }

    }

    useEffect(() => {
        getIcon()
    }, [dataWeather]);

    useEffect(() => {
        getMyPosition("checkLocalStorage")
    },[]);

    const postData = async (latitude: number, longitude: number, newUnits: string) => {
        if (latitude === 404 && longitude === 404) {


        } else {
            const apiUrl = 'http://127.0.0.1:8000/api/weather';
            try {
                const response = await axios.post(apiUrl, {
                    lat: latitude,
                    lon: longitude,
                    lang: "ru",
                    units: newUnits
                });
                setDataWeather(response.data[0])
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

    };

    const getIcon = () => {
        if (dataWeather && dataWeather.list[0].weather && dataWeather.list[0].weather.length > 0) {
            const iconUrl = `https://openweathermap.org/img/wn/${dataWeather.list[0].weather[0].icon}.png`;
            setIconRef(iconUrl);
        }
    };
    function capitalizeFirstLetter(upperString: string) {
        return upperString.charAt(0).toUpperCase() + upperString.slice(1);
    }
    const setNewUnits = (newUnits: string) => {
        setUnits(newUnits);

    }
    const tempUpdate = (temp: string) => {
        const newTemp = parseInt(temp)
        if (units === "metric") {
            return  newTemp + "°"
        } else {
            let newTemp = parseInt(temp)
            const fahrenheit = (newTemp * 9/5) + 32;
            const newFahrenheit = String(parseInt(String(fahrenheit)))
            return  newFahrenheit.toString() + "℉"
        }
    }
    const getDegreesWind = (deg: number, speed: number) => {
        let result
        if (deg >= 348.75 && deg <= 11.25) {
            result =  "Северный"
        } else if (deg > 11.25 && deg <= 33.75) {
            result = "Северо-северо-восточный"
        } else if (deg > 33.75 && deg <= 56.25) {
            result = "Северо-восточный"
        } else if (deg > 56.25 && deg <= 78.75) {
            result = "Востоко-северо-восточный"
        } else if (deg > 78.75 && deg <= 101.25) {
            result = "Восточный"
        } else if (deg > 101.25 && deg <= 123.75) {
            result = "Востоко-юго-восточный"
        } else if (deg > 123.75 && deg <= 146.25) {
            result = "Юго-восточный"
        } else if (deg > 146.25 && deg <= 168.75) {
            result = "Юго-юго-восточный"
        } else if (deg > 168.75 && deg <= 191.25) {
            result = "Южный"
        } else if (deg > 191.25 && deg <= 213.75) {
            result = "Юго-юго-западный"
        } else if (deg > 213.75 && deg <= 236.25) {
            result = "Юго-западный"
        } else if (deg > 236.25 && deg <= 258.75) {
            result = "Западо-юго-западный"
        } else if (deg > 258.75 && deg <= 281.25) {
            result = "Западный"
        } else if (deg > 281.25 && deg <= 303.75) {
            result = "Западо-северо-западный"
        } else if (deg > 303.75 && deg <= 326.25) {
            result = "Северо-западный"
        } else if (deg > 326.25 && deg <= 348.75) {
            result = "Северо-северо-западный"
        }
        result = String(speed) + " м/с, " + result

        return result
    }

    return (
        <div className={styles.App}>

            <div className={styles.header}>
                <div className={styles.select_city}>
                    {dataWeather && <div className={styles.cityName}>
                        {dataWeather.city.name}
                        <div className={styles.buttonsGroup}>
                            <a className={styles.changeCity}>Сменить город</a>
                            <a className={styles.cordGet} onClick={()=> getMyPosition("getData")}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M22.489 5.83819L5.23895 16.6268L13.728 18.2769L18.2146 25.7637L22.489 5.83819Z" fill="white" fillOpacity="0.4"/>
                                </svg>
                                <div>Мое местоположение</div>
                            </a>
                        </div>
                    </div>}
                </div>
                <div className={styles.select_units}>
                    {/*<button onClick={()=> postData(0,0, units)}>dawhjdawhjdhahvjdaw</button>*/}
                    <div className={styles.switchUnit}>
                        {units === "metric" ? <div className={styles.sizeUnitsText}>°</div> : <div className={styles.sizeUnitsText}>℉</div>}
                        <div className={styles.groupButtonsSelectUnits}>
                            <button className={`${styles.lbutton} ${units === 'metric' ? styles.active : ''}`}
                                    onClick={() => {setUnits('metric')}}>
                                C
                            </button>
                            <button className={`${styles.rbutton} ${units === 'imperial' ? styles.active : ''}`}
                                    onClick={() => {setUnits('imperial')}}>
                                F
                            </button>
                        </div>



                    </div>
                </div>
            </div>
            <div className={styles.bodyWeather} >
                <div className={styles.mainBlock}>
                    <div className={styles.tempBlock}>
                        {iconRef &&  <img
                            height="150px"
                            width="150px"
                            src={iconRef}
                            alt="iconWeather"
                        />}

                        {dataWeather &&
                             <div className={styles.temp}>{tempUpdate(dataWeather.list[0].main.temp.toString())}</div>}
                    </div>
                    <div className={styles.descriptionBlock}>
                        {dataWeather && <div>{capitalizeFirstLetter(dataWeather.list[0].weather[0].description)}</div>}
                    </div>
                </div>


            </div>
            <div className={styles.footer}>

                <div className={styles.wind}>
                    <div>Ветер</div>
                    {dataWeather && <div>{getDegreesWind(dataWeather.list[0].wind.deg, dataWeather.list[0].wind.speed)}</div>}
                </div>
                <div className={styles.pressure}>
                    <div>Давление</div>
                    {dataWeather && <div>{dataWeather.list[0].main.pressure + " мм рт. ст."}</div>}
                </div>
                <div className={styles.humidity}>
                    <div>Влажность</div>
                    {dataWeather && <div>{dataWeather.list[0].main.humidity + "%"}</div>}
                </div>
                <div className={styles.rainChance}>
                    <div>Вероятность дождя</div>
                    {dataWeather && <div>{dataWeather.list[0].pop + "%"}</div>}
            </div>
            </div>
        </div>
    );
}

export default App;
