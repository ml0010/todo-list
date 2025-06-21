import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import '../styles/weather.css'
import { MagnifyingGlass } from 'phosphor-react';
import { ICONS } from '../components/weather-icons'

export const Weather = () => {
    const [ location, setLocation ] = useState(''); // save city name, lat, lon value
    const [ weatherData, setWeatherData ] = useState(null);
    const [ search, setSearch ] = useState(false);
    const [ searchInput, setSearchInput ] = useState('');
    const [ geoData, setGeoData] = useState(null); // save geo-data


    const showPosition = (position) => {
        return position.coords.latitude;
    };
    console.log(navigator.geolocation.getCurrentPosition(showPosition));

    const getInitialLocation = async () => {
        try {
            const response = await axios.get("http://ip-api.com/json");
            //const response = await axios.get("http://freegeoip.net/json");
            if (response.status === 200) {
                setLocation(prev => ({...prev, name: response.data.city, lat: response.data.lat, lon: response.data.lon}));
                console.log(response.data);
                //console.log(geoData);
            } 
        } catch (err) {
            setLocation(prev => ({...prev, name: 'Inca', lat: 39.7217, lon: 2.9135}));
            console.log(err);
        }
    }
    const searchLocation = async () => {
        try {
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}`);
            if (response.status === 200) {
                console.log("GEODATA LOADED - " + searchInput);
                setGeoData(response.data.results.slice(0,5));
            }
        } catch (err) {
            console.log(err);
        }
    }

    const getWeatherData = async () => {
        if(location) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${location.lat}&lon=${location.lon}&units=metric&appid=2f82b8cd333e994c4f294e5b5785a64b`);
                setWeatherData(response.data.list[0]);
                //console.log(response.data);
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
            console.log("GETTING WEATHER DATA - " + location.name);
            getWeatherData();
        }
    }, [location]);
    
    useEffect(()=> {
        if(searchInput.length >= 2) {
            console.log("SEARCHING INPUT VALUE INFO - " + searchInput)
            searchLocation();
        }
    }, [searchInput]);

    const modalRef = useRef();

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setSearch(false);
            setSearchInput('');
            setGeoData('');
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

    const handleInput = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }
    const handleCitySelection = (cityId) => {
        const city = geoData.find((city) => city.id == cityId);
        console.log("CITY SELECTED - " + city.name);
        setLocation(prev => ({...prev, name: city.name, lat: city.latitude, lon: city.longitude}));
        setGeoData('');
        setSearchInput('');
        setSearch(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(e.target.newLocation.value);
        getWeatherData();
        setGeoData('');
        setSearchInput('');
        setSearch(!search);
    };

    return (
        <div className='weather'>
            {weatherData ? (
            <>
                <div className='weather-title' ref={modalRef}>
                    <div className='search'>
                    {search? 
                        <form onSubmit={handleSubmit} className='searchForm'>
                            <input 
                                className='cityInput'
                                name='newLocation'
                                type="text"
                                value={searchInput}
                                onChange={(e)=>handleInput(e)}
                            />
                            <div className='searchResult'>
                                {geoData? 
                                <ul className="citySearchResultList"> 
                                    {geoData.map((city, index) => {
                                        return <li value={city.id} key={index} onClick={(e)=>{handleCitySelection(e.target.value)}}>{city.name} , {city.country}</li>;
                                    })}
                                </ul> : <></>}
                            </div>
                        </form>
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
            </>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    )
}
export default Weather;