import { createContext, useContext, useState, useEffect } from 'react'

const FavouritesContext = createContext()

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const stored = localStorage.getItem('flick-favourites')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('flick-favourites', JSON.stringify(favourites))
  }, [favourites])

  const toggleFavourite = (movie) => {
    setFavourites(prev =>
      prev.some(m => m.id === movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    )
  }

  const isFavourite = (id) => favourites.some(m => m.id === id)

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export const useFavourites = () => useContext(FavouritesContext)