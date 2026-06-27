import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'
import MovieGrid from '../components/ui/MovieGrid'

function Favourites() {
  const { favourites } = useFavourites()

  return (
    <div className="bg-flick-bg min-h-screen px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-2">Your Favourites</h1>
        <p className="text-flick-muted mb-10">
          {favourites.length > 0
            ? `${favourites.length} saved movie${favourites.length > 1 ? 's' : ''}`
            : 'Nothing saved yet'}
        </p>

        {favourites.length > 0 ? (
          <MovieGrid movies={favourites} />
        ) : (
          <div className="flex flex-col items-center justify-center mt-24 gap-4">
            <p className="text-8xl">🍿</p>
            <p className="text-white text-xl font-semibold">No favourites yet</p>
            <p className="text-flick-muted">Hit the ☆ on any movie to save it here</p>
            <Link
              to="/"
              className="mt-4 bg-flick-accent text-black font-bold px-6 py-3 rounded-xl hover:bg-flick-accent-dim transition-colors"
            >
              Discover Movies
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Favourites
