import {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaImage } from 'react-icons/fa'
import AuthContext from "../../Providers/AuthContext.jsx";
import {toast} from "react-toastify";


const ProfileUpdate = () => {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        photoUrl: '',
    })


    const {updateExistingUsers} = useContext(AuthContext);
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }
        if (!formData.photoUrl.trim()) {
            newErrors.photoUrl = 'Photo URL is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            //console.log('Form submitted:', formData);

            try {
                /* SIGNING UP THROUGH FIREBASE */
                await updateExistingUsers(`${formData.firstName} ${formData.lastName}`, formData.photoUrl);
                event.target.reset();
                setErrors({});
                /*setTimeout(()=>{
                    navigateTo('/auth/user_profile');
                }, 1000)*/
            } catch (error) {
                // Handle errors
                toast.error('ERROR MESSAGE B:', error.message);
            } finally {
                navigate('/auth/user_profile');
            }
        }
    };


    return (
        <div className="min-h-[calc(100vh-96px-530px)] bg-[url('/src/assets/images/more/11.png')] bg-cover bg-center flex items-center justify-center py-12">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
                <h2 className="font-rancho text-4xl md:text-5xl text-[#331A15] text-center mb-8">Update Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#C59D5F] focus:border-[#C59D5F] text-xl"
                                required
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#C59D5F] focus:border-[#C59D5F] text-xl"
                                required
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                        <div>
                            <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                            <div className="relative">
                                <input
                                    type="url"
                                    id="photoUrl"
                                    name="photoUrl"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-[#C59D5F] focus:border-[#C59D5F] text-xl"
                                    required
                                />
                                <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                {errors.photoUrl && <p className="text-red-500 text-xs mt-1">{errors.photoUrl}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-[#C59D5F] text-white font-rancho text-2xl rounded-md hover:bg-[#331A15] transition-colors duration-300"
                        >
                            Update Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default ProfileUpdate;
