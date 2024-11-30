import PopularProductCard from "../PopularProductCard/PopularProductCard.jsx";
import BASE_URL from '../../SharedUtilities/SharedUtilities.jsx'
import { RiCupLine } from "react-icons/ri";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {FiLoader} from "react-icons/fi";


const PopularProducts = () => {


    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/coffees`);
                // const response = await fetch(`http://localhost:3000/coffees`);
                if (!response.ok) {
                    new Error('Failed to fetch coffees');
                }
                const data = await response.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchProducts().then();
    }, [products]);


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
                <FiLoader className="animate-spin text-4xl text-purple-600" />
            </div>
        );
    }


    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }


    return (
        <section className="pt-12 md:pt-16 bg-[url('/src/assets/images/more/1.png')] bg-cover bg-no-repeat">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-8 flex flex-col items-center gap-4">
                    <p className="text-2xl text-[#1B1A1A] mb-2">--- Sip & Savor ---</p>
                    <h2 className="font-rancho text-4xl md:text-6xl text-[#331A15] mb-4">Our Popular Products</h2>
                    <Link to={'/add_new_coffee'} className="px-6 py-2 bg-[#E3B577] hover:bg-[#C59D5F] text-white font-rancho text-2xl flex justify-center items-center gap-2 rounded transition-colors duration-300">
                        Add Coffee
                        <RiCupLine />
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {products.map((product, index) => (
                        <PopularProductCard key={index} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}


export default PopularProducts;
