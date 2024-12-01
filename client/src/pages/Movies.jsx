import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Movies = () => {
    const [movies, setMovies] = useState([]); // State to hold movies
    const [error, setError] = useState(null); // State to hold error message
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/movie/top_rated?api_key=1e0be92a954412ac300bef92b0acde71&language=en-US&page=1'
                );
                const popularMovies = response.data.results;

                // For each movie, fetch the IMDb ID
                const moviesWithIMDb = await Promise.all(
                    popularMovies.map(async (movie) => {
                        const movieDetails = await axios.get(
                            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=1e0be92a954412ac300bef92b0acde71`
                        );
                        return {
                            ...movie,
                            imdb_id: movieDetails.data.imdb_id, // Add IMDb ID to movie object
                        };
                    })
                );
                setMovies(moviesWithIMDb); // Store results in movies state
                setLoading(false); // Data is fetched, set loading to false
            } catch (error) {
                setError("An error occurred while fetching movies."); // Set error message
                setLoading(false); // Loading complete, even with an error
            }
        };

        fetchMovies(); // Call the function to fetch movies
    }, []); // Empty dependency array to run only once on mount

    const handleSearch = async () => {
        if (searchTerm) {
            setLoading(true); // Start loading when search begins
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=1e0be92a954412ac300bef92b0acde71&query=${searchTerm}`
                );
                const searchResults = response.data.results;

                // Fetch IMDb IDs for search results
                const moviesWithIMDb = await Promise.all(
                    searchResults.map(async (movie) => {
                        const movieDetails = await axios.get(
                            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=1e0be92a954412ac300bef92b0acde71`
                        );
                        return {
                            ...movie,
                            imdb_id: movieDetails.data.imdb_id, // Add IMDb ID to movie object
                        };
                    })
                );
                setMovies(moviesWithIMDb); // Update the movies with search results
                setLoading(false); // Stop loading after results are fetched
                setError(null); // Clear any previous errors
            } catch (error) {
                setError("An error occurred while searching for movies."); // Set error message
                setLoading(false); // Stop loading if there's an error
            }
        }
    };

    // Preloader component
    const Preloader = () => (
        <div className="flex items-center justify-center h-screen">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div>
            <Navbar />
            <div className="mt-32 text-center">
                <h1 className="text-3xl font-bold mb-8">Trending Movies🔥</h1>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        className="border rounded p-2 w-1/2"
                        placeholder="Search for a movie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white rounded px-4 py-2 ml-4 hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Error Handling */}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Loading */}
            {loading ? (
                <Preloader /> // Show preloader if data is still loading
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
                    {movies.map((movie) => (
                        <div key={movie.id} className="transform transition duration-300 hover:scale-105 hover:shadow-lg bg-white rounded-lg shadow-lg p-4 flex flex-col">
                            {movie.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-xl font-bold">{movie.title}</h2>
                            <p className="text-gray-600 mb-2">Release Date: {movie.release_date}</p>
                            <p className="text-gray-600 mb-2">Rating: {movie.vote_average}</p>
                            <p className="text-gray-500 mb-4">{movie.overview}</p>

                            {/* IMDb Button with specific link */}
                            {movie.imdb_id ? (
                                <a
                                    href={`https://www.imdb.com/title/${movie.imdb_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white rounded px-4 py-2 mt-auto hover:bg-blue-600"
                                >
                                    View on IMDb
                                </a>
                            ) : (
                                <p className="text-red-500 mt-auto">IMDb link unavailable</p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Movies;





