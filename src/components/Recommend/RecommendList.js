import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = `${process.env.REACT_APP_API_URL}/api/recommendations/user/`;

const RecommendList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [recommendedContent, setRecommendedContent] = useState({
    movies: [],
    series: []
  });
  const navigate = useNavigate();

  const handleMovieClick = (movieID) => {
    navigate(`/movies/${movieID}`);
  };

  const handleSerieClick = (serieID) => {
    navigate(`/series/${serieID}`);
  };

  useEffect(() => {
    fetch(API_URL + user.userID)
      .then((response) => response.json())
      .then((data) => {
        if (data.errorCode === "00" && data.description === "ok") {
          setRecommendedContent({
            movies: data.data.movieList || [],
            series: data.data.serieList || []
          });
        } else {
          console.error("API error:", data.description);
        }
      })
      .catch((error) => console.error("Error fetching recommendations:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Movies Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-4">
            {recommendedContent.movies && recommendedContent.movies.length > 0 ? (
              recommendedContent.movies.map((movie) => (
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
              <p className="text-gray-400">No recommended movies found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Series Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Recommended Series</h2>
        <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-4">
            {recommendedContent.series && recommendedContent.series.length > 0 ? (
              recommendedContent.series.map((serie) => (
                <div className="flex flex-col bg-gray-900 rounded-lg overflow-hidden min-w-64 max-w-64 mb-6 mr-4" onClick={() => handleSerieClick(serie.serieID)}>
                    <img 
                      src={serie.posterPath ? `https://image.tmdb.org/t/p/w500${serie.posterPath}` : "/placeholder-poster.jpg"} 
                      alt={serie.serieName} 
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{serie.serieName}</h3>
                      <div className="flex items-center mt-2">
                        <span className="text-yellow-400">⭐ {serie.voteAverage.toFixed(1)}</span>
                        <span className="ml-2 text-gray-400">({serie.voteCount} votes)</span>
                      </div>
                      <p className="text-gray-400 mt-2 text-sm line-clamp-3">{serie.overview}</p>
                    </div>
                  </div>
              ))
            ) : (
              <p className="text-gray-400">No recommended series found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendList;