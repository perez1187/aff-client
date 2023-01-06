import React, { useEffect, useState } from 'react'

// using context
import {useAuth} from '../../hooks/useAuth'

import {fetch_results, fetch_players} from './services'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// css
import './IntroduceComponentLP.css'

function AdminPage() {

  // useStates for context
  const {authData, setAuth} =useAuth()
  const [player, setPlayer] = useState('');
  const [appNickname,setAppNickname] = useState('')
  const [appDate, setAppDate] = useState('')

  const [results, setResults] = useState( [{"results": {
    "id": 240,
    "player_nickname": "ferran2",
    "player_rb": 0.6,
    "player_adjustment": 0,
    "club": "THEDENETIAN",
    "nickname": "Gt_river_",
    "agents": "Ferrranito",
    "profit_loss": "0.00",
    "rake": "0.00",
    "deal": "0.60",
    "rakeback": "0.00",
    "adjustment": "0.00",
    "agent_settlement": "0.00",
    "date": "25/12/22"
}}])
  const [players, setPlayers] = useState([{username: 'admin', pkid: 1}])

  let rProfitLoss = 1
  let rRake = 1
  let rAffRakeback = 1
  let rPlayerRakeback = 1
  let rFerranRakeback = 1
  let rAdjustment = 1
  let rPlayerAdjustment = 1
  let rAgentSettlement = 1

  let rPlayerSettlement =1
  let rFerranSettlement = 1
  
  
  // r --> results
  try {
  rProfitLoss = Object.values(results).reduce((r, { profit_loss }) => r + parseFloat(profit_loss, 10), 0);
  rRake = Object.values(results).reduce((r, { rake }) => r + parseFloat(rake, 10), 0);
  rAffRakeback = Object.values(results).reduce((r, { rakeback }) => r + parseFloat(rakeback, 10), 0);
  rPlayerRakeback = Object.values(results).reduce((r, { rake, player_rb }) => r + (parseFloat(rake, 10))*(parseFloat(player_rb, 10)), 0);
  rFerranRakeback = Object.values(results).reduce((r, { rakeback,rake, player_rb }) => r + parseFloat(rakeback, 10) - ((parseFloat(rake, 10))*player_rb), 0);
  rAdjustment = Object.values(results).reduce((r, { adjustment }) => r + parseFloat(adjustment, 10), 0);
  rPlayerAdjustment = Object.values(results).reduce((r, { player_adjustment,rake,player_rb,profit_loss }) => r + (parseFloat(profit_loss, 10)+ (parseFloat(rake, 10))*(parseFloat(player_rb, 10))) * parseFloat(player_adjustment, 10)*(-1), 0);
  rAgentSettlement = Object.values(results).reduce((r, { agent_settlement }) => r + parseFloat(agent_settlement, 10), 0);

  rPlayerSettlement = Object.values(results).reduce((r, { profit_loss, player_rb, player_adjustment,rake }) => r + parseFloat(profit_loss, 10) + (parseFloat(rake, 10))*(parseFloat(player_rb, 10)) + (parseFloat(profit_loss, 10)+ (parseFloat(rake, 10))*(parseFloat(player_rb, 10))) * parseFloat(player_adjustment, 10)*(-1), 0);
  rFerranSettlement = Object.values(results).reduce((r, { agent_settlement,profit_loss, player_rb, player_adjustment,rake }) => r + parseFloat(agent_settlement, 10) - parseFloat(profit_loss, 10) - (parseFloat(rake, 10))*(parseFloat(player_rb, 10)) - (parseFloat(profit_loss, 10)+ (parseFloat(rake, 10))*(parseFloat(player_rb, 10))) * parseFloat(player_adjustment, 10)*(-1), 0);
  } catch (e){
    console.log("problem")
  }

  // reduce with math
  // const resultnew = Object.values(results).reduce((r, { profit_loss, rake }) => r + parseFloat(profit_loss, 10) - parseFloat(rake, 10), 0);

  const acc_token = authData.access

  async function fetch_all_results() {
    const data = await fetch_results(player,acc_token,appNickname,appDate)
    console.log("results + ", data)
    return setResults(data) }
 
  async function fetch_all_profiles() {

    const data = await fetch_players(acc_token)
    // console.log(data.profiles.results)
    return setPlayers(data.profiles.results)  

  }

  useEffect(()=> {
    
    fetch_all_results()
    fetch_all_profiles()      
        
  },[player,appNickname,appDate])     
  
  
  const list_of_results = results.map(
    (element) => {
      const suuum = element.rake
      return (
        <div key = {element.id} className='listofresults'>
          <div className='results_value'> {element.player_nickname}  </div>
          <div className='results_value'> {element.nickname}</div>
          <div className='results_value_club'> {element.club}</div>
          <div className='results_value_percent'> {element.deal}</div>
          <div className='results_value_percent'> {element.player_rb}</div>
          <div className='results_value_percent'> {element.adjustment}</div>
          <div className='results_value_percent'> {element.player_adjustment}</div>
          <div className='results_value'> {element.profit_loss}</div>
          <div className='results_value'> {element.rake}</div>
          <div className='results_value'> {element.rakeback}</div>
          <div className='results_value'> player rb</div>
          <div className='results_value'> {element.agent_settlement}</div>
          <div className='results_value'> {element.player_rb}</div>
          <div className='results_value'> Player earn</div>
          <div className='results_value'> ferran earn</div>
          <div className='results_value'> {element.date}</div>
        </div>
      )
    }
  )

  const handleChange = (event: SelectChangeEvent) => {
    setPlayer(event.target.value);
  };

  const handleChange2 = (event: SelectChangeEvent) => {
    setAppNickname(event.target.value);
  };
  const handleChange3 = (event: SelectChangeEvent) => {
    setAppDate(event.target.value);
  };  

  // setNewSum(resultnew)

  return (
    <div className='LPIntroduceBGImage'  >

      {/* search menu Player */}
       <div className='dropMenu'>      
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Players</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={player}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {players.map((element) => (
                  <MenuItem key={element.pkid} value={element.username}>
                    {element.username}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>
      
      {/* search menu Nickname */}
      <div className='dropMenu'>      
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Nicknames</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={appNickname}
                label="Age"
                onChange={handleChange2}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {results.map((element) => (
                  <MenuItem key={element.pkid} value={element.nickname}>
                    {element.nickname}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>

      {/* search menu data */}
      <div className='dropMenu'>      
        <FormControl fullWidth>
              <InputLabel id="demo-simple-select-filled-label">Dates</InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={appDate}
                label="Age"
                onChange={handleChange3}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {results.map((element) => (
                  <MenuItem key={element.pkid} value={element.date}>
                    {element.date}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </div>        

        {/* section with Player results */}
        
        <div>Player: {player}</div>
        <div> .</div>
        <div>Player P/L: {(Math.round(rProfitLoss * 100) / 100).toFixed(2)}</div>
        <div>Player Rake: {(Math.round(rRake * 100) / 100).toFixed(2)}</div>
        <div>.</div>
        <div>Aff RB: {(Math.round(rAffRakeback * 100) / 100).toFixed(2)}</div>
        <div>Player RB: {(Math.round(rPlayerRakeback * 100) / 100).toFixed(2)}</div>
        <div>Ferran RB: {(Math.round(rFerranRakeback * 100) / 100).toFixed(2)}</div>
        <div>.</div>
        <div>Adjustment: {(Math.round(rAdjustment * 100) / 100).toFixed(2)}</div>
        <div>Player Adjustment {(Math.round(rPlayerAdjustment * 100) / 100).toFixed(2)}</div>
        <div>.</div>
        <div>Agent settlement: {(Math.round(rAgentSettlement * 100) / 100).toFixed(2)}</div>
        <div>Player settlement: {(Math.round(rPlayerSettlement * 100) / 100).toFixed(2)}</div>
        <div>Ferran settlement: {(Math.round(rFerranSettlement * 100) / 100).toFixed(2)}</div>
        <div>.</div>
        {/* <div>{(Math.round(resultnew * 100) / 100).toFixed(2)} </div> */}
        
        {/*  section with all results */}

        <div className='listofresults'>
          <div className='results_value'> Player  </div>
          <div className='results_value'> Nickname</div>
          <div className='results_value_club'> Club</div>
          <div className='results_value_percent'> deal</div>
          <div className='results_value_percent'> player rb</div>
          <div className='results_value_percent'> adj</div>
          <div className='results_value_percent'> Player adj</div>
          <div className='results_value'> P/L</div>
          <div className='results_value'> Rake</div>
          <div className='results_value'> Rb</div>
          <div className='results_value'> player rb</div>
          <div className='results_value'> agent settlement</div>
          <div className='results_value'> plaeyr rb</div>
          <div className='results_value'> Player earn</div>
          <div className='results_value'> ferran earn</div>
          <div className='results_value'> date</div>
        </div>
      {list_of_results}

    </div>
  )
}

export default AdminPage