import React, {useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import { bodyimg } from '../../images/index.jsx';
import ANav from '../../components/ANav.jsx'
import Footer from '../../components/Footer.jsx'

const Asignup = () => {

    const [Name, setName]   = useState('');
        const [Email, setEmail]   = useState('');
        const [Password, setPassword]   = useState('');
        const [userRole, setUserRole]   = useState('Admin');

            const [error, setError]         = useState('');
            const navigate                = useNavigate()
    
        const handleSubmit = async (e) =>{
            e.preventDefault();
            try{
                const response = await fetch('/api/admin/signup',{
                    method:'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        name: Name,
                        email: Email,
                        password: Password,
                        role: userRole
                    }),
                });
    
                if(!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.msg || 'Signup failed');
                }

                const responseData = await response.json();
                const userId = responseData.userId;  // Get userId from response

               // Navigate based on user role
            
                navigate(`/login/${userId}`);
            
            } catch(err) {
                setError(err.message || 'Signup failed: Please try again!')
            }
        };






  return (
    
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">

        <ANav/>

        <div className="ml-[700px] my-20 bg-zinc-300 border-2 border-black w-[500px] py-12 rounded-xl shadow-sm shadow-black">

            {error && <p className='text-red-500 mb-4'>{error}</p>}

            <form className="text-center" onSubmit={handleSubmit}>

                <div className="border-b-2 w-80 ml-[90px]">
                    <p className="text-black font-extrabold text-2xl font-serif">Sign Up</p>
                </div>

                <br />

                <div className="flex gap-16 mx-[100px] px-24">
                
                    <div>
                        <input 
                        type="radio"  
                        value="Admin"
                        checked={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        readOnly />
                        <label className="font-bold text-xl">Admin</label>
                    </div>
                    
                </div>

                <br />
                
                <p className="font-semibold text-lg">Name</p>
                <input
                    type="text"
                    className="border-2 border-black"
                    placeholder="Enter Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <p className="font-semibold text-lg">Email</p>
                <input
                    type="email"
                    className="border-2 border-black"
                    placeholder="Enter Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <p className="font-semibold text-lg">Password</p>
                <input
                    type="password"
                    className="border-2 border-black"
                    placeholder="Enter Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <br /><br />
                <button type="submit" className="bg-red-700 text-white w-56 font-bold text-xl rounded-xl border-2 border-black hover:bg-green-700">
                    Sign Up
                </button>
            </form>
        </div>




        <Footer/>

    </div>
    





  )
}

export default Asignup