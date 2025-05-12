import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenreDropdown from "../Genre/GenreDropdown";

const Header = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("user");
  const [userId, setUserId] = useState(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [recommendedContent, setRecommendedContent] = useState({
    movies: [],
    series: []
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      if (user.userName) {
        setUserName(user.userName);
      }
      if (user.userID) {
        setUserId(user.userID);
        
        // Fetch recommended content for the specific user
        fetch(`http://localhost:8888/api/recommendations/user/${user.userID}`)
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
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Đăng xuất thành công");
    navigate("/login");
  };

  const handleRandomContent = () => {
    const hasMovies = recommendedContent.movies && recommendedContent.movies.length > 0;
    const hasSeries = recommendedContent.series && recommendedContent.series.length > 0;
    
    if (!hasMovies && !hasSeries) {
      alert("Không tìm thấy nội dung để xem ngẫu nhiên.");
      return;
    }
    
    // Randomly decide whether to show a movie or series (if both are available)
    const showMovie = hasMovies && (!hasSeries || Math.random() > 0.5);
    
    if (showMovie) {
      // Select a random movie
      const randomIndex = Math.floor(Math.random() * recommendedContent.movies.length);
      const randomMovie = recommendedContent.movies[randomIndex];
      navigate(`/movies/${randomMovie.movieID}`);
    } else {
      // Select a random series
      const randomIndex = Math.floor(Math.random() * recommendedContent.series.length);
      const randomSeries = recommendedContent.series[randomIndex];
      navigate(`/series/${randomSeries.serieID}`);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const hanldeActor = () => {
    navigate(`/actors`);
  };

  return (
    <nav className="bg-black text-white flex items-center justify-between px-6 py-4 shadow-lg">
      <div className="flex space-x-6 text-lg">
        <button onClick={() => navigate("/homepage")} className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200">Trang chủ</button>
        <GenreDropdown />
        <button 
          onClick={handleRandomContent} 
          className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Xem ngẫu nhiên
        </button>
        <button 
          onClick={hanldeActor} 
          className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
        >
          Xem danh sách diễn viên
        </button>
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-200"
          >
            Tìm Kiếm
          </button>
        </div>
      </div>
      
      <div className="relative group">
        <div className="cursor-pointer">
          Welcome, {userName} ▼
        </div>
        
        <div
          className="absolute right-0 mt-2 bg-black text-white rounded shadow-md min-w-[150px] z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
        >
          <button
            onClick={() => navigate("/profile")}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Thông tin người dùng
          </button>
          <button onClick={() => navigate("/playlist")} className="block w-full text-left px-4 py-2 hover:bg-gray-700">Danh sách yêu thích</button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-700"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;