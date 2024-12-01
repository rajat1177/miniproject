import React from 'react';

const ContactSection = () => {
    return (
        <section className=" py-12">
            <div id="ContactSection" className="max-w-screen-xl mx-auto m-24">
                <div className="flex flex-col md:flex-row md:space-x-8">
                    {/* Contact Info */}
                    <div className="flex flex-col justify-evenly items-center md:w-1/2 mt-6 md:mt-0 bg-white  rounded-lg p-8 transition-transform duration-300 transform hover:scale-105">
                        <img src="/contact.jpg" alt="contact us" />
                        
                    </div>
                    {/* Contact Form */}
                    <div className="md:w-1/2 bg-white shadow-md rounded-lg p-8 transition-transform duration-300 transform hover:scale-105">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Form</h3>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-600" htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600" htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600" htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    rows="4"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Your Message"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default ContactSection;


