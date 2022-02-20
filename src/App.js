import { useState } from 'react';
import {} from './App.css';

function App() {

  const [city, setCity] = useState("Fortaleza");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=1ebb78deac8c4e1e87d123314222002&q=${city}&lang=pt`)
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
      })
      .then((data) => {
        console.log(data)
        setWeatherForecast(data)
      });
  };


  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4" >
        <a className="navbar-brand text-warning" href="#top">
          RM Previsão do Tempo
        </a>
      </nav>

      <main className="container">
        <div className="jumbotron">
          <h1>
            Verifique a Previsão do tempo na sua cidade !
          </h1>
          <p className="lead">
            Digite a sua cidade no campo abaixo, e clique em pesquisar
          </p>

          <div className="row mb-4">
            <div className="col-md-6 m-auto">
              <input
                onChange={handleChange}
                className="form-control" value={city} />
            </div>
          </div>

          <button onClick={handleSearch} className="btn btn-primary btn-lg">
            Pesquisar
          </button>

          {weatherForecast ? (
              <div>
                <div className="mt-4">
                  <div>
                    <img src={weatherForecast.current.condition.icon} />
                  </div>

              
                  <div>
                    <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                    <h3>Temperatura: {weatherForecast.current.temp_c} ºC</h3>
                    <h3>Umidade: {weatherForecast.current.humidity} %</h3>                    
                    <h3>Cidade: {weatherForecast.location.name}</h3>
                    <h3>Estado: {weatherForecast.location.region}</h3>
                    <h3>País: {weatherForecast.location.country}</h3>
                  </div>
                  

              </div>
              </div>
            ) : null }

        </div>
        </main>
        </div>
     
  );
}

export default App;
