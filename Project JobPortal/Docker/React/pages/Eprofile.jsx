import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { bodyimg } from '../images/index.jsx';
import Footer from '../components/Footer.jsx';
import ENav from '../components/ENav.jsx';
import Joblist from '../components/Joblist.jsx';


const Eprofile = () => {

  const [profilePic, setProfilePic] = useState("images/Photo.jpeg"); // Default image

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
          const fetchProfile = async () => {
  
              try {


              //   const response = await fetch('/api/employer/profile', {
              //     method: "GET",
              //     credentials: "include", // Ensures cookies are sent
              //     headers: {
              //         "Content-Type": "application/json",
              //     },

              // });


                  const token = localStorage.getItem('employerToken'); // Get stored JWT token //authtoken
  
                  const response = await fetch('/api/employer/profile', {
                      method: "GET",
                      headers: {
                          Authorization: `Bearer ${token}`, // Send authtoken
                          "Content-Type": "application/json",
                      },
                  });
                  
                  const data = await response.json();
                  console.log(data);
  
                  if (data.photo) {
                      setProfilePic(`data:image/jpeg;base64,${data.photo}`); // Set the fetched profile picture
                  }
                  
                  setProfile(data);
                  setLoading(false);
  
  
              } catch (err) {
                  setError('Failed to fetch profile');
                  setLoading(false);
              }
          };
  
          fetchProfile();
      }, []);
  
      if (loading) return <div>Loading...</div>;
      if (error) return <div>{error}</div>;
  



    
  return (

    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-center bg-cover dark:bg-gray-900">

        <ENav/>

            <p className="text-2xl font-bold text-center">Employer Profile</p>
      
            <br />
      
            <div className="bg-white py-12 mx-28 rounded-3xl">
      
                  <div className="flex gap-[100px] w-[1400px] bg-zinc-300 rounded-3xl py-4 mx-24">
        
                      <div>
                        <img 
                        src={profilePic} 
                        alt="photo" 
                        className="w-36 rounded-full ml-[80px]" 
                        />
                      </div>
          
                      <div className="h-28 mt-[40px] ml-44">
                      
                        <p className="text-3xl font-bold text-red-700">{profile.Companyname}</p>
                        <p>{profile.location}</p>
                        
                      </div>
          
		                  <div className="mt-12 flex gap-8">
		  
                            <Link to="/jobpost">
                            
                              <button className="bg-red-700 text-white font-bold text-xl w-44 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-green-700">
                                  Add Jobs
                              </button>
                              
                            </Link>
                            
                            <Link to="/eedit">
                            
                              <button className="bg-red-700 text-white font-bold text-xl w-44 rounded-xl border-2 border-black shadow-sm shadow-black hover:bg-green-700">
                                   Update
                              </button>
                              
                            </Link>
		    
		                  </div>
          
                  </div>
        
                  <br />
        
                  <div className="w-[800px] mx-[220px]">
        
                        <div>
                        
                            <p className="text-3xl font-bold">About Employers</p>
                            <p>
                            {profile.Aboutcompany}
                            </p>
                          
                        </div>
          
		                    <br /><br />
		  
                        <div>
                          <p className="text-3xl font-bold">Open Positions</p>

                          <Joblist/>



                        </div>
          
                  </div>
        
            </div>

            <div className="bg-zinc-300 w-[500px] px-8 py-8 rounded-3xl border-2 border-black absolute left-[1150px] top-[550px]">
                                <p className="text-3xl font-bold">Information</p> 
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Since</label>
                                    <p className="flex-1">{profile.since}</p>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Total Jobs</label>
                                    <p className="flex-1">{profile.Totaljobs}</p>
                                </div>
                                <div className="flex justify-between">
                                    <label className="font-bold text-lg w-52">Location</label>
                                    <p className="flex-1">{profile.location}</p>
                                </div>

                                {/* Add other info fields */}
              </div>
        



        <Footer/>



    </div>
    
    

    

    
  )
}

export default Eprofile