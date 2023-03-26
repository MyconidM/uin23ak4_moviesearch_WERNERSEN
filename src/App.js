import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Main from './components/Main';
import Layout from './components/Layout';
import moviePage from './components/moviePage';

function App() {
  const [Movies, setMovies] = useState([])
  const [search, setSearch] = useState('chicken')

  const getMovies = async() =>{
    //Pass på at ID og KEY kommer fra riktig app i edmam, hvis dere har registrert at dere skal bruke recipe api så må app id og key være koblet til det og ikke food databse eller omvendt
    const response = await fetch(`http://www.omdbapi.com/?apikey=[yourkey]&`)
    const data = await response.json()
    console.log(data.hits)
    setMovies(data.hits)

  
  }
  useEffect(() =>{
    getMovies()
  },[])

  return (
    <div className="App">
      <h1>Film arkiv</h1>

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main Movies={Movies} setSearch={setSearch} getMovies={getMovies} />} />
          <Route path=':slug' element={<moviePage Movies={Movies} />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
