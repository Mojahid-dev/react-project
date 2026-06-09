import React from 'react'
import Card from './components/card'
import Header from './components/header'
import SearchBar from './components/search'
import { useState, useEffect } from 'react'
import Loader from './components/loader'

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`, API_OPTIONS);
      console.log('API Response:', response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
      }

      const data = await response.json();
      if (data.Response === "false") {
        setErrorMessage(data.error || 'No movies found.');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

    }
    catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMessage('Error fetching movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {


    fetchMovies();
  }, [searchTerm]);

  return (
    <main className='p-4 bg-gray-900 min-h-screen text-white flex flex-col items-center relative gap-4'>
      <div className='flex-1 flex items-center justify-center w-full'>
        {/* <Card /> */}
        <header className='w-full max-w-2xl mt-30 flex flex-col items-center justify-center gap-7'>
          <Header />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className='text-xl font-bold'>{errorMessage} </h1>
        </header>
      </div>

      <section className='flex flex-col items-center w-full'>

        <h2 className='mt-[20px] text-3xl font-bold'>All movies</h2>

        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <p key={movie.id}>{movie.title}</p>
            ))}
          </ul>


        )}
      </section>

    
  </main >

  )
}

export default App
