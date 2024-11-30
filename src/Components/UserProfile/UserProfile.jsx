import { Link } from 'react-router-dom'
import { FaUser, FaEnvelope } from 'react-icons/fa'
import {useContext} from "react";
import AuthContext from "../../Providers/AuthContext.jsx";


const UserProfile = () => {


    const {user} = useContext(AuthContext);


    return (
        <div className="min-h-[calc(100vh-96px-530px)] bg-[url('/src/assets/images/more/11.png')] flex flex-col items-center justify-center py-5">
            <div className="max-w-4xl w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="font-rancho text-4xl md:text-5xl text-[#331A15] mb-2">User Profile</h2>
                    <p className="text-gray-600 text-xl max-w-5xl">Your account information</p>
                </div>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div className="w-full md:w-1/3 flex justify-center">
                        <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-2/3 space-y-6">
                        <div className="bg-gray-100 p-6 rounded-lg shadow">
                            <div className="flex items-center space-x-4 mb-4">
                                <FaUser className="text-[#C59D5F] text-2xl" />
                                <div>
                                    <p className="text-base text-gray-500">Full Name</p>
                                    <p className="text-2xl font-semibold text-gray-800">{user?.displayName}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FaEnvelope className="text-[#C59D5F] text-2xl" />
                                <div>
                                    <p className="text-base text-gray-500">Email</p>
                                    <p className="text-2xl font-semibold text-gray-800">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-base text-gray-600">
                                Need to update profile information? Click{' '}
                                <Link
                                    to="/auth/profile_update"
                                    className="font-medium text-[#C59D5F] hover:text-[#331A15] underline"
                                >
                                    Update
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserProfile;
