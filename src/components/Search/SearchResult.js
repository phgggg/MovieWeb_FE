import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
const SearchResult = () => {
  const { key } = useParams();
  const [searchResults, setSearchResults] = useState({
    movieList: [],
    serieList: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/search/${key}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (result.errorCode === "00") {
          setSearchResults({
            movieList: result.data.movieList || [],
            serieList: result.data.serieList || []
          });
        } else {
          throw new Error(result.description || "Search failed");
        }
      } catch (err) {
        setError(err.message);
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (key) {
      fetchSearchResults();
    }
  }, [key]);

  const handleMovieClick = (movieID) => {
    navigate(`/movies/${movieID}`);
  };

  const handleSerieClick = (serieID) => {
    navigate(`/series/${serieID}`);
  };

  // Movie item component
  const MovieItem = ({ movie }) => (
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
  );

  // Serie item component
  const SerieItem = ({ serie }) => (
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
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <Header className="p-6 bg-gradient-to-b from-black to-transparent absolute w-full">
        <h1 className="text-3xl font-bold">🔥 Netflix Clone</h1>
      </Header>
      
      {/* Search Results */}
      <div className="pt-24 px-6">
        <h2 className="text-2xl font-bold mb-4">Search results for: "{key}"</h2>
        
        {loading && (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4">Loading results...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 text-red-200 p-4 rounded-md">
            <p>Error: {error}</p>
          </div>
        )}
        
        {!loading && !error && (
          <>
            {/* Movies Section */}
            {searchResults.movieList && searchResults.movieList.length > 0 ? (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Movies</h2>
                <div className="flex flex-wrap">
                  {searchResults.movieList.map(movie => (
                    <MovieItem key={movie.movieID} movie={movie} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Movies</h2>
                <p className="text-gray-400">No movies found matching "{key}"</p>
              </div>
            )}
            
            {/* Series Section */}
            {searchResults.serieList && searchResults.serieList.length > 0 ? (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Series</h2>
                <div className="flex flex-wrap">
                  {searchResults.serieList.map(serie => (
                    <SerieItem key={serie.serieID} serie={serie} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Series</h2>
                <p className="text-gray-400">No series found matching "{key}"</p>
              </div>
            )}
            
            {searchResults.movieList.length === 0 && 
             searchResults.serieList.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">No results found for "{key}"</p>
                <p className="text-gray-500 mt-2">Try searching with different keywords</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchResult;