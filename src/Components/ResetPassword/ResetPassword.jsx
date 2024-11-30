import {useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaEnvelope } from 'react-icons/fa'
import AuthContext from "../../Providers/AuthContext.jsx";
import {toast} from "react-toastify";


const ResetPassword = () => {


    const [formData, setFormData] = useState({
        email: '',
    });


    const {resetPassword} = useContext(AuthContext);
    const navigate = useNavigate()
    // const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({});


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            //console.log('Form submitted:', formData);

            try {
                /* SENDING PASSWORD RESET EMAIL THROUGH FIREBASE */
                await resetPassword(formData.email);
                event.target.reset();
                setErrors({});
                setTimeout(() => {
                    navigate('/auth/login');
                }, 200)
            } catch (error) {
                // Handle errors
                toast.error('ERROR MESSAGE B:', error.message);
            }
        }
    };


    return (
        <div className="min-h-[calc(100vh-96px-530px)] bg-[url('/src/assets/images/more/11.png')] bg-cover bg-center flex flex-col items-center justify-center py-5">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="font-rancho text-4xl md:text-5xl text-[#331A15] mb-2">Reset Password</h2>
                    <p className="text-gray-600 text-xl max-w-3xl">Enter your email to reset your password</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                    placeholder="Email address"
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-[#C59D5F] hover:bg-[#331A15] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C59D5F]"
                        >
                            Send password reset email
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-base text-gray-600">
                        Not yet registered? Click{' '}
                        <Link to="/auth/registration" className="font-medium text-[#C59D5F] hover:text-[#331A15]">
                            Registration
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default ResetPassword;
