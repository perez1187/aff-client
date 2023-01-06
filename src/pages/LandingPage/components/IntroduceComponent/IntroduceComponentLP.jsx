import React from 'react'
import { useNavigate } from "react-router-dom";
// mui
import {Button, Menu, MenuItem }  from '@mui/material'

function IntroduceComponentLP() {

  const navigate = useNavigate();
  const navigateAdmin = () => {           
    navigate('admin/');
           
        }; 
  const navigatePlayerView = () => {           
    navigate('player/');
            
        }; 

  return (
    <div>Siema! 
        {/* <Navigation></Navigation> */}
        <Button 
          variant="contained" 
          size="medium"
          onClick={()=>navigateAdmin()}
          style={{
              borderRadius:80,
              fontSize:15,
              fontWeight:600,
              fontFamily:'Work Sans',
              color:"#FFFFFF",
              textTransform:"none"
          }}
      >                
              Admin Page            
      </Button> 
      <Button 
          variant="contained" 
          size="medium"
          onClick={()=>navigatePlayerView()}
          style={{
              borderRadius:80,
              fontSize:15,
              fontWeight:600,
              fontFamily:'Work Sans',
              color:"#FFFFFF",
              textTransform:"none"
          }}
      >                
              Player View         
      </Button> 
    </div>
  )
}

export default IntroduceComponentLP