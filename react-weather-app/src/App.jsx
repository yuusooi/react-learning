import React, { useState } from 'react'

function App() {
  const [city,setCity] = useState('');
  const [weatherData,setWeatherData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  async function fetchWeather() {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const geoRes = await fetch (
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
      );

      if (!geoRes.ok) {
        throw new error('地理位置获取失败')
      }

      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length ===0 ) {
        throw new Error('找不到该城市');
      }

      const {latitude,longitude,name,country} = geoData.results[0];
      
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      if (!weatherRes.ok) {
        throw new Error("天气获取失败");
      }

      const weatherData = await weatherRes.json();

      setWeatherData({
        city: `${name}, ${country}`,
        temperature: weatherData.current_weather.temperature,
        windspeed: weatherData.current_weather.windspeed,
        weathercode: weatherData.current_weather.weathercode,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',   
        justifyContent: 'center',  
        alignItems: 'center',      
        height: '100vh',           
        textAlign: 'center',       
        backgroundColor: '#f9f9f9' 
      }}
    >
      <h1>天气查询-React</h1>

      <input
        type="text" 
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder='请输入城市名'
        style={{padding:'8px',fontSize:'16px',width:'200px'}}
      />

      <button
        onClick={fetchWeather}
        style={{marginLeft:'10px',padding:'8px 12px',cursor:'pointer'}}
      >
        搜索
      </button>

      {loading && <p>加载中……</p>}
      {error && <p style={{color:'red'}}>{error}</p>}
      {weatherData && (
        <div style={{marginTop:'20px'}}>
          <h2>{weatherData.city}</h2>
          <p>温度：{weatherData.temperature}°C</p>
          <p>风速：{weatherData.windspeed}km/h</p>
          <p>天气代码：{weatherData.weathercode}</p>
        </div>
      )}
    </div>
  )
}

export default App
