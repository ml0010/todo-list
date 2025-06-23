import React, { useContext, useEffect } from 'react'
import { WeatherContext } from '../contexts/weather-context';

export const WeatherSearch = () => {

    const { setLocation, searchInput, setSearchInput, geoData, searchLocation, getWeatherData, reset } = useContext(WeatherContext);
    
    useEffect(()=> {
        if(searchInput.length >= 2) {
            //console.log("SEARCHING INPUT VALUE INFO - " + searchInput)
            searchLocation();
        }
    }, [searchInput]);
    
    const handleInput = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const handleCitySelection = (cityId) => {
        const city = geoData.find((city) => city.id == cityId);
        console.log("CITY SELECTED - " + city.name);
        setLocation(prev => ({...prev, name: city.name, lat: city.latitude, lon: city.longitude}));
        reset();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocation(e.target.newLocation.value);
        getWeatherData();
        reset();
    };

    return (
        <div>
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
        </div>
    )
}
export default WeatherSearch;
