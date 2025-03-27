import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bodyimg } from "../images/index.jsx";
import Navz from "../components/Nav1.jsx";
import Footer from "../components/Footer.jsx";

const Login = () => {

        const [Email, setEmail] = useState('')
        const [Password, setPassword] = useState('')
        const [error, setError] = useState('')
       
        const navigate = useNavigate();
        
        const handleLogin = async (e) =>{
            e.preventDefault();
            try{
                const response = await fetch('/api/login',{
                    method:'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({email:Email,password:Password}),
                });
    
                if(!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.msg || 'Login failed');
                }
                
                const data = await response.json(); // Get user role from response
                localStorage.setItem("authtoken", data.token); // Store token if needed
                localStorage.setItem("userRole", data.role); // Store role for further use

                // Redirect based on user role
                if (data.role === 'Jobseeker') {
                    navigate('/jdashboard');
                } else if (data.role === 'Employer') {
                    navigate('/edashboard');//change to edashboard
                } else {
                    navigate('/'); // Default fallback
                }

    
                // navigate('/jdashboard');
                
            } catch(err) {
                setError(err.message || 'Invalid credentials: Please try again!')
            }
        };
    

  return (

    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover  dark:bg-gray-900">
            
        <Navz/>
    
            <div className="mx-auto my-12 sm:my-20 bg-zinc-300 border-2 border-black max-w-[90%] sm:w-[500px] py-12 rounded-xl shadow-sm shadow-black text-center">

                    <form onSubmit={handleLogin} className="text-center ">
                    
                        <div className="border-b-2 w-80 mx-auto">
                            <p className="text-black font-extrabold text-2xl font-serif">Login</p>
                        </div>

                        
                        {error && <p className="text-red-600 font-semibold">{error}</p>}

                        <br />

                        
                        <div>
                            <p className="font-semibold text-lg">Email</p>
                            <input
                            type="email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 border-black w-64 p-2"
                            placeholder="***@gmail.com"
                            required
                            />
                        </div>

                        <br />

                        
                        <div>
                            <p className="font-semibold text-lg">Password</p>
                            <input
                            type="password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 border-black w-64 p-2"
                            placeholder="*****"
                            required
                            />
                        </div>

                        <br />

                        
                        <button
                            type="submit"
                            className="bg-red-700 text-white w-56 py-2 font-bold text-xl rounded-xl border-2 border-black hover:bg-green-700 transition"
                        >
                            Login
                        </button>
                </form>
        </div>

        <Footer/>

            
    </div>


  )
}

export default Login
