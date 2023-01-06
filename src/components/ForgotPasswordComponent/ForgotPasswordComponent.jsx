import React, {useState} from 'react'

// using context
import {useAuth} from '../../hooks/useAuth'

// MUI
import { InputAdornment, TextField, Button, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//local
import { requestPasswordResetEmail } from '../../services/user-services';

// user send request, got link
// if link is valid, he can create new password

function ForgotPasswordComponent() {
    // useStates for context
    const {authData, setAuth} =useAuth()

    // usestates
    const [username, setUsername] = useState('')
    const [emailSent, setEmailSent] = useState(false)

    // function for request reset password
    const handleSubmit = async e => {
        e.preventDefault() // we are not going to refresh the page
        const data = await requestPasswordResetEmail( {'email':username}) 
        console.log(data)
        setEmailSent(true)
    }

  return (
    <div style={{
        backgroundColor: "white", 
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center',
        padding:"5px"
    }}>       
           {/* if there are no authData, show reset passwordl*/}
        {!authData ? 
            <Box >                  
                <form onSubmit={handleSubmit}>
                    <Box 
                        sx = {{
                            display: "flex",
                            alignItems:"center",
                            padding:"10px"
                        }}> 
                        <TextField
                            id="input-with-icon-textfield"
                            label="Email"
                            variant="standard"                                                             
                            
                            onChange={ e => setUsername(e.target.value)}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <AccountCircleIcon />
                                </InputAdornment>
                            ),
                            }}                            
                        />
                    </Box>
                    
                    <Box
                        sx = {{
                            display: "flex",
                            alignItems:"center",
                            padding:"10px"

                        }}>
                        <div> 
                            <Button variant="outlined" type='submit'>Reset Password</Button>
                        </div>                                                   

                    </Box>
                    { emailSent && 
                    <p style={{color:"red"}}> We have sent you an email with a link to reset your password</p>
                }
                </form>
            </Box>

            :

        <p style={{
            color:"black"
        }}>
           You are login as: {authData.email}
        </p>   
        }

    </div>
  )
}

export default ForgotPasswordComponent