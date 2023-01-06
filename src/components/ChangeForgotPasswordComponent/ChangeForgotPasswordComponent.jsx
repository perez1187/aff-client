import { Box, InputAdornment, TextField, Button } from '@mui/material'
import React, {useEffect, useState} from 'react'

import LockIcon from '@mui/icons-material/Lock';

// using context
import {useAuth} from '../../hooks/useAuth'
import { resetPassword } from '../../services/user-services';
import { fontSize } from '@mui/system';

function ChangeForgotPasswordComponent() {
    
    // we get token and uidb64 from url
    // we send to backend if everything is ok
    // we allow user to put new password and we send new password, token and uidb to backend

    const [password, setPassword] = useState('')
    const [confrimPassword, setConfrimPassword] = useState('')
    const [resetPasswordNotSuccess, setResetPasswordNotSuccess] = useState(false)
    const [resetErrorMessage, setResetErrorMessage] = useState('')


    // reset input
    const passwordInput = React.useRef(null);
    const confirmPasswordInput = React.useRef(null);

    // get data from url
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    const uidb64 = queryParams.get("uidb64")

    // context
    const {authData, setAuth} =useAuth() 

    //function for checking password
    const passMatch = () => {
        return password === confrimPassword
    }

    // function after clicking reset password button
    const handleSubmit = async e => {
        e.preventDefault() // we are not going to refresh the page
        setResetPasswordNotSuccess(false)
        if (passMatch()) {
            // console.log('all good')
            const data = await resetPassword({'token':token, 'password': password, 'uidb64':uidb64})
            console.log(data)
            if (data) {
                if (data.password == "This field may not be blank.") {
                    setResetPasswordNotSuccess(true)
                    setResetErrorMessage(data.password)
                }
                if (data.detail == "The reset link is invalid") {
                    setResetPasswordNotSuccess(true)
                    setResetErrorMessage(data.detail)
                }
                if (data.success == true) {
                    setResetPasswordNotSuccess(true)
                    setResetErrorMessage(data.message)
                    passwordInput.current.value = ""
                    confirmPasswordInput.current.value = ""
                    
                }               
            }
        } else {
            setResetPasswordNotSuccess(true)
            setResetErrorMessage("password do not match")
        }
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
            {(!authData) ? 
                <Box >  
                    
                    <form onSubmit={handleSubmit}>
                        <p style={{color: "red"}} > Create new password</p>
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
                            <Button variant="contained" type='submit'>Reset Password</Button>

                        </Box>
                        <p style={{color:"black", fontSize:"12px"}}>Password need to have at least 6 characters</p>
                        {resetPasswordNotSuccess && <p style={{color:"red", fontSize:"12px"}}>{resetErrorMessage}</p>}
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

export default ChangeForgotPasswordComponent