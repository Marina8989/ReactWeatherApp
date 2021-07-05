import React, {useState} from 'react';

//https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=ac8f567305d2edc3339a5dfb13f287a2

const api = {
    key: 'ac8f567305d2edc3339a5dfb13f287a2',
    base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const fetchWeather = (e) => {
        if(e.key === 'Enter') {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
              .then(res => res.json())
              .then(response => {
                  setWeather(response);
                  setQuery('');
                  console.log(response)
              })
        }
    }

    const dateToday = (d) => {
       let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 
       'November', 'December'];
       let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

       let day = days[d.getDay()];
       let month = months[d.getMonth()];
       let date = d.getDate();
       let year = d.getFullYear();

       return `${day} ${month} ${date}, ${year}`;
    }

    return (
       <div>
           <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'container warm' : 'container' ) : 'container'}>
              <h2 className="cont-weather">Weather</h2>
               <input 
               type="text"
               placeholder="Enter City..."
               onChange={(e)=>{setQuery(e.target.value)}}
               value={query}
               onKeyPress={fetchWeather}
               />
            {(typeof weather.name != 'undefined') ? (
                <div className="weather">
                   <div>     
                     <h2>{weather.name}, {weather.sys.country}</h2>
                     <h4 className="weather-date">{dateToday(new Date())}</h4>
                     <h4 className="weather-temp">{Math.round(weather.main.temp)}</h4>
                     <h4 className="weather-condition">{weather.weather[0].main}</h4>
                  </div> 
                </div>
            ) : ('')}  
           </div>
       </div>
    )
}

export default App;