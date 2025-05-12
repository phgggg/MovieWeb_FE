import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
const PlaylistResult = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const key = user.userID;
  const [PlaylistResults, setPlaylistResults] = useState({
    movieList: [],
    serieList: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchPlaylistResults = async () => {
    setLoading(true);
    try {
      
      const response = await fetch(`http://localhost:8888/api/playlist/getPlayListItemFromUser/${key}`);
      const result = await response.json();  
      if (result.errorCode === "00") {
        setPlaylistResults({
          movieList: result.data.movieList || [],
          serieList: result.data.serieList || []
        });
      } else {
        throw new Error(result.description || "Lỗi khi lấy Playlist");
      }
    } catch (err) {
      setError(err.message);
      console.error("Lỗi khi lấy Playlist:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
    if(loading){
      fetchPlaylistResults();
    }
  });
  
  const handleMovieClick = (movieID) => {
    navigate(`/movies/${movieID}`);
  };

  const handleSerieClick = (serieID) => {
    navigate(`/series/${serieID}`);
  };

  const handleMovieDelItem = async (movieID) => {
    try
    {
      const requestBody = 
      {
        movieID: movieID,
        userID: key
      };
      const response = await fetch("http://localhost:8888/api/playlist/deleteItemFromPlaylist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });  
      const result = await response.json();
      if (result.errorCode === "00"){
        fetchPlaylistResults();
        alert("Xóa thành công");
      }
    }catch (err) {
      setError(err.message);
      console.error("Lỗi khi xóa phim khỏi playlist:", err);
    }
  };

  const handleSerieDelItem = async (serieID) => {
    try
    {
      const requestBody = 
      {
        serieID: serieID,
        userID: key
      };
      const response = await fetch("http://localhost:8888/api/playlist/deleteItemFromPlaylist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });  
      const result = await response.json();
      if (result.errorCode === "00"){
        fetchPlaylistResults();
        alert("Xóa thành công");
      }
    }catch (err) {
      setError(err.message);
      console.error("Lỗi khi xóa phim khỏi playlist:", err);
    }
  };

  // Movie item component
  const MovieItem = ({ movie }) => (
    <div
      className="flex flex-col bg-gray-900 rounded-lg overflow-hidden min-w-64 max-w-64 mb-6 mr-4"
      onClick={() => handleMovieClick(movie.movieID)}
    >
      <img
        src={movie.posterPath ? `https://image.tmdb.org/t/p/w500${movie.posterPath}` : "/placeholder-poster.jpg"}
        alt={movie.movieName}
        className="w-full h-96 object-cover"
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold">{movie.movieName}</h3>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">⭐ {movie.voteAverage.toFixed(1)}</span>
          <span className="ml-2 text-gray-400">({movie.voteCount} votes)</span>
        </div>
        <p className="text-gray-400 mt-2 text-sm line-clamp-3 flex-grow">{movie.overview}</p>
        <button className="mt-4 bg-gray-600 text-white py-1 px-3 rounded hover:bg-red-700 self-start" 
        onClick={(e) => {
          e.stopPropagation();
          handleMovieDelItem(movie.movieID);
        }}
        >
          Xóa
        </button>
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
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-lg font-semibold">{serie.serieName}</h3>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">⭐ {serie.voteAverage.toFixed(1)}</span>
          <span className="ml-2 text-gray-400">({serie.voteCount} votes)</span>
        </div>
        <p className="text-gray-400 mt-2 text-sm line-clamp-3 flex-grow">{serie.overview}</p>
        <button className="mt-4 bg-gray-600 text-white py-1 px-3 rounded hover:bg-red-700 self-start" 
        onClick={(e) => {
          e.stopPropagation();
          handleSerieDelItem(serie.serieID);
        }}
        >
          Xóa
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <Header className="p-6 bg-gradient-to-b from-black to-transparent absolute w-full">
        <h1 className="text-3xl font-bold">🔥 Netflix Clone</h1>
      </Header>
      
      {/*Playlist Results */}
      <div className="pt-24 px-6">
        <h2 className="text-2xl font-bold mb-4">Danh sách yêu thích của {user.userName}</h2>
        
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
            {PlaylistResults.movieList && PlaylistResults.movieList.length > 0 ? (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Movies</h2>
                <div className="flex flex-wrap">
                  {PlaylistResults.movieList.map(movie => (
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
            {PlaylistResults.serieList && PlaylistResults.serieList.length > 0 ? (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Series</h2>
                <div className="flex flex-wrap">
                  {PlaylistResults.serieList.map(serie => (
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
            
            {PlaylistResults.movieList.length === 0 && 
             PlaylistResults.serieList.length === 0 && (
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

export default PlaylistResult;