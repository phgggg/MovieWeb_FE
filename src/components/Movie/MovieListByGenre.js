import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:8888/api/movie";

const MovieListByGenre = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { genre } = useParams();

  const handleMovieClick = (movieID) => {
    navigate(`/movies/${movieID}`);
  };

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/findByMovieGenre/${genre}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (Array.isArray(data.listData)) {
          setMovies(data.listData);
        } else {
          console.error("Dữ liệu không phải mảng listData.");
          setMovies([]);
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError(err.message);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    if (genre) {
      fetchMoviesByGenre();
    }
  }, [genre]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 capitalize">Loading {genre} movies...</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 capitalize">{genre} Movies</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 capitalize">{genre} Movies</h2>
      
      {/* Thanh trượt ngang */}
      <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-4">
          {movies && movies.length > 0 ? (
            movies.map((movie) => (
              <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden min-w-64 mb-6 mr-4" onClick={() => handleMovieClick(movie.movieID)}>
                    <img 
                      src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : "/placeholder-poster.jpg"} 
                      alt={movie.movieName} 
                      className="w-full h-96 object-cover"
                      
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{movie.movieName}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-400">⭐ {movie.voteAverage.toFixed(1)}</span>
                        <span className="ml-2 text-gray-400">({movie.voteCount} votes)</span>
                      </div>
                      <p className="text-gray-400 mt-2 text-sm line-clamp-3">{movie.overview}</p>
                    </div>
                  </div>
            ))
          ) : (
            <p className="text-gray-400">No movies found in the {genre} genre.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieListByGenre;