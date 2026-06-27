import { motion } from 'framer-motion'
import MovieCard from './MovieCard'

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07
    }
  }
}

function MovieGrid({ movies }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </motion.div>
  )
}

export default MovieGrid