


  // function for fetching profiles
  export function fetch_results(player,acc_token,appNickname, appDate) {
    return fetch(`https://playerapi.dsgaff.com/api/v1/results/results/?player_nickname=${player}&nickname=${appNickname}&date=${appDate}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc_token}`
        },
        // because we cannot add body to GET
        // body: JSON.stringify(player)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}  

export function fetch_players(acc_token) {
    return fetch(`https://playerapi.dsgaff.com/api/v1/profiles/all/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${acc_token}`
        },
        // because we cannot add body to GET
        // body: JSON.stringify(player)
    }
    ).then(resp => resp.json())
    .catch( e => {
        console.log(e)
    })
}  