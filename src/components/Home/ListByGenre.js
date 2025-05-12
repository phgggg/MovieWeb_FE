import MovieList from "../Movie/MovieList";
import SerieList from "../Serie/SerieList";
import Header from "../Header/Header";
import MovieListByGenre from "../Movie/MovieListByGenre";
import SerieListByGenre from "../Serie/SerieListByGenre";
const ListByGenre = () => {
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
          <button className="mt-4 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">
            ▶ Watch Now
          </button>
        </div>
      </div>

      {/* Movie & Series Sections */}
      <div className="mt-10 px-6">

        <MovieListByGenre />
        
        <SerieListByGenre />
      </div>
    </div>
  );
};

export default ListByGenre;
