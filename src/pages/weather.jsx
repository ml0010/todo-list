import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../styles/weather.css'
import { MagnifyingGlass } from 'phosphor-react';

export const Weather = () => {
    const [ location, setLocation ] = useState('');
    const [ weatherData, setWeatherData ] = useState(null);
    const [ search, setSearch ] = useState(false);

    const getInitialLocation = async () => {
        try {
            const response = await axios.get("http://ip-api.com/json");
            if (response.status === 200) {
                setLocation(response.data.city);
                console.log(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getWeatherData = async () => {
        console.log("GET WEATHER DATA");
        if(location) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=2f82b8cd333e994c4f294e5b5785a64b`);
                setWeatherData(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        getInitialLocation();
    }, []);

    useEffect(() => {
        if(location) {
            getWeatherData();
        }
    }, [location]);


    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(e.target.newLocation.value);
        getWeatherData();
        setSearch(!search);
    };

    return (
        <div className='weather'>
            {weatherData ? (
            <>
                <div className='city-info'>
                    <div onClick={()=>setSearch(!search)}>
                    {search? 
                        <form onSubmit={handleSubmit}>
                            <input 
                                className='cityInput'
                                name='newLocation'
                                type="text"
                                value={location.city}
                            />
                        </form>
                     : <h2>{weatherData.name}, {weatherData.sys.country}</h2>}
                    </div>
                    <button type="submit"><MagnifyingGlass size={23} onClick={()=>setSearch(!search)}/></button>
                </div>
                
                <div className='weather-info'>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Feels like : {weatherData.main.feels_like}°C</p>
                    <p>Humidity : {weatherData.main.humidity}%</p>
                    <p>Pressure : {weatherData.main.pressure}</p>
                    <p>Wind Speed : {weatherData.wind.speed}m/s</p>
                </div>
            </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    )
}
export default Weather;