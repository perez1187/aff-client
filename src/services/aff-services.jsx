


// refresh access token
export function refreshAccessToken(refreshToken) {
    // const {authData, setAuth} =useAuth()

    const testWrongRefresh = 'abc'

    return fetch('https://playerapi.dsgaff.com/auth/token/refresh/', {
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
