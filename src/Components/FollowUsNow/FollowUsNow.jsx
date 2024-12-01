import CardImage01 from '../../assets/images/cups/Rectangle 9.png'
import CardImage02 from '../../assets/images/cups/Rectangle 10.png'
import CardImage03 from '../../assets/images/cups/Rectangle 11.png'
import CardImage04 from '../../assets/images/cups/Rectangle 12.png'
import CardImage05 from '../../assets/images/cups/Rectangle 13.png'
import CardImage06 from '../../assets/images/cups/Rectangle 14.png'
import CardImage07 from '../../assets/images/cups/Rectangle 15.png'
import CardImage08 from '../../assets/images/cups/Rectangle 16.png'

const FollowUsNow = () => {
    const instagramImages = [
        { id: 1, src: CardImage01, alt: "Coffee cup with beans" },
        { id: 2, src: CardImage02, alt: "Latte art coffee" },
        { id: 3, src: CardImage03, alt: "Coffee with latte art" },
        { id: 4, src: CardImage04, alt: "Orange cup coffee" },
        { id: 5, src: CardImage05, alt: "Espresso with beans" },
        { id: 6, src: CardImage06, alt: "Latte art with coffee bag" },
        { id: 7, src: CardImage07, alt: "Smiling coffee" },
        { id: 8, src: CardImage08, alt: "Artistic latte design" }
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
