import React from 'react'
import Card from './components/card'
import Header from './components/header'
import SearchBar from './components/search'
import { useState, useEffect } from 'react'
import Loader from './components/loader'
import { useDebounce } from 'react-use'

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  
  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoints = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`: `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoints, API_OPTIONS);
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
      setErrorMessage('Error fetching movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchterm);
  }, [debouncedSearchTerm]);

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

      <section className='w-full'>
        <h2 className='mb-[20px] text-3xl font-bold'>All movies</h2>

        {isLoading ? (
          <Loader />
        ) : errorMessage ? (
          <p className='text-red-500'>{errorMessage}</p>
        ) : (
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {movieList.map((movie) => (
              <li key={movie.id}>
                <Card movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </section>

    
  </main >

  )
}

export default App
