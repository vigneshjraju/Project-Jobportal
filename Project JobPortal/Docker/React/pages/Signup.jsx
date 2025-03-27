
import React, {useState} from 'react'
import { bodyimg } from '../images/index.jsx';
import { useNavigate  } from 'react-router-dom';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { Link } from 'react-router-dom';

function SignUpPage() {

        const [Email, setEmail]   = useState('');
        const [Password, setPassword]   = useState('');
        const [ConfirmPassword, setConfirmPassword]   = useState('');
        const [Address, setAddress]   = useState('');
        const [userRole, setUserRole]   = useState('');

            const [error, setError]         = useState('');
            const navigate                = useNavigate()
    
        const handleSignup = async (e) =>{
            e.preventDefault();
            
            try{
                const response = await fetch('/api/signup',{
                    method:'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        email: Email,
                        password: Password,
                        confirmpassword: ConfirmPassword,
                        address: Address,
                        userrole: userRole
                    }),
                });
    
                if(!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.msg || 'Signup failed');
                }

                const responseData = await response.json();
                const userId = responseData.userId;  // Get userId from response

               // Navigate based on user role
            if (userRole === 'Jobseeker') {
                navigate(`/signup/jobseeker-details/${userId}`);
            } else if (userRole === 'Employer') {
                navigate(`/signup/employer-details/${userId}`);
            }
            
            } catch(err) {
                setError(err.message || 'Signup failed: Please try again!')
            }
        };


    return (
        <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover  dark:bg-gray-900">
            
            <Nav/>

            <div className="mx-auto my-12 sm:my-20 bg-zinc-300 border-2 border-black max-w-[90%] sm:w-[500px] py-12 rounded-xl shadow-sm shadow-black text-center">

                {error && <p className='text-red-500 mb-4'>{error}</p>}

                <form onSubmit={handleSignup} className="text-center">

                    <div className="border-b-2 w-80 mx-auto">
                        <p className="text-black font-extrabold text-2xl font-serif">Sign Up</p>
                    </div>

                    <br />

                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-16 mx-auto sm:mx-[100px] justify-center items-center">
                        <div>
                            <input 
                            type="radio"
                            value="Jobseeker" // Should be a fixed value
                            checked={userRole === "Jobseeker"} // Check when selected
                            onChange={(e) => setUserRole(e.target.value)}
                            name="userrole" 
                            />
                            <label className="font-bold text-xl">Job Seeker</label>
                        </div>

                        <div>
                            <input 
                            type="radio" 
                            value="Employer" 
                            checked={userRole === "Employer"}
                            onChange={(e) => setUserRole(e.target.value)}
                            name="userrole" 
                            />
                            <label className="font-bold text-xl">Employer</label>
                        </div>
                    </div>
                    <br />

                    <div>
                        <p className="font-semibold text-lg">Email</p>
                        <input
                            type="email"
                            className="border-2 border-black w-64 p-2"
                            name='email'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your Email"
                            required
                        />
                    </div>
                    <br />

                    <div>
                        <p className="font-semibold text-lg">Password</p>
                        <input
                            type="password"
                            className="border-2 border-black w-64 p-2"
                            name='password'
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    <br />

                    <div>
                        <input
                            type="password"
                            className="border-2 border-black w-64 p-2"
                            name='confirmpassword'
                            value={ConfirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                    </div>

                    <br />

                    <div>
                        <p className="font-semibold text-lg">Address</p>
                        <textarea 
                            placeholder="Enter address" 
                            className="border-2 border-black w-64 p-2"
                            name='address'
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    

                    <br />
                    <button
                        type="submit"
                        className="bg-red-700 text-white w-56 font-bold text-xl rounded-xl border-2 border-black hover:bg-green-700"
                    >
                        Sign Up
                    </button>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 justify-center">
                        <div>
                            <p className="text-sm">
                                Already have an account?
                            </p>
                        </div>

                        <div>
                            <Link to='/login' className='text-blue-500'>Login</Link>
                        </div>
                    </div>

                </form>

            </div>

            <Footer/>

            
        </div>
    );
}

export default SignUpPage;