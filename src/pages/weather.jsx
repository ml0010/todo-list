import React, { useContext, useEffect, useRef } from 'react'
import '../styles/weather.css'
import { MagnifyingGlass } from 'phosphor-react';
import { ICONS } from '../components/weather-icons'
import { WeatherContext } from '../contexts/weather-context';
import WeatherSearch from '../components/weather-search';

export const Weather = () => {
    const { weatherData, search, setSearch, isLocationServiceGranted, reset } = useContext(WeatherContext);

    const modalRef = useRef();

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            reset();
        }
    };

    useEffect(() => {
        if (search) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [search]);

    return (
        <div className='weather'>
            {weatherData ? (
            <div className='result'>
                <div className='weather-title' ref={modalRef}>
                    <div className='search'>
                    {search? 
                        <WeatherSearch />
                        : <h2 onClick={()=>setSearch(true)}>{weatherData.name}, {weatherData.sys.country}</h2>}
                        <button type="submit"><MagnifyingGlass size={28} onClick={()=>setSearch(!search)} /></button>
                    </div>
                    <img className='weatherIcon'src={ICONS[weatherData.weather[0].icon]} alt={weatherData.weather[0].description} />
                </div>              
                <div className='weather-info'>
                    <h3>{weatherData.weather[0].description}</h3>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Feels like : {weatherData.main.feels_like}°C</p>
                    <p>Humidity : {weatherData.main.humidity}%</p>
                    <p>Pressure : {weatherData.main.pressure}</p>
                    <p>Wind Speed : {weatherData.wind.speed}m/s</p>
                </div>
            </div>
            ) : (
                <div className='manual-location'>
                    {isLocationServiceGranted === 'request'? 
                    <div>
                        <p>Please allow browser's location access</p>
                        <p>or search your location</p>
                        <div className='search'>
                            <WeatherSearch />
                            <button type="submit"><MagnifyingGlass size={28} onClick={()=>setSearch(!search)} /></button>
                        </div>
                    </div> : <></>}
                    {isLocationServiceGranted === true ? <p>Loading weather data...</p> : <></>}
                </div>
            )}
        </div>
    )
}
export default Weather;