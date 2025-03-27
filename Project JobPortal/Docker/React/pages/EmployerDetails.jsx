import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navw from "../components/Navw.jsx";
import { bodyimg } from "../images/index.jsx";

const EmployerDetails = () => {

  const { userId } = useParams();
  const navigate=useNavigate();


      const[companyName,setCompanyName]=useState("");
      const [aboutCompany, setAboutCompany] = useState("");
      const [totalJobs, setTotalJobs] = useState("");
      const [since, setSince] = useState("");
      const [location, setlocation] = useState("");
      const [photoFile, setPhotoFile] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("companyname", companyName);
    formData.append("aboutcompany", aboutCompany);
    formData.append("totaljobs", totalJobs);
    formData.append("since", since);
    formData.append("location", location);

    if (photoFile) {
      formData.append("photo",photoFile);
    }

    try {
          const response = await fetch(`/api/signup/details/${userId}`, {
              method: "PATCH",
              body: formData,
          });

          if (response.ok) {
              navigate("/login");
          }
    } catch (error) {
          console.error("Submission error:", error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">
            
        <Navw/>      

            <div className="ml-[550px] my-20 bg-zinc-300 border-2 border-black w-[800px]  py-12 rounded-xl shadow-sm shadow-black">
                    
                    <form onSubmit={handleSubmit}>
                        <div className="border-b-2 w-[700px] ml-[50px]">
                            <p className="text-black font-extrabold text-2xl font-serif text-center">
                                Employer Form
                            </p>
                        </div>
                        <br />
                        <div className="pl-20 flex flex-col w-[600px]">
                            <div className="flex justify-between">
                                <label className="font-semibold text-lg w-40">Photo</label>
                                <input 
                                type="file" 
                                className="bg-red-700 flex-1 border-2 border-black text-white" 
                                accept="image/*" 
                                onChange={(e) => setPhotoFile(e.target.files[0])} />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <label className="font-semibold text-lg w-40">Company Name</label>
                                <input 
                                type="text" 
                                value={companyName} 
                                onChange={(e) => setCompanyName(e.target.value)} 
                                className="flex-1 border-2 border-black" 
                                placeholder="Enter full name" required />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <label className="w-40 font-semibold text-lg">About Company</label>
                                <textarea 
                                value={aboutCompany} 
                                onChange={(e) => setAboutCompany(e.target.value)} 
                                className="flex-1 border-2 border-black" 
                                placeholder="About Company Activities">
                                </textarea>
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <label className="w-40 font-semibold text-lg">Total Jobs</label>
                                <input 
                                type="text" 
                                value={totalJobs} 
                                onChange={(e) => setTotalJobs(e.target.value)}  
                                className="flex-1 border-2 border-black" 
                                required />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <label className="w-40 font-semibold text-lg">Since</label>
                                <input 
                                type="text"  
                                value={since} 
                                onChange={(e) => setSince(e.target.value)} 
                                className="flex-1 border-2 border-black" 
                                required />
                            </div>

                            <br />

                            <div className="flex justify-between">
                                <label className="font-semibold text-lg w-40">Location</label>
                                <textarea 
                                name="location" 
                                value={location} 
                                onChange={(e) => setlocation(e.target.value)} 
                                className="flex-1 border-2 border-black" 
                                placeholder="Enter Address" 
                                required> 
                                </textarea>
                            </div>

                            <br />

                            <br />

                            <button type="submit" className="bg-red-700 text-white w-56 mx-[200px] font-bold text-xl border-2 border-black rounded-xl hover:bg-green-700">
                                Submit
                            </button>

                        </div>
                    </form>
            </div>

            <Footer/>

            
        </div>
  );
};

export default EmployerDetails;
