import React from 'react'



// mui
import { AppBar, styled, Toolbar, Typography, Box, InputBase, Badge, Avatar, Menu, MenuItem } from '@mui/material'

// components
import LogoNavbar from './LogoNavbar';
import UserBoxNavbar from './UserBoxNavbar';

// our own toolbar
const StyledToolbar = styled(Toolbar) ({
    display: "flex",
    justifyContent:"space-between",
    backgroundColor:"#020717",
    margin:"0",
    padding:"0"
})

function Navbar() {
 
  return (
    <>
      <AppBar
          position='sticky' //it can be stick
      >
        {/* instead of toolbar we use Styledtoolbar that we overwrite toolbar */}
        <StyledToolbar>

          {/* Logo component */}
          <LogoNavbar />

          {/* login/logout/user menu */}
          <UserBoxNavbar /> 
        </StyledToolbar>
      </AppBar>

      
    </>
  )
}

export default Navbar