import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavouritesProvider } from './context/FavouritesContext'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieDetail from './pages/MovieDetail'
import Favourites from './pages/Favourites'
import NotFound from './pages/NotFound'

function App() {
  return (
    <FavouritesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/search"     element={<Search />} />
          <Route path="/movie/:id"  element={<MovieDetail />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="*"           element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FavouritesProvider>
  )
}

export default App
