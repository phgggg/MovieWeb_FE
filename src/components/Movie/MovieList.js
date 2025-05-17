import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = `${process.env.REACT_APP_API_URL}/api/movie/findAll`;
const TAGS = ["topRated", "upcoming", "nowPlaying"];

const MovieList = () => {
  const [filteredMovies, setFilteredMovies] = useState({ topRated: [], upcoming: [], nowPlaying: [] });
  const navigate = useNavigate();

  const handleMovieClick = (movieID) => {
    navigate(`/movies/${movieID}`);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.listData)) {
          const categorizedMovies = TAGS.reduce((acc, tag) => {
            acc[tag] = data.listData.filter((movie) => movie.tags.includes(tag));
            return acc;
          }, {});
          setFilteredMovies(categorizedMovies);
        } else {
          console.error("Dữ liệu không phải mảng listData.");
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {TAGS.map((tag) => (
        <div key={tag} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 capitalize">{tag}</h2>
          
          {/* Thanh trượt ngang */}
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-4">
              {filteredMovies[tag] && filteredMovies[tag].length > 0 ? (
                filteredMovies[tag].map((movie) => (
                  <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden min-w-64 max-w-64 mb-6 mr-4" onClick={() => handleMovieClick(movie.movieID)}>
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
                <p className="text-gray-400">No movies found for this category.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
