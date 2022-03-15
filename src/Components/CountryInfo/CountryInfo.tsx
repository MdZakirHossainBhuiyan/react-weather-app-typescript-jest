import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CapitalWeather from '../CapitalWeather/CapitalWeather';
import './CountryInfo.css';

interface countryInterface {
    flags: {
        svg: string
    },
    capital: string,
    population: number,
    latlng: number[],
}

interface capitalWeatherInterface {
    weather_icons: string,
    temperature: number,
    wind_speed: number, 
    precip: number 
}

const CountryInfo = () => {
    const {countryName} = useParams<string>();
    const [countryInfo, setCountryInfo] = useState<countryInterface>()
    const [loading, setLoading] = useState<boolean>(false);
    const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
    const [showCapitalWeather, setShowCapitalWeather] = useState<boolean>(false);
    const [capitalWeatherInfo, setCapitalWeatherInfo] = useState<capitalWeatherInterface>()

    useEffect(() => {
        setLoading(true);

        fetch(`https://restcountries.com/v3.1/name/${countryName}`)
        .then(response => response.json())
        .then(data => setCountryInfo(data[0]))

        setLoading(false)

    }, [countryName]);

    const handleShowCapitalWeather = () => {
        showCapitalWeather ? setShowCapitalWeather(false) : setShowCapitalWeather(true);

        setWeatherLoading(true);

        fetch(`http://api.weatherstack.com/current?access_key=e6c02155534d93af34a954cb6c1faccb&query=${countryInfo?.capital}`)
        .then(response => response.json())
        .then(data => setCapitalWeatherInfo(data.current))

        setWeatherLoading(false);
    }

    console.log('capital weather', capitalWeatherInfo);

    return (
        <div className='countryInfoArea'>
            <h1>Country Info for <span>{countryName}</span></h1>

            {
                loading ? <p>Loading...</p> : 
                countryInfo ? 
                <div className='infoContentCard'>
                    <div className='countryFlag'>
                        <img src={countryInfo?.flags.svg} alt="flag" />
                    </div>
                    <div className='countryInfo'>
                        <p>Capital: {countryInfo?.capital}</p>
                        <p>Population: {countryInfo?.population}</p>
                        <p>Latitude: {countryInfo?.latlng[0]}<sup>o</sup></p>
                        <p>Longitude: {countryInfo?.latlng[1]}<sup>o</sup></p>
                    </div>
                </div> : <p>Country Not Found.</p>
            }

            {
                countryInfo && 
                <div className='weatherInfoArea'>
                    <button onClick={handleShowCapitalWeather} className='weatherInfoButton'>Capital Weather</button>

                {
                    showCapitalWeather && 
                    <div className='capitalWeatherArea'>
                        <div className='capitalWeatherHeader'>
                            <h3>{countryInfo?.capital} Weather Info</h3>
                        </div>
                        {
                            weatherLoading ? <p>Loading...</p> :
                            capitalWeatherInfo ? 
                            <div>
                                <div>
                                    <img src={capitalWeatherInfo?.weather_icons} alt="" />
                                </div>
                                <div>
                                    <p>Temperature: {capitalWeatherInfo?.temperature}<sup>o</sup></p>
                                    <p>Wind speed: {capitalWeatherInfo?.wind_speed}</p>
                                    <p>Precip: {capitalWeatherInfo?.precip}</p>
                                </div>
                            </div>: <p>Capital weather info not found</p>
                        }
                    </div>
                }
            </div>
            }
        </div>
    );
};

export default CountryInfo;