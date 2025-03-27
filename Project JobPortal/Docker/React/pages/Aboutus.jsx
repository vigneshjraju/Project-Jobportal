import React from 'react';
import { bodyimg,aboutus,logo } from '../images/index.jsx';
import Footer from '../components/Footer.jsx';

const Aboutus = () => {
  return (
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">


          <div>
              
            <img src={logo} className="ml-8" alt="logo" />
                                  
          </div>

          <div className="bg-white py-12 mx-28 mt-4 rounded-3xl">

                <div className="flex gap-8">
                
              <div>
                <img src={aboutus} alt="About Us" className="ml-40" />
              </div>
              
              <div className="w-[500px] mt-40 ml-12">
              
                  <p className="text-3xl font-bold">Welcome to JobSphere!</p>
                  
                  <p>
                    At JobSphere, we are redefining the way job seekers and employers connect.
                    Our platform is designed to provide a seamless, efficient, and user-friendly
                    experience for those on both sides of the hiring process. Whether you are a
                    professional looking for your dream job or a company searching for top talent,
                    JobSphere is your trusted partner in achieving success.
                  </p>
                
              </div>
                  
                </div>
                
                <br />
                
                <div className="w-[800px] mx-[220px]">
                
              <div>
                  <p className="text-3xl font-bold">Our Vision</p>
                  
                  <p>
                    To create a world where every individual can find a fulfilling career and
                    every organization can build a strong, talented team effortlessly.
                  </p>
                
              </div>
              
              <br /><br />
              
              <div>
              
                <p className="text-3xl font-bold">Our Mission</p>
                
                <p>
                  To empower job seekers with opportunities and provide employers with the tools
                  and talent they need to grow. JobSphere aims to make job searching and recruitment
                  processes hassle-free, transparent, and effective.
                </p>
                
              </div>
                  
                </div>
                
          </div>

          <Footer/>

    </div>
  )
}

export default Aboutus