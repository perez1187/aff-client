import { Button } from '@mui/material'
import React, {useEffect, useState} from 'react'
import { resendingActivationEmail } from '../../services/user-services'

function ActivateAccountComponent() {
    // geting token from url
    const queryParams = new URLSearchParams(window.location.search)
    const token = queryParams.get("token")
    const email = queryParams.get("email")

    // use state for messages to user
    const [userMessage, setUserMessage] = useState('')
    const [sendAnotherEmail, setSendAnotherEmail] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    // function for resending activation email
    const hadnleSubmit = async e => {
        //e.preventDefault() // we are not going to refresh the page        

        const data = await resendingActivationEmail( {'email':email}) 
        console.log(data)
        setEmailSent(true)
        }
        // info about success

    //send activation token to backend
    useEffect(()=> {
        const getData = async () => {
            await fetch(`http://127.0.0.1:8000/auth/email-verify?token=${token}`)
            .then(resp => resp.json())
            .then( data => {
                console.log(data)
                // show potencially errors
                if (data.error){
                    setUserMessage(data.error)
                    if (data.error == 'Activation Expired') {
                        setSendAnotherEmail(true)
                    }
                } else if (data.email) {
                    setUserMessage(data.email)
                }
            })
        }
        getData();
    }, [])

  return (
    <>
        <p> Message: {userMessage}</p>
        {sendAnotherEmail && 
        <> 
            <p> the activation link is only valid for 15 minutes</p>
            <p> click here and we will send you another activation email</p>
            {!emailSent && 
                <Button variant="contained" onClick={()=>hadnleSubmit()}>
                    Send New Activation email
                </Button>
            }
            {emailSent && 
                <p style={{color:"red"}}> we sent you a new email</p>
            }
        </>
        }           
    </>
  )
}

export default ActivateAccountComponent