import React from 'react'
import { useNavigate } from 'react-router-dom';

// mui
import { BottomNavigation, Button } from '@mui/material';

// css
import './Footer.css'

function Footer() {

    // navigate
    const navigate = useNavigate();

    const navigatePrivacy = () => {           
        navigate('privacy/');   
        // setOpen(false)       
                };

    const navigateTerms = () => {           
      navigate('terms/');   
      // setOpen(false)       
              };  

    const navigateCookies = () => {           
      navigate('cookies/');   
      // setOpen(false)       
              };     
              
    const navigateContact = () => {           
      navigate('contact/');   
      // setOpen(false)       
              };            

  return (
    <BottomNavigation style={{
      width:'100%',
      height:30,
      position: 'fixed',
      bottom:0,
      backgroundColor:"#020717",
      display:'flex',
      flexDirection:'row',
      justifyContent:"center",
      alignItems:'center'
      // alignSelf:'center'
      // marginTop:150

      }} 
    >

        <Button 
            variant="text" 
            onClick={() => navigatePrivacy()} 
            style={{
                color: "white",
                fontSize:10,
                fontFamily:'Roboto',
                fontStyle:'normal',
                fontWeight:300,
                textTransform:"none"
                }}>
            Privacy Policy
        </Button>
        <Button 
            variant="text" 
            onClick={() => navigateTerms()} 
            style={{
                color: "white",
                fontSize:10,
                fontFamily:'Roboto',
                fontStyle:'normal',
                fontWeight:300,
                textTransform:"none"
                }}>
            Terms and Conditions
        </Button>
        <Button 
            variant="text" 
            onClick={() => navigateCookies()} 
            style={{
                color: "white",
                fontSize:10,
                fontFamily:'Roboto',
                fontStyle:'normal',
                fontWeight:300,
                textTransform:"none"
                }}>
            Cookie Settings
        </Button>
        <Button 
            variant="text" 
            onClick={() => navigateContact()} 
            style={{
                color: "white",
                fontSize:10,
                fontFamily:'Roboto',
                fontStyle:'normal',
                fontWeight:300,
                textTransform:"none"
                }}>
            Contact
        </Button>
    </BottomNavigation>
    
    
  )
}

export default Footer

const styles = {
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};