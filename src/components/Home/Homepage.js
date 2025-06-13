import MovieList from "../Movie/MovieList";
import SerieList from "../Serie/SerieList";
import Header from "../Header/Header";
import RecommendList from "../Recommend/RecommendList";
import { useParams, useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <Header className="p-6 bg-gradient-to-b from-black to-transparent absolute w-full">
        <h1 className="text-3xl font-bold">🔥 Netflix Clone</h1>
      </Header>

      {/* Hero Section */}
      <div className="relative">
        <img
          src="https://image.tmdb.org/t/p/original/9WsliRMsMwwxwJrKQzlFf55JXZ7.jpg"
          alt="Featured Movie"
          className="w-full h-[500px] object-cover"
        />
        <div className="absolute bottom-10 left-10">
          <h2 className="text-4xl font-extrabold">Avatar: The Last Airbender</h2>
          <p className="max-w-xl text-gray-300 mt-2">
            In a war-torn world of elemental magic, a young boy reawakens to undertake a dangerous quest...
          </p>
          <button onClick={() => navigate(`/playSerie/246`)} className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
            ▶ Watch Now
          </button>
        </div>
      </div>

      {/* Movie & Series Sections */}
      <div className="mt-10 px-6">
        <h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
        <MovieList />

        <h2 className="text-2xl font-bold mt-10 mb-4">Popular Series</h2>
        <SerieList />

        <h2 className="text-2xl font-bold mt-10 mb-4">For you</h2>
        <RecommendList />
      </div>
    </div>
  );
};

export default Homepage;
