import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { searchMovies } from '../services/tmdb'
import MovieGrid from '../components/ui/MovieGrid'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    const timeout = setTimeout(async () => {
      setLoading(true)
      setSearched(true)
      try {
        const data = await searchMovies(query)
        setResults(data.results)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timeout)
  }, [query])

  return (
    <div className="bg-flick-bg min-h-screen px-8 py-12">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto mb-12"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Find your next <span className="text-flick-accent">favourite</span>
        </h1>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-flick-muted text-xl">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full bg-flick-surface text-white placeholder-flick-dim rounded-full px-12 py-4 text-lg outline-none border-2 border-transparent focus:border-flick-accent transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-flick-muted hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-flick-accent animate-pulse text-lg"
          >
            Searching...
          </motion.p>
        )}

        {!loading && searched && results.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <p className="text-6xl mb-4">🎬</p>
            <p className="text-white text-xl font-semibold">No results for "{query}"</p>
            <p className="text-flick-muted mt-2">Try a different title or keyword</p>
          </motion.div>
        )}

        {!loading && results.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-flick-muted mb-6">
              <span className="text-white font-semibold">{results.length}</span> results for "{query}"
            </p>
            <MovieGrid movies={results} />
          </motion.div>
        )}

        {!loading && !searched && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center mt-12"
          >
            <p className="text-8xl mb-4">🎥</p>
            <p className="text-flick-muted text-lg">Start typing to discover movies</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Search
