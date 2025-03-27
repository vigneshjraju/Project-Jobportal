import React from 'react'
import { logo } from '../images/index.jsx';
import ALogout from './Alogout.jsx';


const ANav = () => {
    return (
  
      <div className="flex justify-between">
  
              <div>
                  <img src={logo} className="ml-8" alt="logo" />                      
              </div>
  
  
              
  
              <div>
                      <div>
                          <ALogout/>
                      </div>
              </div>
  
      </div>
    )
  }
  
  export default ANav