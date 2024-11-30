import { Link } from 'react-router-dom'


const Banner = () => {
    return (
        <div className="bg-[url('/src/assets/images/more/3.png')] bg-cover bg-center h-[calc(100vh-21rem)] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />
            <div className="container mx-auto px-4 lg:px-8 relative h-full">
                <div className="flex flex-col justify-center h-full max-w-xl ml-auto">
                    <h1 className="font-rancho text-4xl md:text-5xl lg:text-7xl text-white mb-4">
                        Would you like a Cup of Delicious Coffee?
                    </h1>
                    <p className="text-gray-200 mb-8 text-sm md:text-xl lg:text-2xl">
                        It's coffee time - Sip & Savor - Relaxation in every sip! Get the nostalgia back!! Your companion of every moment!!! Enjoy the beautiful moments and make them memorable.
                    </p>
                    <Link
                        to="/about_us"
                        className="inline-block bg-[#C59D5F] hover:bg-[#B38C4B] text-white font-rancho text-2xl px-8 py-3 rounded transition-colors duration-300 w-fit"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Banner;
