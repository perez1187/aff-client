import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";

// MUI
import { InputAdornment, TextField, Button, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

// local
import { register } from '../../services/user-services'

// using context
import {useAuth} from '../../hooks/useAuth'

function RegisterComponent() {

    const navigate = useNavigate();

        // useStates for register
        const [username, setUsername] = useState('')
        const [password, setPassword] = useState('')
        const [confrimPassword, setConfrimPassword] = useState('')
        const [registerNotSuccess, setRgisterNotSuccess]= useState(false)
        const [registerErrorMessage, setRegisterErrorMessage] = useState('')
    
        // useStates for context
        const {authData, setAuth} =useAuth()

        //function for checking password and confirmpassword
        const passMatch = () => {
            return password === confrimPassword
        }
        
        // function for clear input after register
        const emailInput = React.useRef(null);
        const passwordInput = React.useRef(null);
        const confirmPasswordInput = React.useRef(null);
    
        // function for register new account
        const handleSubmit = async e => {
          e.preventDefault() // we are not going to refresh the page
          setRgisterNotSuccess(false)
          if (passMatch()) {
            // console.log('all good')
            const regData = await register({'email':username, 'password': password})
            console.log(regData.password)
            if(regData) {
                if (regData.email == "user with this email already exists.") {
                    setRgisterNotSuccess(true)
                    setRegisterErrorMessage(regData.email)
                } else if (regData.password == "This field may not be blank." ) {
                    setRgisterNotSuccess(true)
                    setRegisterErrorMessage(regData.password)                    
                } else if (regData.password =="password should be at least 6 characters long") {
                    setRgisterNotSuccess(true)
                    setRegisterErrorMessage(regData.password)                      
                } else if (regData.email) {
                    setRgisterNotSuccess(true)
                    setRegisterErrorMessage(" we send you registration email to " + regData.email) 
                    emailInput.current.value = ""
                    passwordInput.current.value = ""
                    confirmPasswordInput.current.value = ""
                }
                //console.log("success " + regData.email + regData.password)
            }
            

          } else {
            setRgisterNotSuccess(true)
            setRegisterErrorMessage("password doesnt match")
          }
         
          // we can use shortcur if key and value is the same{username,  password}
        //   const data = await auth( {'email':username, 'password': password, 'confirmPassword':confrimPassword}) 
        const data = {'email':username, 'password': password, 'confirmPassword':confrimPassword}
        //console.log(data)  

        }
  return (
    <div style={{
        backgroundColor: "white", 
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center',
        padding:"5px"
    }}>
        
            {/* this below will show auth data form context */}
            {/* authData is user from App.jsx */}
            {/* if there are no authData, show login/pass form, if there are, show email*/}
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
                            id="email-textfield"
                            label="Email"
                            variant="standard"                                                            
                            inputRef={emailInput}
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
                        <TextField
                            id="input-password"
                            label="Password"
                            onChange={ e => setPassword(e.target.value)}
                            inputRef={passwordInput}
                            type="password"
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <LockIcon />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />
                    </Box>
                    <Box                         
                        sx = {{
                            display: "flex",
                            alignItems:"center",
                            padding:"10px"

                        }}>  
                        <TextField
                            id="input-confirm-password"
                            label="Confirm password"
                            onChange={ e => setConfrimPassword(e.target.value)}
                            type="password"
                            inputRef={confirmPasswordInput}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <LockIcon />
                                </InputAdornment>
                            ),
                            }}
                            variant="standard"
                        />
                    </Box>
                    
                    <Box
                        sx = {{
                            display: "flex",
                            alignItems:"center",
                            padding:"10px"

                        }}>  
                        <Button variant="outlined" type='submit'>Register</Button>
                        {registerNotSuccess &&
                        <p style={{
                            color: "red"
                        }} > {registerErrorMessage}</p>
                    }
                    </Box>
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

export default RegisterComponent