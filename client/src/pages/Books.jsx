import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Books = () => {
    const [books, setBooks] = useState([]); // State to hold books data
    const [error, setError] = useState(null); // State to hold error message
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

    // Timeout duration (in milliseconds)
    const TIMEOUT_DURATION = 5000; // 5 seconds

    // Function to fetch popular books (Google Books API doesn't have popular endpoint, so we'll fetch a default search)
    const fetchPopularBooks = async () => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20`,
                { timeout: TIMEOUT_DURATION } // Set the timeout duration here
            );
            setBooks(response.data.items); // Store popular books in state
            setLoading(false); // Data is fetched, set loading to false
        } catch (error) {
            if (error.code === 'ECONNABORTED') {
                setError("Request timed out. Please try again later."); // Handle timeout error
            } else {
                setError("An error occurred while fetching books."); // Set generic error message
            }
            setLoading(false); // Loading complete, even with an error
        }
    };

    // Function to handle book search
    const handleSearch = async () => {
        if (searchTerm) {
            setLoading(true); // Start loading when search begins
            try {
                const response = await axios.get(
                    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=20`,
                    { timeout: TIMEOUT_DURATION } // Set the timeout duration here
                );
                setBooks(response.data.items); // Update the books with search results
                setLoading(false); // Stop loading after results are fetched
                setError(null); // Clear any previous errors
            } catch (error) {
                if (error.code === 'ECONNABORTED') {
                    setError("Search request timed out. Please try again."); // Handle timeout error
                } else {
                    setError("An error occurred while searching for books."); // Set generic error message
                }
                setLoading(false); // Stop loading if there's an error
            }
        }
    };

    useEffect(() => {
        fetchPopularBooks(); // Fetch popular books on component mount
    }, []);

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
                <h1 className="text-3xl font-bold mb-8">Popular Books 📚</h1>

                {/* Search Bar */}
                <div className="mb-8">
                    <input
                        type="text"
                        className="border rounded p-2 w-1/2"
                        placeholder="Search for a book..."
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
                    {books.map((book) => (
                        <div key={book.id} className="transform transition duration-300 hover:scale-105 hover:shadow-lg bg-white rounded-lg shadow-lg p-4 flex flex-col">
                            {book.volumeInfo.imageLinks?.thumbnail && (
                                <img
                                    src={book.volumeInfo.imageLinks.thumbnail}
                                    alt={book.volumeInfo.title}
                                    className="w-full h-64 object-cover rounded-lg mb-4"
                                />
                            )}
                            <h2 className="text-xl font-bold">{book.volumeInfo.title}</h2>
                            <p className="text-gray-600 mb-2">Author: {book.volumeInfo.authors?.join(', ')}</p>
                            <p className="text-gray-600 mb-2">Published: {book.volumeInfo.publishedDate}</p>
                            <p className="text-gray-500 mb-4">{book.volumeInfo.description?.substring(0, 100)}...</p>
                            <a
                                href={book.volumeInfo.infoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline mt-auto"
                            >
                                More Info
                            </a>
                        </div>
                    ))}
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Books;


