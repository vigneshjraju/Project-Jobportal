import React, {useEffect,useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import { bodyimg } from '../../images/index.jsx';
import ANav from '../../components/ANav.jsx'
import Footer from '../../components/Footer.jsx'

const Getemploy = () => {

    const [employers, setEmployers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployers = async () => {
            try {
                const response = await fetch("/api/admin/getemployers", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Admin auth
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setEmployers(data.employers);
                }

                else {
                    setError("Error fetching employers. Please try again.");
                    console.error("Failed to fetch employers:", data.message);
                }

            } catch (error) {
                console.error("Error fetching employers:", error);
            }
        };

        fetchEmployers();
    }, []);


  return (
    
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-center bg-cover dark:bg-gray-900">

        <ANav/>

        <div className="mx-28 my-20">
            <p className="text-2xl font-bold text-center">Employers</p>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <div className="grid grid-cols-3 gap-y-4 bg-white py-12 px-[50px] rounded-3xl">
                {employers.map((employer) => (
                    <div key={employer._id} className="bg-zinc-300 w-[400px] px-4 py-4 border-2 border-black">
                        <div className="flex gap-20">
                            <div>
                                <img src={`data:image/jpeg;base64,${employer.Photo}`} alt="logo" className="w-12" />
                            </div>
                            <div>
                                <p className="font-bold">{employer.CompanyName}</p>
                                <p className="text-sm">{employer.Email}</p>
                            </div>
                        </div>
                        <Link to={`/admin/deleteemployers/${employer._id}`}>
                            <button className="bg-red-700 text-white w-32 border-2 border-black mx-28 hover:bg-green-700">
                                Manage
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        

        <br />


        <Footer/>

    </div>
    





  )
}

export default Getemploy