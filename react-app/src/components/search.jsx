import React from 'react'
import { Search } from 'lucide-react'

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className='w-full max-w-md flex flex-col items-center justify-center relative'>
      <Search className='absolute left-1 top-2 text-[10px] text-gray-400' />

      <input 
        type="text" 
        placeholder='Search for movies...' 
        className='w-full px-8 py-2 rounded-md text-white bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 ' 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <p className='text-sm text-gray-400 mt-2'>{searchTerm ? `Searching for: ${searchTerm}` : 'Enter a movie title to search'}</p>
    </div>
  )
}

export default SearchBar
