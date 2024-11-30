import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {FiAlertCircle, FiLoader} from "react-icons/fi";
import BASE_URL from "../../SharedUtilities/SharedUtilities.jsx";


const CoffeeDetails = () => {


    const { id } = useParams();
    const [coffee, setCoffee] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchCoffee = async () => {
            try {
                const response = await fetch(`${BASE_URL}/coffees/${id}`);
                if (!response.ok) {
                    new Error('Failed to fetch coffee details');
                }
                const data = await response.json();
                setCoffee(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCoffee().then();
    }, [id]);


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-teal-100">
                <FiLoader className="animate-spin text-4xl text-green-600" />
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-teal-100">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <FiAlertCircle className="text-4xl text-green-600 mb-4 mx-auto" />
                    <p className="text-green-500 text-center">Error: {error}</p>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-[calc(100vh-96px-530px)] bg-[url('/src/assets/images/more/11.png')] flex flex-col items-center justify-center">
            <div className="container mx-auto px-4 py-8">
                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-[#374151] hover:text-[#331A15] transition-colors mb-8"
                >
                    <FaArrowLeft />
                    <span className="font-rancho text-2xl font-semibold">Back to home</span>
                </Link>

                {/* Details Container */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                        {/* Coffee Image */}
                        <div className="w-full md:w-1/2">
                            <img
                                src={coffee.photo}
                                alt={coffee.name}
                                className="w-full max-w-md mx-auto"
                            />
                        </div>

                        {/* Coffee Details */}
                        <div className="w-full md:w-1/2 space-y-6">
                            <h2 className="font-rancho text-5xl text-[#331A15] mb-6">
                                Niceties
                            </h2>
                            <div className="space-y-4 text-2xl">
                                <p>
                                    <span className="font-bold">Name:</span>{" "}
                                    <span className="text-gray-600">{coffee.name}</span>
                                </p>
                                <p>
                                    <span className="font-bold">Chef:</span>{" "}
                                    <span className="text-gray-600">{coffee.chef}</span>
                                </p>
                                <p>
                                    <span className="font-bold">Supplier:</span>{" "}
                                    <span className="text-gray-600">{coffee.supplier}</span>
                                </p>
                                <p>
                                    <span className="font-bold">Taste:</span>{" "}
                                    <span className="text-gray-600">{coffee.taste}</span>
                                </p>
                                <p>
                                    <span className="font-bold">Category:</span>{" "}
                                    <span className="text-gray-600">{coffee.category}</span>
                                </p>
                                <p>
                                    <span className="font-bold">Details:</span>{" "}
                                    <span className="text-gray-600">{coffee.details}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoffeeDetails;
