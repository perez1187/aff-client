import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

// mui
import {Button, Menu, MenuItem }  from '@mui/material'

// local
import Navigation from './Navigation';

// utils
import {UserBoxFullScreen, UserBoxMobile, LoginMenu} from './UtilsNavbar.jsx'

function UserBoxNavbarLogout() {

    // 👇️ navigate to /
    const navigate = useNavigate();

    const navigateLogin = () => {           
        navigate('login/');
        setOpen(false)          
            }; 
    const navigateRegister = () => {           
        navigate('register/');
        setOpen(false)          
                };

    const navigateInstructors = () => {           
        navigate('instructors/'); 
        setOpen(false)             
            };

    const navigateAcademies = () => {           
        navigate('academies/'); 
        setOpen(false)             
            };

    const navigateAboutUs = () => {           
        navigate('aboutus/'); 
        setOpen(false)             
            };        

    // menu mobile
    const [open, setOpen] = useState(false)
  return (
    <>
        <UserBoxFullScreen>
            <div style={{
                display:"flex"
            }}>
                <div style={{
                    padding:"5px", 
                    display:"flex", 
                    
                }}>
                    {/* <Navigation></Navigation> */}
                    <Button 
                        variant="contained" 
                        size="medium"
                        onClick={()=>navigateLogin()}
                        style={{
                            borderRadius:80,
                            fontSize:15,
                            fontWeight:600,
                            fontFamily:'Work Sans',
                            color:"#FFFFFF",
                            textTransform:"none"
                        }}
                    >                
                            Login            
                    </Button> 
                </div>
                <div style={{
                    padding:"5px"
                }}>
                    {/* <Button 
                        variant="contained" 
                        size="medium"
                        onClick={()=>navigateRegister()}
                        style={{
                            borderRadius:80,
                            fontSize:15,
                            fontWeight:600,
                            fontFamily:'Work Sans',
                            color:"#FFFFFF",
                            textTransform:"none"
                        }}                    
                    >
                        Register
                    </Button>  */}
                </div>
            </div>
        </UserBoxFullScreen>
        
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
            {/* <Box sx= {{
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
            </Box> */}
       
        

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
            {/* <MenuItem onClick={()=> navigateInstructors()} >Instructors</MenuItem>
            <MenuItem onClick={()=> navigateAcademies()} >Academies</MenuItem>
            <MenuItem onClick={()=> navigateAboutUs()} >About Us</MenuItem> */}
            <MenuItem onClick={()=> navigateLogin()} >Login</MenuItem>
            {/* <MenuItem onClick={()=> navigateRegister()} >Register</MenuItem> */}

            {/* <MenuItem onClick={()=> logout()} >Logout</MenuItem> */}
        </Menu>
        

    </>
  )
}

export default UserBoxNavbarLogout