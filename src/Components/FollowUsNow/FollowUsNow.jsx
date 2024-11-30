const FollowUsNow = () => {
    const instagramImages = [
        { id: 1, src: "/src/assets/images/cups/Rectangle 9.png", alt: "Coffee cup with beans" },
        { id: 2, src: "/src/assets/images/cups/Rectangle 10.png", alt: "Latte art coffee" },
        { id: 3, src: "/src/assets/images/cups/Rectangle 11.png", alt: "Coffee with latte art" },
        { id: 4, src: "/src/assets/images/cups/Rectangle 12.png", alt: "Orange cup coffee" },
        { id: 5, src: "/src/assets/images/cups/Rectangle 13.png", alt: "Espresso with beans" },
        { id: 6, src: "/src/assets/images/cups/Rectangle 14.png", alt: "Latte art with coffee bag" },
        { id: 7, src: "/src/assets/images/cups/Rectangle 15.png", alt: "Smiling coffee" },
        { id: 8, src: "/src/assets/images/cups/Rectangle 16.png", alt: "Artistic latte design" }
    ]

    return (
        <section id={'follow-us-now'} className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-8 flex flex-col items-center gap-4">
                    <p className="text-2xl text-[#1B1A1A] mb-2">Follow Us Now</p>
                    <h2 className="font-rancho text-4xl md:text-6xl text-[#331A15] mb-8">
                        Follow on Instagram
                    </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {instagramImages.map((image) => (
                        <div
                            key={image.id}
                            className="relative group overflow-hidden rounded-lg"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white font-rancho text-2xl hover:text-[#C59D5F] transition-colors"
                                >
                                    View on Instagram
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FollowUsNow
