import {useState} from 'react'
import './index.css'

const Form = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [cities, setCities] = useState([])
  const [newCity, setNewCity] = useState('')

  const fetchWeatherData = async cityName => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1ec347fe9200f7425fe44e3b230c1171&units=metric`,
      )
      if (!response.ok) {
        throw new Error('City not found')
      }
      const data = await response.json()
      setWeatherData(data)
      setCity('')
      setError(null)
    } catch (err) {
      setError('City not found')
      setWeatherData(null)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetchWeatherData(city)
  }

  const addCity = () => {
    setCities([...cities, newCity])
    setNewCity('')
  }

  const removeCity = cityName => {
    setCities(cities.filter(c => c !== cityName))
  }

  return (
    <div className="form-container">
      <h1>Weather Application</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
      <div className="CityList">
        <h2>City Management</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={newCity}
          onChange={e => setNewCity(e.target.value)}
        />
        <button type="button" onClick={addCity}>
          Add City
        </button>
        <ul className="List">
          {cities.map(c => (
            <li className="list-item" key={c}>
              {c}
              <button type="button" onClick={() => removeCity(c)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Form
