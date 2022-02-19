import React, { useEffect, useState } from "react"
import Card from "./Card";
import './index.css'

function App() {
  const [lat, setLat] = useState('')
  const [long, setLong] = useState('')
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&appid=ac008e22b6448234bf016e05ce0d6f66`)
      .then(res => res.json())
      .then(result => {
        setData(result)
      });
    }
    fetchData();
  }, [lat, long])


  return (
    <div className="app">
      <Card />
    </div>
  );
}

export default App;
