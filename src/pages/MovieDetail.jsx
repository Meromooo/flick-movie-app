import { useParams } from 'react-router-dom'

// useParams lets us read the :id from the URL
// e.g. visiting /movie/550 gives us { id: '550' }
function MovieDetail() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-flick-bg text-white p-8">
      <h1 className="text-4xl font-bold">Movie Detail</h1>
      <p className="text-flick-muted mt-2">Movie ID: {id}</p>
      <p className="text-flick-muted">Full page coming in Phase 3</p>
    </div>
  )
}

export default MovieDetail
