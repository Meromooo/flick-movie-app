import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-screen bg-flick-bg text-white flex flex-col items-center justify-center gap-4">
      <p className="text-flick-accent text-8xl font-bold">404</p>
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-flick-muted">That page doesn't exist.</p>
      <Link to="/" className="text-flick-accent hover:text-flick-accent-dim underline">
        Go back home
      </Link>
    </div>
  )
}

export default NotFound
