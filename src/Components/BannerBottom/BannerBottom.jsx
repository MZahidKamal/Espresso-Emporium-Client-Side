const BannerBottom = () => {


    const features = [
        {
            icon: "/src/assets/images/icons/1.png",
            title: "Awesome Aroma",
            description: "You will definitely be a fan of the design & aroma of your coffee"
        },
        {
            icon: "/src/assets/images/icons/2.png",
            title: "High Quality",
            description: "We served the coffee to you maintaining the best quality"
        },
        {
            icon: "/src/assets/images/icons/3.png",
            title: "Pure Grades",
            description: "The coffee is made of the green coffee beans which you will love"
        },
        {
            icon: "/src/assets/images/icons/4.png",
            title: "Proper Roasting",
            description: "Your coffee is brewed by first roasting the green coffee beans"
        }
    ]


    return (
        <div className="bg-[#ECEAE3] py-12 md:py-12">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center space-y-4"
                        >
                            <img
                                src={feature.icon}
                                alt={feature.title}
                                className="w-16 h-16 object-contain"
                            />
                            <h3 className="font-rancho text-4xl text-[#331A15]">
                                {feature.title}
                            </h3>
                            <p className="text-[#1B1A1A] text-xl">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default BannerBottom;
