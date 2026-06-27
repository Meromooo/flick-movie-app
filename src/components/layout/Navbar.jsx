import { Link } from 'react-router-dom'
import { useFavourites } from '../../context/FavouritesContext'

function Navbar() {
  const { favourites } = useFavourites()

  return (
    <nav className="sticky top-0 z-50 bg-flick-surface flex items-center justify-between px-8 py-4 relative">
      <span className="text-flick-accent text-xl font-bold tracking-widest">
        FLICK
      </span>

      <div className="flex gap-8">
        <Link to="/" className="text-flick-muted hover:text-white transition-colors">Discover</Link>
        <Link to="/search" className="text-flick-muted hover:text-white transition-colors">Search</Link>
        <Link to="/favourites" className="text-flick-muted hover:text-white transition-colors flex items-center gap-2">
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
