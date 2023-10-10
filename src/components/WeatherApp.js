import { useEffect, useState } from "react"
import WeatherForm from "./WeatherForm" 
import WeatherInfo from './WeatherInfo' 
import styles from './WeatherApp.module.css'
import Loading from "./Loading"

export default function WeatherApp () {
    const [weather, setWeather] = useState(null)
    
    useEffect(() => {   
        loadInfo('Buenos Aires')
    },[])
    useEffect(() => {   
        document.title=`Weather | ${weather?.location.name?? ''}`
    },[weather])
    

     const loadInfo = async (city) => {
        try{
            const request = await fetch(
                `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`)
        
            const json = await request.json()
            setWeather(json)
            console.log(json)
        }catch(e){
            console.error(e)
        }
    }

    const handleChangeCity = (city) => {
        setWeather(null); 
        loadInfo(city)
    }


    return(
        <div className={styles.weatherContainer}>
            <WeatherForm OnChageCity={handleChangeCity}/>
            {weather ? <WeatherInfo weather={weather}/> : <Loading/>}

        </div>
    ) 
    
}