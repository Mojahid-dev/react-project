import React from 'react'

const Header = () => {
  return (
    <div className='mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8'>
      <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold text-center leading-tight sm:leading-snug'>
        Find <span className='bg-radial-[at_50%_75%] from-gray-200 via-gray-400 to-gray-900 to-90% bg-clip-text text-transparent'>Movies</span>
        <span className='block mt-2 text-xl sm:text-4xl md:text-5xl'>You'll love</span>
        <span className='block mt-2 text-xl sm:text-2xl md:text-4xl'>Without the Hassle</span>
      </h1>
    </div>
  )
}

export default Header
