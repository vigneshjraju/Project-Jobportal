import React from 'react';
import { call,email,location } from '../images/index.jsx';
import { bodyimg ,logo} from '../images/index.jsx'

import Footer from '../components/Footer.jsx';

const Contactus = () => {
  return (
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">
    
    
              <div>
                  
                <img src={logo} className="ml-8" alt="logo" />
                                      
              </div>

        <div className="bg-white pl-[200px] py-20 grid grid-cols-3 my-32">

            <div className="flex gap-8">
        
                    <div>
                        <img src={call} alt="Call" className="w-8" />
                    </div>
                    
                    <div>
                        <p className="text-3xl font-bold">Call Us</p>
                        <p className="text-sm">+919054848546</p>
                    </div>
                    
            </div>
                
                <div className="flex gap-8">
                
                    <div>
                        <img src={email} alt="Email" className="w-8" />
                    </div>
                    
                    <div>
                        <p className="text-3xl font-bold">Email</p>
                        <p className="text-sm">Jobsphere@gmail.com</p>
                    </div>
                    
                </div>
                
                <div className="flex gap-4">
                
                    <div>
                        <img src={location} alt="Location" className="w-8" />
                    </div>
                    
                    <div>
                        <p className="text-3xl font-bold">Location</p>
                        <p className="text-sm w-[300px]">
                            C-16, Thejaswini, Technopark Rd, Technopark Campus, Thiruvananthapuram, Kerala 695581
                        </p>
                    </div>
                    
                </div>
            
        </div>

        <Footer/>


    </div>
  )
}

export default Contactus