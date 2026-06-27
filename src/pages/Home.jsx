import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getTrending, getPopular } from '../services/tmdb'
import MovieGrid from '../components/ui/MovieGrid'

function Home() {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMovies() {
      try {
        const [trendingData, popularData] = await Promise.all([
          getTrending(),
          getPopular(),
        ])
        setTrending(trendingData.results)
        setPopular(popularData.results)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-flick-bg flex items-center justify-center">
        <p className="text-flick-accent text-xl animate-pulse">Loading...</p>
      </div>
    )
  }

  return (
    <main className="bg-flick-bg min-h-screen px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <span style={{
            background: 'linear-gradient(90deg, #6B7280, #ffffff, #6B7280)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 3s linear infinite',
            display: 'inline-block',
          }}>
            Discover
          </span>
          {' '}
          <span style={{
            color: '#F5A623',
            animation: 'neon-pulse 2s ease-in-out infinite',
            display: 'inline-block',
          }}>
            Movies
          </span>
        </h1>
        <p className="text-flick-muted text-lg">
          All trending and popular films, All in a Flick!
        </p>
      </motion.div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-white mb-6">🔥 Trending This Week</h2>
        <MovieGrid movies={trending} />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-6">⭐ Popular Right Now</h2>
        <MovieGrid movies={popular} />
      </section>
    </main>
  )
}

export default Home
