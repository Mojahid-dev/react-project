import React from 'react'

const Card = ({ movie: { title, vote_average, poster_path, release_date, original_language, overview } }) => {
  return (
    <>
      <div className="group relative w-80 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/20">

        {/* Poster */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: `/no-movie.png`}
            alt="Movie Poster"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* Rating */}
          <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow-lg">
            ⭐ {vote_average}
          </div>

          {/* Content on Poster */}
          <div className="absolute bottom-0 p-4">
            <h2 className="text-xl font-bold text-white">
              {title}
            </h2>

            
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            Language: {original_language}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Released: {release_date}
            </p>

            
          </div>
        </div>
      </div>
    </>
  )
}

export default Card
