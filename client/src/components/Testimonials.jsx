import React from 'react';

const Testimonials = () => {
    // Testimonials data in an array of objects
    const testimonials = [
        {
            name: "Rajat",
            position: "Film Critic",
            text: "InkAndScreen transformed our design process! The intuitive interface and seamless collaboration tools have made it easier for our team to bring our ideas to life.",
            avatar: "/avatar.jpg"
        },
        {
            name: "Saranya",
            position: "Product Manager",
            text: "Thanks to InkAndScreen, our team has significantly improved our workflow. The features are just what we needed to boost our productivity.",
            avatar: "/avatar.jpg"
        },
        {
            name: "Mohit Singh",
            position: "Marketing Director",
            text: "I love how InkAndScreen integrates with our existing tools! It has made it so much easier to keep everything organized.",
            avatar: "/avatar.jpg"
        }
    ];

    return (
        <div className="py-5 dark:bg-gray-900">
            <div className="container flex flex-col items-center justify-center w-full p-6 mx-auto text-center xl:px-0">
                <div className=" font-bold tracking-wider text-indigo-600 uppercase">Testimonials</div>
                <h2 className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white">
                    Here's what our customers said
                </h2>
                <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                    Testimonials are a great way to increase brand trust and awareness. Use this section to highlight your popular customers.
                </p>
            </div>
            <div className="container p-6 mx-auto mb-10 xl:px-0">
                <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className={`flex flex-col justify-between w-full h-full px-6 py-6 bg-gray-100 dark:bg-gray-800 md:px-14 rounded-2xl md:py-14 dark:bg-trueGray-800 ${index % 2 === 0 ? 'lg:col-span-2 xl:col-auto' : ''}`}>
                            <p className="text-2xl leading-normal dark:text-gray-300">
                                "{testimonial.text}"
                            </p>
                            <div className="flex items-center mt-8 space-x-3">
                                <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
                                    <img
                                        alt="Avatar"
                                        src={testimonial.avatar}
                                        loading="lazy"
                                    />
                                </div>
                                <div >
                                    <div className="text-lg font-medium">{testimonial.name}</div>
                                    <div className="text-gray-600 dark:text-gray-400">{testimonial.position}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;



