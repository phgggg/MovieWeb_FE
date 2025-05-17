import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GenreDropdown = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/genre/findAllGenre`);
        const data = await response.json();
        if (data.errorCode != "00") {
          throw new Error(`HTTP error! status: ${data.description}`);
        }
        setGenres(data.listData || []);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) return <div>Loading genres...</div>;
  if (error) return <div>Error loading genres: {error}</div>;

  return (
    <div className="relative group inline-block my-auto">
      {/* Main button */}
      <button 
        className="hover:bg-gray-700 transition-colors duration-200 h-16 rounded"
      >
        Phim theo thể loại
      </button>
      
      {/* Dropdown menu */}
      <div 
        className="absolute left-0 mt-2 bg-black text-white rounded shadow-md min-w-[150px] z-10 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200"
      >
        {genres.map((genre) => (
          <button
            key={genre.genreID}
            onClick={() => navigate(`/genre/${genre.genreName}`)}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
          >
            {genre.genreName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreDropdown;