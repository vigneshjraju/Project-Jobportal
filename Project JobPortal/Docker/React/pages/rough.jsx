import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import { bodyimg } from "../images/index.jsx";

const JobSeekerDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    about: "",
    age: "",
    gender: "",
    phoneNumber: "",
    education: [{ qualification: "", college: "", university: "", grade: "" }],
    experience: [{ jobTitle: "", companyName: "", details: "", years: "" }],
    skills: "",
    photo: null,
    resume: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('education')) {
      const [index, key] = name.split('.');
      setFormData({
        ...formData,
        education: formData.education.map((item, idx) => 
          idx === parseInt(index) ? { ...item, [key]: value } : item
        )
      });
    } else if (name.startsWith('experience')) {
      const [index, key] = name.split('.');
      setFormData({
        ...formData,
        experience: formData.experience.map((item, idx) => 
          idx === parseInt(index) ? { ...item, [key]: value } : item
        )
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          Object.keys(item).forEach((subKey) => {
            formDataToSend.append(`${key}[${index}].${subKey}`, item[subKey]);
          });
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      await axios.patch(`/api/signup/details/${userId}`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Details updated successfully");
      navigate("/homepage");
    } catch (error) {
      console.error("Error updating details:", error);
      alert("Error updating details");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${bodyimg})` }} className="bg-cover">
      <Nav />
      <div className="ml-[550px] my-20 bg-zinc-300 border-2 border-black w-[800px] py-12 rounded-xl shadow-sm shadow-black">
        <form onSubmit={handleSubmit}>
          <div className="border-b-2 w-[700px] ml-[50px]">
            <p className="text-black font-extrabold text-2xl font-serif text-center">Form</p>
          </div>
          <br />
          <div className="pl-20 flex flex-col w-[600px]">
            <div className="flex justify-between">
              <p className="font-bold text-xl w-40">About Candidate</p>
              <textarea
                name="about"
                placeholder="About Yourself"
                className="flex-1 border-2 border-black"
                required
                onChange={handleChange}
              ></textarea>
            </div>
            <br />
            <div className="flex justify-between">
              <label className="w-40 font-semibold text-lg">Age</label>
              <input type="number" name="age" className="flex-1 border-2 border-black" placeholder="Enter Age" required onChange={handleChange} />
            </div>
            <br />
            <div className="flex justify-between">
              <label className="w-40 font-semibold text-lg">Gender</label>
              <input type="text" name="gender" className="flex-1 border-2 border-black" placeholder="Enter Gender" required onChange={handleChange} />
            </div>
            <br />
            <div className="flex justify-between">
              <label className="w-40 font-semibold text-lg">Phone Number</label>
              <input type="number" name="phoneNumber" className="flex-1 border-2 border-black" placeholder="Enter Phone Number" required onChange={handleChange} />
            </div>
            <br />

            <p>Education</p>

            {formData.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">Qualification {index + 1}</label>
                  <input type="text" name={`education.${index}.qualification`} className="flex-1 border-2 border-black" placeholder="Enter Qualification" required onChange={handleChange} />
                </div>
                <br />
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">College {index + 1}</label>
                  <input type="text" name={`education.${index}.college`} className="flex-1 border-2 border-black" placeholder="Enter College" required onChange={handleChange} />
                </div>
                <br />
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">University {index + 1}</label>
                  <input type="text" name={`education.${index}.university`} className="flex-1 border-2 border-black" placeholder="Enter University" required onChange={handleChange} />
                </div>
                <br />
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">Grade {index + 1}</label>
                  <input type="text" name={`education.${index}.grade`} className="flex-1 border-2 border-black" placeholder="Enter Grade" required onChange={handleChange} />
                </div>
                <br />
              </div>
            ))}

            <p>E</p>

            <br />
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">Job Title {index + 1}</label>
                  <input type="text" name={`experience.${index}.jobTitle`} className="flex-1 border-2 border-black" placeholder="Enter Job Title" required onChange={handleChange} />
                </div>
                <br />
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">Company Name {index + 1}</label>
                  <input type="text" name={`experience.${index}.companyName`} className="flex-1 border-2 border-black" placeholder="Enter Company Name" required onChange={handleChange} />
                </div>
                <br />
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">Details {index + 1}</label>
                  <input type="text" name={`experience.${index}.details`} className="flex-1 border-2 border-black" placeholder="Enter Details" required onChange={handleChange} />
                </div>
                <br />
                <div className="flex justify-between">
                  <label className="w-40 font-semibold text-lg">Years {index + 1}</label>
                  <input type="number" name={`experience.${index}.years`} className="flex-1 border-2 border-black" placeholder="Enter Years" required onChange={handleChange} />
                </div>
                <br />
              </div>
            ))}
            <div className="flex justify-between">
              <label className="w-40 font-semibold text-lg">Skills</label>
              <input type="text" name="skills" className="flex-1 border-2 border-black" placeholder="Enter Skills" required onChange={handleChange} />
            </div>
            <br />
            <div className="flex justify-between">
              <label className="w-40 font-semibold text-lg">Photo Upload:</label>
              <input type="file" name="photo" accept="image/*" className="bg-red-700 flex-1 border-2 border-black text-white" onChange={handleFileChange} />
            </div>
            <br />
            <div className="flex justify-between">
              <label className="w-40 font-semibold text-lg">Resume Upload:</label>
              <input type="file" name="resume" accept=".pdf,.doc" className="bg-red-700 flex-1 border-2 border-black text-white" onChange={handleFileChange} />
            </div>
            <br />
            <button type="submit" className="bg-red-700 text-white w-56 mx-[200px] font-bold text-xl border-2 border-black rounded-xl hover:bg-green-700">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default JobSeekerDetails;