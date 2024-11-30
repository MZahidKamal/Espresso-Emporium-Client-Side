import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import Swal from 'sweetalert2'


const AddNewCoffee = () => {


    const [formData, setFormData] = useState({
        name: '',
        chef: '',
        supplier: '',
        taste: '',
        category: '',
        details: '',
        photo: ''
    })


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(formData)

        fetch('https://espresso-emporium-server-side-bc2g.vercel.app/coffees', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) new Error('No response received from server!');
                return response.json();
            })
            .then(data => {
                //console.log('Coffee Posted', data)

                const {acknowledged} = data;
                if (acknowledged) {
                    Swal.fire({
                        title: 'Perfect!',
                        text: 'Coffee Added Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    }).then()

                    // Reset form after submission
                    setFormData({
                        name: '',
                        chef: '',
                        supplier: '',
                        taste: '',
                        category: '',
                        details: '',
                        photo: ''
                    })
                }
            })
            .catch(error => {
                console.log('Error', error)
            })
    }


    /* SCROLL TO THE TOP OF THE PAGE WHEN THE COMPONENT LOADS. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


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
                            Add New Coffee
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
                            Add Coffee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default AddNewCoffee;
