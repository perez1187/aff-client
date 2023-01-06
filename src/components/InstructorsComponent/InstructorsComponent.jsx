import React, {useEffect, useState} from 'react'

// services
import { fetchInstructorProfiles } from '../../services/InstructorServices'

// css
import './InstructorComponent.css'

// other icons
import ClockIcon from '../../assets/Vector1.png'
import WalletIcon from '../../assets/VectorWallet.png'

function InstructorsComponent() {

    // lokal useStates
    const [fetchedInstructorProfilesData, setFetchedInstructorProfilesData] = useState([])
    // const [instructorFilter, setInstructorFilter] = useState('?profile=user_profile&language=1')
    const [instructorFilter, setInstructorFilter] = useState('')
 
    useEffect(()=> {

        const getInstructorProfilesData = async e=> {
            const instructorProfilesData =await fetchInstructorProfiles(instructorFilter)     
            console.log(instructorProfilesData)
        if (instructorProfilesData) {
            setFetchedInstructorProfilesData(instructorProfilesData.results)
            }                    
        }

        getInstructorProfilesData()
        
    },[])    

    function RenderInstructorProfiles(){
        // const testProf = fetchedUserProfilesData.filter()

        function findInstructorTitle(id){
            let object = {}

            // we check if object exist
            try{
                object = fetchedInstructorProfilesData.find(obj => obj.id === id)
            } catch(e) {
                return (console.log("wrong id"))
            } 

            // we check if the instructor is chess_instructor
            if (object.profileType == 2) { // id 2 chess instructor
                try {
                    const chess_title  = object.chess_profile.chess_title
                    
                    // if wrong json
                    if (chess_title == undefined) {  
                        console.log("wrong json for chess tilte for profile id " + object.id)                      
                        return ("")
                    }

                    return (chess_title)
                }catch (e) {
                    console.log(e)
                    return ("")
                }
            } 
            // we check if the instructor is draughts_instructor (remember profile calls checkers_profile)
            if (object.profileType == 3) { //id 3 draughts instructor
                try {
                    const draughts_title  = object.checkers_profile.draughts_title
                    
                    // if wrong json
                    if (draughts_title == undefined) {  
                        console.log("wrong json for draughts tilte for profile id " + object.id)                      
                        return ("")
                    }

                    return (draughts_title)
                }catch (e) {
                    console.log(e)
                    return ("")
                }
            }             
            
        }

        function FindInstructorTypeOfGame(id){
            let object = {}
            // console.log("wszedlem w funkcje")
            // we check if object exist
            try{
                object = fetchedInstructorProfilesData.find(obj => obj.id === id)
            } catch(e) {
                return (console.log("wrong id"))
            } 

            // we check if the instructor is chess_instructor
            if (object.profileType == 2) {
                // console.log("yes")
                // const typeOfGame  = "Chess"
                return ("Chess Instructor")

            } 
            // we check if the instructor is draughts_instructor (remember profile calls checkers_profile)
            if (object.profileType == 3) {
                return "Checkers Instructor"
            }           
        }

        function findInstructorActualRanking(id){
            let object = {}

            // we check if object exist
            try{
                object = fetchedInstructorProfilesData.find(obj => obj.id === id)
            } catch(e) {
                return (console.log("wrong id"))
            } 

            // we check if the instructor is chess_instructor
            if (object.profileType == 2) {
                try {
                    const chessActualRanking  = object.chess_profile.actual_rating
                    
                    // if wrong json
                    if (chessActualRanking == undefined) {  
                        console.log("wrong json for chess actual ranking for profile id " + object.id)                      
                        return ("")
                    }

                    return (chessActualRanking)
                }catch (e) {
                    console.log(e)
                    return ("")
                }
            } 
            // we check if the instructor is draughts_instructor (remember profile calls checkers_profile)
            if (object.profileType == 3) {
                try {
                    const draughtsActualRanking  = object.checkers_profile.actual_rating
                    
                    // if wrong json
                    if (draughtsActualRanking == undefined) {  
                        console.log("wrong json for draughts actual for profile id " + object.id)                      
                        return ("")
                    }

                    return (draughtsActualRanking)
                }catch (e) {
                    console.log(e)
                    return ("")
                }
            }             
            
        }
        function findInstructorTopRanking(id){
            let object = {}

            // we check if object exist
            try{
                object = fetchedInstructorProfilesData.find(obj => obj.id === id)
            } catch(e) {
                return (console.log("wrong id"))
            } 

            // we check if the instructor is chess_instructor
            if (object.profileType == 2) {
                try {
                    const chessTopRanking  = object.chess_profile.top_rating
                    
                    // if wrong json
                    if (chessTopRanking == undefined) {  
                        console.log("wrong json for chess top ranking for profile id " + object.id)                      
                        return ("")
                    }

                    return (chessTopRanking)
                }catch (e) {
                    console.log(e)
                    return ("")
                }
            } 
            // we check if the instructor is draughts_instructor (remember profile calls checkers_profile)
            if (object.profileType == 3) {
                try {
                    const draughtsTopRanking  = object.checkers_profile.top_rating
                    
                    // if wrong json
                    if (draughtsTopRanking == undefined) {  
                        console.log("wrong json for draughts top rating for profile id " + object.id)                      
                        return ("")
                    }

                    return (draughtsTopRanking)
                }catch (e) {
                    console.log(e)
                    return ("")
                }
            }             
            
        }

        const listProfiles = fetchedInstructorProfilesData.map(
            (element) => {
                return (
                    <div key={element.id}  className="InstructorProfileBox" >                        
                        <div className='InstructorProfileBoxPersonalData'> {/* Avatar, name, title, game, opinions */}
                            
                            <div > {/* avatar and country flag */}
                                <div className='InstructorProfileBoxAvatar' style={{
                                    backgroundImage: `url(${element.avatar})`,
                                    width:"150px",
                                    height:'150px',
                                    backgroundRepeat:"no-repeat",
                                    backgroundSize:"cover" 
                                    }} ></div>
                                <div className='InstructorProfileBoxCountryFlag'  style={{
                                    backgroundImage: `url('https://flagcdn.com/40x30/${element.country}.png')`,
                                    backgroundRepeat:"no-repeat",
                                    backgroundSize:"cover" 
                                    }} ></div>
                                
                            </div>{/* avatar and country flag */}

                            <div className='ICInstructorData'> 
                                <div className='ICInstructorTitle'> {findInstructorTitle(element.id)} </div>    
                                <div className='ICInstructorTitleName'> 
                                    {/* <div className='ICInstructorTitle'> {findInstructorTitle(element.id)} </div> */}
                                    <div className='ICInstructorName'> {element.first_name}  </div>
                                    <div className='ICInstructorName'> {element.last_name} </div>
                                </div>
                                <div className='ICInstructorTypeOFGame'> {FindInstructorTypeOfGame(element.id)}</div>  
                                <div className='ICInstructorRankingBox'> 
                                    <div className='ICInstructorCRdef'>Current ranking</div>
                                    <div className='ICInstructorActualRanking'>{findInstructorActualRanking(element.id)}</div>
                                </div>
                                <div className='ICInstructorRankingBox2'> 
                                    <div className='ICInstructorCRdef'>Top ranking</div>
                                    <div className='ICInstructorActualRanking'>{findInstructorTopRanking(element.id)}</div>
                                </div>
                                {/* <div> top ranking</div> */}
                            
                            </div> {/* Instructor data */}

                        </div>{/* InstructorProfileBoxPersonalData */}

                        <div className='ICPrivateTraining'>Private Trainings</div>
                        <div className='ICPTRectangle'>
                            <div className='ICPrive'> 
                                    <div > <img className='ICPriveIcon' src={ClockIcon} alt="Clock Icon" /> </div>
                                    <div className='ICPriveDescription'> 1h polish</div>
                                    <div className='ICBorder'></div>
                                    <div > <img className='ICPriveIcon' src={WalletIcon} alt="Wallet Icon" /> </div>
                                    <div className='ICPrivePrize'> 200 PLN </div>
                                    
                            </div>
                        </div>
                    </div>
                )
            }
        )
        return(
            <div className="InstructorSection">
                {listProfiles}
            </div>
                
            
        )
        
    }

  return (
    <div >
        {RenderInstructorProfiles()}
    </div>
  )
}

export default InstructorsComponent