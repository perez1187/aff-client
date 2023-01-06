import React from 'react'
import { useNavigate } from "react-router-dom";

//mui
import { Typography } from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';

// logo
// import logo from "../../assets/smclogo.svg"
import logo from "../../assets/ferran.png"
import './LogoNavbar.css'

function LogoNavbar() {
    
    
    // 👇️ navigate to /
    const navigate = useNavigate();

    const navigateLandingPage = () => {           
        navigate('/');          
                };
    function Logo () {
        return <img src={logo} alt="Logo" />
    }
  return (
              
    <div onClick={() => navigateLandingPage()} className = "Logo"> 
        {/* <Typography 
            variant='h6'                   
            sx={{

            display:{
                xs:"none",
                sm:"block"
            }
        }}>
            Sharp Mind Club <img src={logo} alt="Logo" />
            
        </Typography>  */}
        <div>
            <img src={logo} alt="React Logo" />
        </div>
        
        <PetsIcon             
            sx={{
            // display on difrent resolutions
            //here on mobile
                display:{
                    
                    xs:"none", // block will show
                    sm:"none"
            }}}/>
    </div>
  )
}

export default LogoNavbar