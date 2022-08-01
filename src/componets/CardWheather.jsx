
import React from 'react'
import axios  from 'axios'
import { useEffect, useState  } from 'react'
import LoadingScreen from './LoadingScreen'



const CardWheather = ({lat, lon, }) => {
 
const [weather, setWeather] = useState()
const [temperture, setTemperture] = useState()
const [isCelcius, setIsCelcius] = useState(true)
const [isLoading,setIsLoading] = useState(true)


    useEffect(() => {
        if (lat) {
            const APIKey = '0c96831839aa6e3c09db74ff06815036'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`        
      
            axios.get(URL)
            .then(res => {
                setWeather(res.data)
                const temp = {
                    celcius: `${Math.round (res.data.main.temp - 273.15)} ºC`, 
                    farenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 + 32)} ºF`
                }
                setTemperture(temp)
                setIsLoading(false)
            }) 
            .catch(err => console.log(err))
        }

    }, [lat, lon])
    
    console.log(weather)
  
   const handleClick = () => setIsCelcius(!isCelcius)

   if (isLoading) {

       return <LoadingScreen />
   } else {
    return (
        <article className='card__containers'>
            <h1 className='card__title'>Condiciones Meteorológicas App</h1>
            
            <h2 className='card__info-location'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
            <div className='card__miniaturas'>
                <img src= { weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
    
                <div className='card__miniaturas-uno'>
                    <h3>&#34;{weather?.weather[0].description}&#34;</h3>
                    <ul>
                        <li><span>Velocidad del viento </span>{weather?.wind.speed} m/s</li>
                        <li><span>Nubosidad </span>{weather?.clouds.all}%</li>
                        <li><span>Presión </span>{weather?.main.pressure} hPa</li>
                    </ul>
                </div>
    
            </div>
            <h2>{isCelcius ? temperture?.celcius : temperture?.farenheit}</h2>
            <button onClick={handleClick}>{isCelcius ? 'Change to ºF' : 'Change to ºC'}</button>
        </article>
      )
    }
}

  

export default CardWheather