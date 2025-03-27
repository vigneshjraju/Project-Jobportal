import React from 'react'
import { logo } from '../images/index.jsx';

const Footer = () => {
  return (
    <>
    <div className="h-[100px] bg-red-700 flex justify-between py-4 px-40 mt-12" />
    
                <div className="bg-red-200 text-center py-8">
                    <p className="text-xl font-bold">&copy;2025 JOBSPHERE</p>
                    <br />
                    <img src={logo} className="w-40 mx-auto" alt="logo" />
                    <br />
                    <p className="text-xl font-bold">Connecting Talent with Opportunity.Seemlessly</p>
                </div>


    
    </>
  )
}

export default Footer