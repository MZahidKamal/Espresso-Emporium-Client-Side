import { FaEye, FaPen, FaTrash } from 'react-icons/fa'
import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {FiAlertCircle} from "react-icons/fi";
import Swal from 'sweetalert2'
import BASE_URL from "../../SharedUtilities/SharedUtilities.jsx";
import AuthContext from "../../Providers/AuthContext.jsx";


const PopularProductCard = ({ product }) => {


    const { _id, name, chef, photo } = product;

    const {user} = useContext(AuthContext)
    const [error, setError] = useState(null);


    const handleDelete = async () => {
        try {

            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })

            if (result.isConfirmed) {

                const response = await fetch(`${BASE_URL}/coffees/${_id}`, {
                    method: 'DELETE',
                });
                const result = await response.json(); // Parse the JSON response

                if (!response.ok) new Error(result.message || 'Failed to delete coffee');

                await Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            } else if (result.isDenied) {
                await Swal.fire("Delete aborted", "", "info");
            }

            // console.log(result); // Server response for debugging
        } catch (error) {
            setError(error.message);
        }
    }


    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-100 to-pink-100">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <FiAlertCircle className="text-4xl text-red-600 mb-4 mx-auto" />
                    <p className="text-red-500 text-center">Error: {error}</p>
                </div>
            </div>
        );
    }


    return (
        <div className="bg-[#F5F4F1] rounded-lg p-6 flex flex-col md:flex-row items-center gap-4">
            <img
                src={photo}
                alt={name}
                className="w-48 h-48 object-contain"
            />
            <div className="flex-1 space-y-2 text-center md:text-left">
                <p className="text-2xl text-[#1B1A1A]"><span className="text-2xl font-semibold">Name:</span> {name}</p>
                <p className="text-2xl text-[#1B1A1A]"><span className="text-2xl font-semibold">Chef:</span> {chef}</p>
                <p className="text-2xl text-[#1B1A1A]"><span className="text-2xl font-semibold">Price:</span> 500 Taka</p>
            </div>
            <div className="flex md:flex-col gap-3">
                <Link to={`/coffee_details/${_id}`} className="p-2 rounded bg-[#D2B48C] hover:bg-[#C59D5F] transition-colors">
                    <FaEye className="text-white" />
                </Link>
                <Link to={`/update_a_coffee/${_id}`} className="p-2 rounded bg-[#3C393B] hover:bg-black transition-colors">
                    <FaPen className="text-white" />
                </Link>
                {user && <button onClick={handleDelete}
                                 className="p-2 rounded bg-[#EA4744] hover:bg-red-700 transition-colors"><FaTrash
                    className="text-white"/></button>}

            </div>
        </div>
    )
}


export default PopularProductCard;
