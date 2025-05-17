import { useState, useEffect } from 'react';

const EpisodeGrid = ({ serieID }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/serie/findSerieEpisode/${serieID}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch episodes');
        }
        
        const data = await response.json();
        
        // Kiểm tra cấu trúc response và lấy dữ liệu từ listData
        if (data.errorCode === "00" && data.description === "ok" && Array.isArray(data.listData)) {
          setEpisodes(data.listData);
        } else {
          throw new Error('Invalid response format');
        }
        
        setLoading(false);
      } catch (err) {
        console.error("API error:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [serieID]);

  const navigate = (path) => {
    // Implement your navigation logic here or import from your router
    console.log(`Navigating to: ${path}`);
    // Nếu sử dụng React Router:
    // navigate(path);
    // Nếu không:
    window.location.href = path;
  };

  const renderEpisodeGrid = () => {
    const rows = [];
    
    for (let i = 0; i < episodes.length; i += 3) {
      const rowEpisodes = episodes.slice(i, i + 3);
      
      rows.push(
        <div key={`row-${i}`} className="flex gap-4 mb-4">
          {rowEpisodes.map(episode => (
            <button
              key={episode.id}
              onClick={() => navigate(`/playSerie/${serieID}/${episode.episodeID}`)}
              className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-red-700 transition text-center"
            >
              Tập {episode.episodeNumber || episode.episode || i + 1}
            </button>
          ))}
        </div>
      );
    }
    
    return rows;
  };

  if (loading) {
    return <div className="text-center py-6">Loading episodes...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-6">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button 
          onClick={() => navigate(`/playSerie/${serieID}`)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition"
        >
          🔥 Watch Now
        </button>
      </div>
    );
  }

  if (episodes.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="mb-4">No episodes available</p>
        <button 
          onClick={() => navigate(`/playSerie/${serieID}`)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition"
        >
          🔥 Watch Now
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Danh sách tập phim</h3>
      {renderEpisodeGrid()}
    </div>
  );
};

export default EpisodeGrid;