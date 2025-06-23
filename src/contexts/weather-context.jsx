import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

export const WeatherContext = createContext(null);

export const WeatherContextProvider = (props) => {

    const [ location, setLocation ] = useState(''); // save city name, lat, lon value
    const [ weatherData, setWeatherData ] = useState(null); // API weather data
    const [ search, setSearch ] = useState(false); // indication if search option is on (Input available)
    const [ searchInput, setSearchInput ] = useState(''); // input value
    const [ geoData, setGeoData] = useState(null); // save geo-data
    const [ isLocationServiceGranted, setIsLocationServiceGranted ] = useState('request'); // indication if user allowed location service
    
    // ask location permission & get browser's loaction
    useEffect(() => {
        getInitialLocation();
    }, []);

    // when location is set, get weather data
    useEffect(() => {
        if(location) {
            getWeatherData();
        } 
    }, [location]);

    const getInitialLocation = () => {
        navigator.geolocation.getCurrentPosition(showPosition);
    };
    const showPosition = (position) => {
        console.log(position);
        if(position) {
            setIsLocationServiceGranted(true);
            setLocation(prev => ({...prev, name: '', lat: position.coords.latitude, lon: position.coords.longitude}));
        }
    };
    
    // API request of input value's possible location (max 5)
    const searchLocation = async () => {
        try {
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}`);
            if (response.status === 200) {
                setGeoData(response.data.results.slice(0,5));
            }
        } catch (err) {
            console.log(err);
        }
    }

    // API request with location's latitude & Longitude value
    const getWeatherData = async () => {
        if(location) {
            try {
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?lat=${location.lat}&lon=${location.lon}&units=metric&appid=2f82b8cd333e994c4f294e5b5785a64b`);
                setWeatherData(response.data.list[0]);
            } catch (err) {
                console.log(err);
            }
        }
    }

    // reset search & close input box
    const reset = () => {
        setSearch(false);
        setSearchInput('');
        setGeoData('');
    };

    const contextValue = { location, setLocation, weatherData, setWeatherData, search, setSearch, searchInput, setSearchInput, geoData, setGeoData, isLocationServiceGranted, setIsLocationServiceGranted, getInitialLocation, searchLocation, getWeatherData, reset };
    return (
        <WeatherContext.Provider value={contextValue}>{props.children}</WeatherContext.Provider>
    )
}
