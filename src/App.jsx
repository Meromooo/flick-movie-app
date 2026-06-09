import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import MovieDetail from './pages/MovieDetail'
import Favourites from './pages/Favourites'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/search"     element={<Search />} />
        <Route path="/movie/:id"  element={<MovieDetail />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
