import {useContext, useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa'
import {toast} from "react-toastify";
import AuthContext from "../../Providers/AuthContext.jsx";


const Registration = () => {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        photoUrl: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    })


    const {signUpNewUser} = useContext(AuthContext);
    const navigate = useNavigate()


    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }


    const togglePasswordVisibility = () => setShowPassword(!showPassword)
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)


    const validateForm = () => {
        let newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Last name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        else if (!passwordPattern.test(formData.password)) {
            newErrors.password = `Password must contain at least one uppercase letter, one lowercase letter, one number and one special character like @ $ ! % * ? & #.`;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            //console.log('Form submitted:', formData);
            // console.log(event.target)

            try {
                /* SIGNING UP THROUGH FIREBASE */
                await signUpNewUser(`${formData.firstName} ${formData.lastName}`, formData.photoUrl, formData.email, formData.password);
                event.target.reset();
                setErrors({});
                navigate('/auth/login');
            } catch (error) {
                // Handle errors
                toast.error('ERROR MESSAGE C:', error.message);
            }
        }
    };


    return (
        <div className="min-h-[calc(100vh-96px-530px)] bg-[url('/src/assets/images/more/11.png')] flex flex-col items-center justify-center py-5">
            <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="font-rancho text-4xl md:text-5xl text-[#331A15] mb-2">Register</h2>
                    <p className="text-gray-600 text-xl max-w-3xl">Create your account</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="firstName" className="sr-only">First Name</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label htmlFor="lastName" className="sr-only">Last Name</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                        <div>
                            <label htmlFor="photoUrl" className="sr-only">Photo URL</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaImage className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="photoUrl"
                                    name="photoUrl"
                                    type="url"
                                    required
                                    className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                    placeholder="Photo URL"
                                    value={formData.photoUrl}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
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
                                    className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <FaEye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <input
                                id="confirm-password"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <FaEye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                            {errors.confirmPassword &&
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="accept-terms"
                            name="acceptTerms"
                            type="checkbox"
                            className="h-4 w-4 text-[#C59D5F] focus:ring-[#C59D5F] border-gray-300 rounded"
                            checked={formData.acceptTerms}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="accept-terms" className="ml-2 block text-base text-gray-900">
                            I accept the <a href="#" className="font-medium text-[#C59D5F] hover:text-[#331A15]">Terms and Conditions</a>
                        </label>
                        {errors.acceptTerms && <p className="text-red-500 text-xs mt-1">{errors.acceptTerms}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-[#C59D5F] hover:bg-[#331A15] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C59D5F]"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-base text-gray-600">
                        Already have an account? Click{' '}
                        <Link to="/auth/login" className="font-medium text-[#C59D5F] hover:text-[#331A15]">
                            Log in.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Registration;
