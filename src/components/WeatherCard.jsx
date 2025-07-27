import { useEffect, useState } from "react";
import "./styling/weatherCard.css"
import Loading from "./Loading";

const WeatherCard = () => {
    const [weather, setWeather] = useState(null);

    useEffect( () => {
     
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=34.02&longitude=-6.83&current_weather=true"
        )
        .then( res => res.json())
        .then( data => setWeather(data))
        .catch(err => console.err("Failed to fetch weather:", err))
    }, []);

    if (!weather) return <Loading/> ;
    return ( 
        <>
        
        </>
     );
}
 
export default WeatherCard;