import {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import AuthContext from "../../Providers/AuthContext.jsx";


const Navbar = () => {


    const {user, signOutCurrentUser} = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const menuItems = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about_us" },
        { label: "Our Products", path: "/products" },
        { label: "Contact Us", path: "/contact" },
        { label: "Registration", path: "/auth/registration" },
        { label: "Login", path: "/auth/login" },
        { label: "Profile", path: "/auth/user_profile" },
        { label: "Profile Update", path: "/auth/profile_update" },
    ]


    return (
        <nav className="bg-[#331A15] w-full">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/src/assets/images/more/logo1.png"
                            alt="Espresso Emporium"
                            className="w-12 h-12 md:w-14 md:h-14 object-contain"
                        />
                        <h1 className="text-white font-rancho text-2xl md:text-3xl lg:text-4xl">
                            Espresso Emporium
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className="text-white font-rancho text-xl hover:text-[#C59D5F] transition-colors duration-300"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link onClick={signOutCurrentUser} to={'/auth/login'} className="text-white font-rancho text-xl hover:text-[#C59D5F] transition-colors duration-300">Logout</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <RiCloseLine className="w-8 h-8" />
                        ) : (
                            <RiMenu3Line className="w-8 h-8" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden pb-6">
                        <div className="flex flex-col gap-4">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-white font-rancho text-xl hover:text-[#C59D5F] transition-colors duration-300"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}


export default Navbar;
