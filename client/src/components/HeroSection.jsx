import React from 'react';

const HeroSection = () => {
    return (
        <section className=" dark:bg-gray-800 ">
            <div className="mt-24 max-w-screen-xl mx-auto px-4 py-12 md:flex md:items-center md:justify-between h-[70vh] md:h-[100vh]">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white sm:text-5xl">
                        Discover Your Next Favorite Story
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                        Explore movies, books, and web series all in one place. Your next adventure awaits!
                    </p>
                    <div className="mt-8">
                        <a
                            href="#"
                            className="inline-block px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
                        >
                            Get Started
                        </a>
                    </div>
                </div>
                <div className="mt-8  md:mt-0">
                    <img
                        src="/heroImage.png" // Replace with your hero image
                        alt="Hero Image"
                        className="w-full "
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
