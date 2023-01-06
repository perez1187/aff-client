import React from 'react'

import { Link, useNavigate } from 'react-router-dom';

// mui
import {Button }  from '@mui/material'

function Navigation() {
    // navigate
    const navigate = useNavigate();

    const navigateMyProfile = () => {           
        navigate('myprofile/');   
        // setOpen(false)       
            };

    const navigateInstructors = () => {           
        navigate('instructors/');              
            };

    const navigateAcademies = () => {           
        navigate('academies/');              
            };

    const navigateAboutUs = () => {           
        navigate('aboutus/');              
            };

  return (
    <div>
        <Button 
            variant="text" 
            onClick={() => navigateInstructors()} 
            style={{
                color: "white",
                fontSize:13
                }}>
            Instructors
        </Button>
        <Button 
            variant="text" 
            onClick={() => navigateAcademies()} 
            style={{
                color: "white",
                fontSize:13
                }}>
            academies
        </Button>
        <Button 
            variant="text" 
            onClick={() => navigateAboutUs()} 
            style={{
                color: "white",
                fontSize:13
                }}>
            About Us
        </Button>
    </div>
  )
}

export default Navigation