import React from 'react'
import { useEffect, useState  } from 'react'
import './App.css'
import CardWheather from './componets/CardWheather'
import LoadingScreen from './componets/LoadingScreen'

function App() {

  
  
  const [coords, setCoords] = useState()
  
 

  useEffect(() => {

    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }

      setCoords(latlon)

    }

    navigator.geolocation.getCurrentPosition(success) 
  }, [])
  
  

  return (

    <div className="App bg" >
      
     <CardWheather  lon = {coords?.lon} lat = {coords?.lat}/>

      
    </div>

  )
}

export default App