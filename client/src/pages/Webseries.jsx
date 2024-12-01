import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WebSeries = () => {
    const [series, setSeries] = useState([]); // State to hold TV series
    const [error, setError] = useState(null); // State to hold error message
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

    useEffect(() => {
        const fetchTopRatedSeries = async () => {
            try {
                const response = await axios.get(
                    'https://api.themoviedb.org/3/tv/top_rated?api_key=1e0be92a954412ac300bef92b0acde71&language=en-US&page=1'
                );
                setSeries(response.data.results); 
                console.log(response.data.results);
                setLoading(false); // Data is fetched, set loading to false
            } catch (error) {
                setError("An error occurred while fetching TV series."); // Set error message
                setLoading(false); // Loading complete, even with an error
            }
        };

        fetchTopRatedSeries(); // Call the function to fetch top-rated TV series
    }, []); // Empty dependency array to run only once on mount

    const handleSearch = async () => {
        if (searchTerm) {
            setLoading(true); // Start loading when search begins
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/tv?api_key=1e0be92a954412ac300bef92b0acde71&query=${searchTerm}`
                );
                setSeries(response.data.results); // Update the series with search results
                setLoading(false); // Stop loading after results are fetched
                setError(null); // Clear any previous errors
            } catch (error) {
                setError("An error occurred while searching for TV series."); // Set error message
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
                <h1 className="text-3xl font-bold mb-8">Top Rated Web Series🔥</h1>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        className="border rounded p-2 w-1/2"
                        placeholder="Search for a TV series..."
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
                    {series.map((tvShow) => (
                        <div key={tvShow.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg">
                            {tvShow.poster_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
                                    alt={tvShow.name}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-xl font-bold">{tvShow.name}</h2>
                            <p className="text-gray-600 mb-2">First Air Date: {tvShow.first_air_date}</p>
                            <p className="text-gray-600 mb-2">Rating: {tvShow.vote_average}</p>
                            <p className="text-gray-500 mb-4">{tvShow.overview}</p>

                            {/* Dynamic IMDb Link using the title */}
                            <a 
                                href={`https://www.imdb.com/find?q=${encodeURIComponent(tvShow.name)}`} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="bg-blue-500 text-white rounded px-4 py-2 mt-auto hover:bg-blue-600"
                            >
                                View on IMDb
                            </a>
                        </div>
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default WebSeries;
