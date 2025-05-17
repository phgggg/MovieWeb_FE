import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
const MovieDetail = () => {
  const { movieID } = useParams(); // Lấy movieID từ URL
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/movie/findByMovieID/${movieID}`);
        const data = await response.json();

        if (data.errorCode === "00") {
          setMovieDetails(data.data);
        } else {
          console.error("Error fetching movie details:", data.description);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieID]);

  if (!movieDetails) {
    return <p className="text-white text-center mt-10">Loading movie details...</p>;
  }

  const { 
    movieName, 
    overview, 
    posterPath, 
    voteAverage, 
    genres, 
    releaseDate, 
    budget, 
    revenue, 
    runtime,
    homepage
  } = movieDetails;

  const handlePlaylistAdd = async (e) =>{
    const user = JSON.parse(localStorage.getItem("user"));
    const playlistItem = {
      movieID: movieID
    };
    const requestBody = {
      userID: user.userID,
      playlistItemDTO: playlistItem
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/playlist/addToPlaylist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
      const data = await response.json();

      if (data.errorCode === "00") {
        alert("Đã thêm vào playlist")
      } else {
        alert(data.description);
        console.error("Lỗi không thêm được vào playlist:", data.description);
      }
    } catch (error) {
      console.error("Lỗi không thêm được vào playlist:", error);
    }
  }

  return (
    <div className="bg-black text-white min-h-screen">
  {/* Header nằm riêng ở trên */}
  <div className="p-6 bg-gradient-to-b from-black to-transparent w-full">
    <Header />
  </div>

  {/* Nội dung chính */}
  <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row items-center md:items-start">
    
    {/* Poster Image */}
    <img
      src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : "default_image_url.jpg"}
      alt={movieName}
      className="w-96 h-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
    />

    {/* Movie Details */}
    <div className="md:ml-10 mt-6 md:mt-0 flex-1">
      <h1 className="text-4xl font-extrabold">{movieName}</h1>
      <p className="text-gray-400 text-lg mt-2">{overview}</p>

      {/* Rating & Info */}
      <div className="mt-4 flex items-center space-x-4">
        <span className="bg-red-600 px-3 py-1 rounded-full font-semibold">
          ⭐ {voteAverage} / 10
        </span>
        <span>{runtime} min</span>
      </div>

      {/* Genre List */}
      <div className="mt-4">
        <strong>Thể loại:</strong>
        <span className="ml-2">
          {genres.map((genre, index) => (
            <span key={genre.genreID} className="text-red-400">
              {genre.genreName}
              {index < genres.length - 1 && ", "}
            </span>
          ))}
        </span>
      </div>

      {/* Dates & Financials */}
      <p className="mt-4 text-gray-400">
        Ngày ra mắt: {new Date(releaseDate).toLocaleDateString()}
      </p>
      <p className="text-gray-400">Kinh phí: ${budget.toLocaleString()}</p>
      <p className="text-gray-400">Doanh thu: ${revenue.toLocaleString()}</p>

      <button onClick={handlePlaylistAdd} className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition">Thêm vào danh sách xem</button><br/>
      {/* Watch Now Button */}
      <button onClick={() => navigate(`/playMovie/${movieID}`)} className="mt-6 inline-block bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition">
        🔥 Xem ngay
      </button>
    </div>
  </div>
</div>

  );
};

export default MovieDetail;
