import React from 'react'
import { logo } from '../images/index.jsx'
import { Link } from 'react-router-dom'
import LogoutButton from './Logout.jsx'

const JNav = () => {
  return (
                <div className="flex flex-wrap justify-between items-center p-4">
                    <div className='w-full md:w-auto text-center md:text-left'>
    
                            <img src={logo} className="mx-auto md:ml-8" alt="logo" />
                        
                    </div>
    
                    <nav className="flex flex-col md:flex-row gap-4 md:gap-28 mt-4 md:mt-16 w-full md:w-auto justify-center">

                        <Link to="/jdashboard" className="text-black hover:text-green-700 text-lg font-bold">Home</Link>
                        <Link to="/findjobs" className="text-black hover:text-green-700 text-lg font-bold">Find Jobs</Link>
                        <Link to="/aboutus" className="text-black hover:text-green-700 text-lg font-bold">About Us</Link>
                        <Link to="/contactus" className="text-black hover:text-green-700 text-lg font-bold">Contact</Link>
                    </nav>

                    
    
                    <div>
                        <LogoutButton/>
                    </div>

                </div>
  )
}

export default JNav