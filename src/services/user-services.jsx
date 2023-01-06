import React from 'react'
// using context
import {useAuth} from '../hooks/useAuth'


//login function
export function auth(credentials) {
    return fetch('https://playerapi.dsgaff.com/api/v1/auth/jwt/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}

//register function
export function register(userData) {
    return fetch('http://127.0.0.1:8000/auth/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}

//resending Activation Email
export function resendingActivationEmail(userData) {
    return fetch('http://127.0.0.1:8000/auth/resend-activation-email/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}

//forgot password
export function requestPasswordResetEmail(userData) {
    return fetch('http://127.0.0.1:8000/auth/request-reset-email/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}

//reset password complete
export function resetPassword(userData) {
    return fetch('http://127.0.0.1:8000/auth/password-reset-complete/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}

// refresh access token
export function refreshAccessToken(refreshToken) {
    // const {authData, setAuth} =useAuth()

    const testWrongRefresh = 'abc'

    return fetch('http://127.0.0.1:8000/auth/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"refresh":refreshToken})
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}


