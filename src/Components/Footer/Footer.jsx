import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'


const Footer = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(formData)
        setFormData({ name: '', email: '', message: '' })
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <footer id={'footer'} className="pt-12 md:pt-16 bg-[url('/src/assets/images/more/13.jpg')] bg-cover bg-no-repeat">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Left Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="/src/assets/images/more/logo1.png"
                                alt="Espresso Emporium"
                                className="w-12 h-12 object-contain"
                            />
                            <h2 className="text-[#331A15] font-rancho text-3xl">
                                Espresso Emporium
                            </h2>
                        </Link>

                        <p className="text-[#1B1A1A] max-w-md">
                            Always ready to be your friend. Come & Contact with us to share your
                            memorable moments, to share with your best companion.
                        </p>

                        <div className="flex gap-4">
                            <a href="https://facebook.com" className="text-[#331A15] hover:text-[#C59D5F] transition-colors">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="https://twitter.com" className="text-[#331A15] hover:text-[#C59D5F] transition-colors">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" className="text-[#331A15] hover:text-[#C59D5F] transition-colors">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" className="text-[#331A15] hover:text-[#C59D5F] transition-colors">
                                <FaLinkedinIn size={24} />
                            </a>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[#331A15] font-rancho text-3xl">Get in Touch</h3>
                            <div className="space-y-3">
                                <p className="flex items-center gap-2 text-[#1B1A1A]">
                                    <FaPhone className="text-[#331A15]" />
                                    <span>+88 01533 333 333</span>
                                </p>
                                <p className="flex items-center gap-2 text-[#1B1A1A]">
                                    <FaEnvelope className="text-[#331A15]" />
                                    <span>info@gmail.com</span>
                                </p>
                                <p className="flex items-center gap-2 text-[#1B1A1A]">
                                    <FaMapMarkerAlt className="text-[#331A15]" />
                                    <span>72, Wall street, King Road, Dhaka</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="space-y-6">
                        <h2 className="text-[#331A15] font-rancho text-3xl">Connect with Us</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                className="w-full px-4 py-2 border border-[#331A15] rounded focus:outline-none focus:ring-2 focus:ring-[#C59D5F]"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-2 border border-[#331A15] rounded focus:outline-none focus:ring-2 focus:ring-[#C59D5F]"
                                required
                            />
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Message"
                                rows="4"
                                className="w-full px-4 py-2 border border-[#331A15] rounded focus:outline-none focus:ring-2 focus:ring-[#C59D5F]"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="px-6 py-2 border-2 border-[#331A15] rounded-full font-rancho text-xl text-[#331A15] hover:bg-[#331A15] hover:text-white transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-[#331A15] mt-12 py-4">
                <p className="text-center text-white font-rancho">
                    Copyright Espresso Emporium | All Rights Reserved
                </p>
            </div>
        </footer>
    )
}


export default Footer;
