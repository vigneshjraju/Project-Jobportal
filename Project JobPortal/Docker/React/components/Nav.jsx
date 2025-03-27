import React from 'react'
import { logo } from '../images/index.jsx';
import { Link } from 'react-router-dom'; // Import Link

const Nav = () => {
  return (
    <>
    <div className="flex flex-wrap  items-center p-4 justify-between">
                    <div>
                        
                            <img src={logo} className="ml-8 max-w-[150px] sm:max-w-[120px]" alt="logo" />
                        
                    </div>
    
                    <nav className="flex flex-wrap gap-10 sm:gap-6 mr-4 mt-4 sm:mt-6">
                        
    
                        <div>
                            <Link to="/aboutus" className="text-black hover:text-green-700 text-lg font-bold">About Us</Link>
                        </div>
                        
                        <div>
                            <Link to="/contactus" className="text-black hover:text-green-700 text-lg font-bold">
                                Contact
                            </Link>
                        </div>
                    </nav>
    
                    <div className="mt-4 sm:mt-6">
                        <Link to="/login">
                            <button className="bg-red-700 text-white w-28 h-12 font-bold text-xl mr-6 sm:mr-12 hover:bg-green-700">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
    
    </>
  )
}

export default Nav