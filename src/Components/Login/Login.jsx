import {useContext, useEffect, useState} from 'react'
import {useNavigate, Link, useLocation} from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc';
import AuthContext from "../../Providers/AuthContext.jsx";
import {toast} from "react-toastify";


const Login = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })


    const {user, signInExistingUsers, signInWithGoogle} = useContext(AuthContext);
    //const currentUrl = useLocation();
    // console.log(currentUrl.state?.from.id);
    const navigate = useNavigate()


    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false)


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const togglePasswordVisibility = () => setShowPassword(!showPassword)


    const validateForm = () => {
        let newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {

            try {
                /* SIGNING IN THROUGH FIREBASE */
                await signInExistingUsers(formData.email, formData.password);
                event.target.reset();
                setErrors({});
                // navigate('/auth/user_profile');
            }catch (error) {
                toast.error('ERROR MESSAGE B:', error.message);
            }
        }
    };


    const handleGoogleLogin = async () => {
        try {
            /* SIGNING USING GOOGLE ACCOUNT THROUGH FIREBASE */
            await signInWithGoogle();
            setErrors({});
        } catch (error) {
            toast.error('ERROR MESSAGE B:', error.message);
        }
    };


    useEffect(() => {
        if (user) {
            navigate('/auth/user_profile');
        }
        else navigate('/auth/login');
    }, [user]);


    return (
        <div className="min-h-[calc(100vh-96px-530px)] bg-[url('/src/assets/images/more/11.png')] flex flex-col items-center justify-center py-5">
            <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="font-rancho text-4xl md:text-5xl text-[#331A15] mb-2">Login</h2>
                    <p className="text-gray-600 text-xl max-w-3xl">Access your account</p>
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
                                    className="appearance-none rounded-none relative block w-full pl-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full pl-10 pr-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#C59D5F] focus:border-[#C59D5F] focus:z-10 sm:text-xl"
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
                            </div>
                        </div>
                    </div>

                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}

                    <div className="space-y-4">
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-xl font-medium rounded-md text-white bg-[#C59D5F] hover:bg-[#331A15] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C59D5F]"
                        >
                            Login
                        </button>

                        <h4 className={'text-black text-center md:col-span-2'}>OR</h4>

                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="group relative w-full flex justify-center items-center py-2 px-4 border border-gray-300 text-xl font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C59D5F]"
                        >
                            <FcGoogle className="mr-3 h-6 w-6 text-red-500"/>
                            Login with Google
                        </button>
                    </div>
                </form>
                <div className="text-center space-y-2">
                    <p className="text-base text-gray-600">
                        Forgot password? Click{' '}
                        <Link to="/auth/reset_password" className="font-medium text-[#C59D5F] hover:text-[#331A15]">
                            Reset.
                        </Link>
                    </p>
                    <p className="text-base text-gray-600">
                        Not yet registered? Click{' '}
                        <Link to="/auth/registration" className="font-medium text-[#C59D5F] hover:text-[#331A15]">
                            Registration.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}


export default Login;
