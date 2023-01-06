import React from 'react'
import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
// using context
import {useAuth} from '../../hooks/useAuth'

// css
import './UserBoxNavbarLogin.css'

// utils
import {UserBoxFullScreen, UserBoxMobile, LoginMenu} from './UtilsNavbar.jsx'

//mui
import MailIcon from '@mui/icons-material/Mail';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { AppBar, styled, Toolbar, Typography, Box, InputBase, Badge, Avatar, Menu, MenuItem,Button }  from '@mui/material'
import Navigation from './Navigation';



function UserBoxNavbarLogin() {

    // navigate
    const navigate = useNavigate();
    
    const navigateMyProfile = () => {           
        navigate('myprofile/');   
        setOpen(false)       
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
    
    // menu r
    const [open, setOpen] = useState(false)

    // useStates for context
    const {authData, setAuth} =useAuth()

    // logout function
    const logout = () => {
        setAuth(null)
    }


  return (
    <>
        <Box sx = {{display: "flex",}}>
      
            {/* <UserBoxFullScreen>
                <Navigation/>
                <LoginMenu/>
            </UserBoxFullScreen> */}
            
            <UserBoxMobile onClick= {e=> setOpen(true)}> 

                <Button 
                    variant="contained"
                    style={{
                        borderRadius:80,
                        fontSize:15,
                        fontWeight:600,
                        fontFamily:'Work Sans',
                        color:"#FFFFFF",
                        textTransform:"none"
                    }}
                >
                    Menu
                </Button>
            </UserBoxMobile>
            
            {/* Logout Box */}
            <Box sx= {{
                alignItems:"center",
                display: "flex",
            }}> 
                <Button 
                    variant="contained" 
                    size="medium"
                    onClick={()=> logout()}
                    style={{
                        borderRadius:80,
                        fontSize:15,
                        fontWeight:600,
                        fontFamily:'Work Sans',
                        color:"#FFFFFF",
                        textTransform:"none"
                    }}
                >
                    Logout                    
                </Button>
            </Box>
       
        </Box>

                                {/* Autocomplete for searching menu */}
        <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            open={open} //open is depending on state open
            onClose= {(e)=>setOpen(false)} // when you clck somewhere, when close
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
                }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
        >
            <MenuItem onClick={()=> navigateMyProfile()} >My Profile</MenuItem>
            <MenuItem onClick={()=> navigateInstructors()} >Instructors</MenuItem>
            <MenuItem onClick={()=> navigateAcademies()} >Academies</MenuItem>
            <MenuItem onClick={()=> navigateAboutUs()} >About Us</MenuItem>

            {/* <MenuItem onClick={()=> logout()} >Logout</MenuItem> */}
        </Menu>
    </>
  )
}

export default UserBoxNavbarLogin