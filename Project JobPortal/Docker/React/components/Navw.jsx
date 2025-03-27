import React from 'react'
import { logo } from '../images/index.jsx';
import { Link } from 'react-router-dom'; // Import Link
import LogoutButton from './Logout.jsx';

const Navw = () => {
  return (
    <>
    <div className="flex justify-between">
                    <div>
                        <a href="home.html">
                            <img src={logo} className="ml-8" alt="logo" />
                        </a>
                    </div>
    
                    <nav className="flex gap-28 mr-4 mt-16">
                        
    
                        <div>
                            <a href="aboutus.html" className="text-black hover:text-green-700 text-lg font-bold">
                                About Us
                            </a>
                        </div>
    
                        <div>
                            <a href="contactus.html" className="text-black hover:text-green-700 text-lg font-bold">
                                Contact
                            </a>
                        </div>
                    </nav>
    
                    
                </div>
    
    </>
  )
}

export default Navw