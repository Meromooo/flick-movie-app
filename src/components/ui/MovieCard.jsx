import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getPosterUrl } from '../../services/tmdb'
import { useFavourites } from '../../context/FavouritesContext'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

function MovieCard({ movie }) {
  const { toggleFavourite, isFavourite } = useFavourites()
  const favourited = isFavourite(movie.id)

  const year = movie.release_date?.slice(0, 4)
  const rating = movie.vote_average?.toFixed(1)
  const poster = getPosterUrl(movie.poster_path)

  const ratingColor =
    rating >= 7 ? 'text-rating-high' :
    rating >= 5 ? 'text-rating-mid' :
    'text-rating-low'

  const handleFavourite = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavourite(movie)
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05, y: -4, transition: { duration: 0.2 } }}
      className="rounded-xl overflow-hidden bg-flick-surface"
    >
      <Link to={`/movie/${movie.id}`} className="block group">
        <div className="relative">
          {poster ? (
            <img
              src={poster}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-flick-elevated flex items-center justify-center text-flick-dim text-sm">
              No Image
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-sm font-semibold tracking-wider">VIEW</span>
          </div>

          <motion.button
            onClick={handleFavourite}
            whileTap={{ scale: 1.4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-base z-10"
          >
            {favourited ? '★' : '☆'}
          </motion.button>
        </div>

        <div className="p-3">
          <p className="text-white font-medium truncate">{movie.title}</p>
          <div className="flex items-center justify-between mt-1">
            <span className="text-flick-muted text-sm">{year}</span>
            <span className={`text-sm font-bold ${ratingColor}`}>★ {rating}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default MovieCard