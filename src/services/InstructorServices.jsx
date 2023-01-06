

export function fetchInstructorProfiles(filteredValue) {

    return fetch(`http://127.0.0.1:8000/profile-owner/profiles/${filteredValue}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization':accessToken
        },
        // body: JSON.stringify({'email':'email', 'password': 'password'})
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
    }