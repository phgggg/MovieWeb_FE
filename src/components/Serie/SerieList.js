import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = `${process.env.REACT_APP_API_URL}/api/serie/findAll`;
const TAGS = ["topRated", "popular", "airingToday", "onTV"];

const SerieList = () => {
  const [filteredSeries, setFilteredSeries] = useState({ topRated: [], popular: [], airingToday: [], onTV: [] });
  const navigate = useNavigate();

  const handleSerieClick = (serieID) => {
    navigate(`/series/${serieID}`);
  };

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.listData)) {
          const categorizedSeries = TAGS.reduce((acc, tag) => {
            acc[tag] = data.listData.filter((serie) => serie.tags.includes(tag));
            return acc;
          }, {});
          setFilteredSeries(categorizedSeries);
        } else {
          console.error("Dữ liệu không phải mảng listData.");
        }
      })
      .catch((error) => console.error("Error fetching series:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      {TAGS.map((tag) => (
        <div key={tag} className="mb-8">
          <h2 className="text-2xl font-bold mb-4 capitalize">{tag}</h2>

          {/* Thanh trượt ngang */}
          <div className="overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex flex-nowrap overflow-x-auto scrollbar-hide gap-4">
              {filteredSeries[tag] && filteredSeries[tag].length > 0 ? (
                filteredSeries[tag].map((serie) => (
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
                <p className="text-gray-400">No series found for this category.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SerieList;
