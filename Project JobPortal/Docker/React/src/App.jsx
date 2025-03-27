import React from 'react'
import Signup from '../pages/Signup.jsx'
import JobSeekerDetails from '../pages/JobSeekerDetails.jsx'
import EmployerDetails from '../pages/EmployerDetails.jsx'
import Login from '../pages/login.jsx'
import Jprofile from '../pages/Jprofile.jsx'
import JobSeekerEdit from '../pages/Jedit.jsx'
// import Login from '../pages/Login.jsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Jdashboard from '../pages/Jdashboard.jsx'
import Edashboard from '../pages/Edashboard.jsx'
import Eprofile from '../pages/Eprofile.jsx'
import Employeredit from '../pages/Eedit.jsx'
import Postjob from '../pages/Postjob.jsx'
import Jobreview from '../pages/Jobreview.jsx';
import Jobedit from '../pages/Jobedit.jsx';
import Joblist from '../components/Joblist.jsx';
import Findjobs from '../pages/FIndjobs.jsx'
import Applyjob from '../pages/Applyjob.jsx'
import AppliedCandidates from '../pages/Appliedcand.jsx'
import CandidateProfile from '../pages/Candidatepro.jsx'

import Asignup from '../pages/Admin/Asignup.jsx'
import Alogin from '../pages/Admin/Alogin.jsx'
import Getemploy from '../pages/Admin/Getemploy.jsx';
import Employerdelete from '../pages/Admin/DeleteEmployer.jsx'

import Aboutus from '../pages/Aboutus.jsx'
import Contactus from '../pages/Contactus.jsx'


function App() {
  

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/signup/jobseeker-details/:userId" element={<JobSeekerDetails />} />
          <Route path="/jdashboard" element={<Jdashboard />} />
          <Route path='/findjobs' element={<Findjobs />} /> 
          <Route path='/apply' element={<Applyjob />} /> 
          <Route path='/jprofile' element={<Jprofile />} />
          <Route path='/jedit' element={<JobSeekerEdit />} />
          <Route path="/edashboard" element={<Edashboard />} />
          <Route path="/eprofile" element={<Eprofile />} />
          <Route path="/appliedcandidates" element={<AppliedCandidates />} />
          <Route path="/candidateprofile/:id/:jobId" element={<CandidateProfile />} />
          <Route path="/jobview" element={<Joblist />} />
          <Route path='/eedit' element={<Employeredit />} />
          <Route path="/jobpost" element={<Postjob />} />
          <Route path="/jobedit/:jobId" element={<Jobedit />} />
          <Route path="/jobreview/:jobId" element={<Jobreview />} />
          <Route path="/signup/employer-details/:userId" element={<EmployerDetails />} />
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}

          <Route path='/adminsignup' element={<Asignup />} />
          <Route path='/login/:userId' element={<Alogin />} />
          <Route path='/Adashboard' element={<Getemploy />} />
          <Route path="/admin/deleteemployers/:id" element={<Employerdelete />} />

          <Route path='/aboutus' element={<Aboutus />} />
          <Route path='/contactus' element={<Contactus />} />



      </Routes>
    </BrowserRouter>
  )
}

export default App
