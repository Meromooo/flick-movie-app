import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useFavourites } from '../../context/FavouritesContext'

function Navbar() {
  const { favourites } = useFavourites()

  return (
    <nav className="sticky top-0 z-50 bg-flick-surface flex items-center justify-between px-8 py-4 relative">
      <Link to="/">
        <motion.span
          className="text-flick-accent text-xl font-bold tracking-widest cursor-pointer"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
          whileHover={{
            scale: 1.1,
            letterSpacing: '0.35em',
            textShadow: '0 0 20px rgba(245,166,35,0.9), 0 0 40px rgba(245,166,35,0.4)',
          }}
          transition={{ duration: 0.2 }}
        >
          FLICK
        </motion.span>
      </Link>

      <div className="flex gap-8">
        <Link to="/" className="nav-link font-medium">Discover</Link>
        <Link to="/search" className="nav-link font-medium">Search</Link>
        <Link to="/favourites" className="nav-link font-medium flex items-center gap-2">
          Favourites
          {favourites.length > 0 && (
            <span className="bg-flick-accent text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {favourites.length}
            </span>
          )}
        </Link>
      </div>

      <div className="absolute top-full left-0 right-0 h-8 bg-gradient-to-b from-flick-surface to-transparent pointer-events-none" />
    </nav>
  )
}

export default Navbar
