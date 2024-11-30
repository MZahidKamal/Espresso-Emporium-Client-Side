import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import {useNavigate, useParams} from "react-router";
import {FiAlertCircle, FiLoader} from "react-icons/fi";
import Swal from 'sweetalert2'


const UpdateACoffee = () => {


    const { id } = useParams();
    const [formData, setFormData] = useState({name: '', chef: '', supplier: '', taste: '', category: '', details: '', photo: ''})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchCoffee = async () => {
            try {
                const response = await fetch(`https://espresso-emporium-server-side-bc2g.vercel.app/coffees/${id}`);
                if (!response.ok) new Error('Failed to fetch coffee details');
                const data = await response.json();
                setFormData(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchCoffee().then();
    }, [id]);


    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData(prev => ({...prev, [name]: value}))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            // Show confirmation modal
            const result = await Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
            });

            if (result.isConfirmed) {

                // Proceed with the update only if confirmed
                const response = await fetch(`https://espresso-emporium-server-side-bc2g.vercel.app/coffees/${id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(formData),
                });
                const result = await response.json();

                if (!response.ok) new Error('Failed to update coffee details');

                const {modifiedCount} = result;
                if (modifiedCount > 0) {
                    await Swal.fire({
                        title: 'Perfect!',
                        text: 'Coffee Details Updated Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool',
                    });
                } else {
                    await Swal.fire({
                        title: 'Oops!',
                        text: 'Coffee Details failed to update!',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }

                navigate(`/update_a_coffee/${id}`);

            } else if (result.isDenied) {
                await Swal.fire("Changes are not saved", "", "info");
            }
        } catch (error) {
            setError(error.message);
        }
    };


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

                {/* Form Container */}
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="font-rancho text-4xl md:text-5xl text-[#331A15] mb-4">
                            Update Existing Coffee Details
                        </h2>
                        <p className="text-[#1B1A1A] text-xl max-w-3xl mx-auto">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[#1B1A1A] text-2xl">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter coffee name"
                                    className="w-full px-4 py-3 rounded bg-white border border-[#E3E3E3] focus:outline-none focus:border-[#331A15] placeholder:text-xl"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[#1B1A1A] text-2xl">
                                    Chef
                                </label>
                                <input
                                    type="text"
                                    name="chef"
                                    value={formData.chef}
                                    onChange={handleChange}
                                    placeholder="Enter coffee chef"
                                    className="w-full px-4 py-3 rounded bg-white border border-[#E3E3E3] focus:outline-none focus:border-[#331A15] placeholder:text-xl"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[#1B1A1A] text-2xl">
                                    Supplier
                                </label>
                                <input
                                    type="text"
                                    name="supplier"
                                    value={formData.supplier}
                                    onChange={handleChange}
                                    placeholder="Enter coffee supplier"
                                    className="w-full px-4 py-3 rounded bg-white border border-[#E3E3E3] focus:outline-none focus:border-[#331A15] placeholder:text-xl"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[#1B1A1A] text-2xl">
                                    Taste
                                </label>
                                <input
                                    type="text"
                                    name="taste"
                                    value={formData.taste}
                                    onChange={handleChange}
                                    placeholder="Enter coffee taste"
                                    className="w-full px-4 py-3 rounded bg-white border border-[#E3E3E3] focus:outline-none focus:border-[#331A15] placeholder:text-xl"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[#1B1A1A] text-2xl">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="Enter coffee category"
                                    className="w-full px-4 py-3 rounded bg-white border border-[#E3E3E3] focus:outline-none focus:border-[#331A15] placeholder:text-xl"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[#1B1A1A] text-2xl">
                                    Details
                                </label>
                                <input
                                    type="text"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    placeholder="Enter coffee details"
                                    className="w-full px-4 py-3 rounded bg-white border border-[#E3E3E3] focus:outline-none focus:border-[#331A15] placeholder:text-xl"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[#1B1A1A] text-2xl">
                                Photo
                            </label>
                            <input
                                type="url"
                                name="photo"
                                value={formData.photo}
                                onChange={handleChange}
                                placeholder="Enter photo URL"
                                className="w-full px-4 py-3 rounded bg-white border border-[#E3E3E3] focus:outline-none focus:border-[#331A15] placeholder:text-xl"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#D2B48C] hover:bg-[#C59D5F] text-[#331A15] font-rancho text-2xl py-3 rounded transition-colors duration-300"
                        >
                            Update Coffee Details
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default UpdateACoffee;
