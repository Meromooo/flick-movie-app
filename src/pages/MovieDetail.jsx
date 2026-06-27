import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMovieDetail, getBackdropUrl, getPosterUrl } from '../services/tmdb'

function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovie() {
      try {
        const data = await getMovieDetail(id)
        setMovie(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-flick-bg flex items-center justify-center">
        <p className="text-flick-accent text-xl animate-pulse">Loading...</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-flick-bg flex items-center justify-center">
        <p className="text-flick-muted text-xl">Movie not found.</p>
      </div>
    )
  }

  const backdrop = getBackdropUrl(movie.backdrop_path)
  const poster = getPosterUrl(movie.poster_path)
  const trailer = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  )
  const rating = movie.vote_average?.toFixed(1)
  const ratingColor =
    rating >= 7 ? 'text-rating-high' :
    rating >= 5 ? 'text-rating-mid' :
    'text-rating-low'
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : null

  return (
    <div className="bg-flick-bg min-h-screen">

      {/* Hero backdrop */}
      <div className="relative h-[70vh] w-full">
        {backdrop && (
          <img
            src={backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-flick-bg via-flick-bg/20 to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-8 left-8 right-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-flick-muted text-lg italic mb-3">"{movie.tagline}"</p>
          )}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className={`font-bold text-lg ${ratingColor}`}>★ {rating}</span>
            {movie.release_date && (
              <span className="text-flick-muted">{movie.release_date.slice(0, 4)}</span>
            )}
            {runtime && <span className="text-flick-muted">{runtime}</span>}
            {movie.genres?.map((g) => (
              <span key={g.id} className="bg-flick-elevated text-flick-muted px-3 py-1 rounded-full">
                {g.name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="px-8 py-10 flex gap-10"
      >
        {poster && (
          <img
            src={poster}
            alt={movie.title}
            className="hidden md:block w-56 rounded-xl flex-shrink-0 shadow-2xl self-start"
          />
        )}

        <div className="flex-1">
          {movie.overview && (
            <div className="mb-8">
              <h2 className="text-white text-xl font-bold mb-3">Overview</h2>
              <p className="text-flick-muted leading-relaxed">{movie.overview}</p>
            </div>
          )}

          {trailer && (
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-flick-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-flick-accent-dim transition-colors"
            >
              ▶ Watch Trailer
            </a>
          )}
        </div>
      </motion.div>

    </div>
  )
}

export default MovieDetail
