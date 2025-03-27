import React from 'react'
import { Link } from 'react-router-dom';
import { logo } from '../images/index.jsx';
import LogoutButton from './Logout.jsx';

const ENav = () => {
  return (

    <div className="flex flex-wrap justify-between px-4 sm:px-0">

            <div className='w-full sm:w-auto text-center sm:text-left'>
                <img src={logo} className="ml-8 max-w-[120px] sm:max-w-none" alt="logo" />                      
            </div>


            <nav className="flex flex-wrap gap-8 sm:gap-28 justify-center w-full sm:w-auto mt-8 sm:mt-16">

            <div>
                    <Link to="/edashboard" className="text-black hover:text-green-700 text-lg font-bold">
                        Home
                    </Link>
            </div>

            <div>

                    <Link to="/eprofile" className="text-black hover:text-green-700 text-lg font-bold">
                        Employers Dashboard
                    </Link>

            </div>

            

            <div>

                    <Link to="/contactus" className="text-black hover:text-green-700 text-lg font-bold">
                        Contact
                    </Link>

            </div>

            </nav>

            <div>
                    <div>
                        <LogoutButton/>
                    </div>
            </div>

    </div>
  )
}

export default ENav