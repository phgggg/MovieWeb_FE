import { useState, useEffect } from "react";

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8888/api/movies")
            .then((res) => res.json())
            .then((data) => setMovies(data))
            .catch((err) => console.error("Error fetching movies:", err));
    }, []);

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-5">
            <header className="w-full flex justify-between items-center p-4 bg-gray-800 shadow-lg">
                <h1 className="text-3xl font-bold">🎬 Movie Library</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="#" className="hover:text-gray-400">Home</a></li>
                        <li><a href="#" className="hover:text-gray-400">Genres</a></li>
                        <li><a href="#" className="hover:text-gray-400">Trending</a></li>
                        <li><a href="#" className="hover:text-gray-400">Login</a></li>
                    </ul>
                </nav>
            </header>
            
            <div className="w-full max-w-7xl mt-5">
                <input 
                    type="text" 
                    placeholder="Search for movies..." 
                    className="w-full p-2 text-black rounded-md" 
                />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                {movies.map((movie) => (
                    <div key={movie.id} className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300">
                        <img src={movie.imageUrl} alt={movie.title} className="w-full h-64 object-cover rounded-md" />
                        <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
                        <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">Watch Now</button>
                    </div>
                ))}
            </div>

            <footer className="w-full mt-10 p-4 bg-gray-800 text-center">
                <p>&copy; 2025 Movie Library. All rights reserved.</p>
            </footer>
        </div>
    );
}