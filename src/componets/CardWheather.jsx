
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
        <article className='current' >
            {/* current weather */}

            <h1 className='card__title'>Condiciones Meteorológicas</h1>
                <h2 className='card__info-location'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
                
                <article className='row'>
                    <div className='row__image'>
                        <img src= { weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                     </div>
                    <div className='row__info'>
                        <div className="temperature">
                            <h2 className='info__temperature'>  {isCelcius ? temperture?.celcius : temperture?.farenheit} </h2>

                        </div>

                        <div className="status-cloud">
                            <h2 className='clouding'>Nubosidad {weather?.clouds.all}%</h2> 
                        </div>

                    </div>

                
                </article>

                <article className='more'>
                    
                    {/*Item 1*/}
                    <div className='item'>
                        
                        <span className='material-symbols-outlined'>air</span>
                        <div className='item__text'>
                        <h2 className='more__info wind'>{weather?.wind.speed} m/s</h2>
                        <p className='info'>Velocidad Viento</p>
                        </div>
                       
                    </div>
                     {/*Item 2*/}
                     <div className='item'>
                        
                        <span className='material-symbols-outlined'>explore</span>
                        <div className='item__text'>
                        <h2 className='more__info direction'>{weather?.wind.deg} º</h2>
                        <p className='info'>Dirección viento:</p>
                        </div>
                        
                    </div>
                     {/*Item 3*
                     <div className='item'>
                     <span className='material-symbols-outlined'>water_drop</span>
                        <div className='item__text'>
                        <h2 className='more__info humity'>{weather?.main.humidity} %</h2>
                        <p>Humedad</p>
                        </div>
                     </div>*/}
                    {/*Item 4*/}

                    <div className='item'>
                    <span className='material-symbols-outlined'>tire_repair</span>
                        <div className='item__text'>
                        <h2 className='more__info presure'>{weather?.main.pressure} hPa</h2>
                        <p className='info'>Presión</p>
                        </div>
                        
                    </div>
                </article>

                <div className="btn__change">
                        
                        <button className='change__temperature' onClick={handleClick}>{isCelcius ? 'Cambiar a ºF' : 'Cambiar a ºC'}</button>  
                     
                        <div className='attribution'>
                        Code by <a href="https://joelparra.netlify.app" target="_blank">Joel Parra</a>
                        </div>          
                    </div>

            <div >

                

            </div>

             
            
           {/*
            
            
              
    
                <div className='card__miniaturas-uno'>
                    <h3 className='card__subtitle'>&#34;{weather?.weather[0].description}&#34;</h3>
                    
                    <div className=""></div>
                </div>
    
            
           
            */}
            
        </article>
      )
    }
}

  

export default CardWheather