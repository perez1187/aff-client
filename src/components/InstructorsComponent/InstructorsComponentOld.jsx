import React, {useEffect, useState} from 'react'

// services
import { fetchInstructorProfiles } from '../../services/InstructorServices'

// css
import './InstructorComponent.css'

// social icons
import FbICon from '../../assets/socialIcons/facebookIcon.png'
import InstagramIcon from '../../assets/socialIcons/instagramIcon.png'
import LinkedinIcon from '../../assets/socialIcons/linkedinIcon.png'
import LichessIcon from '../../assets/socialIcons/lichessIcon.png'
import TwitterIcon from '../../assets/socialIcons/twitterIcon.png'
import ChesscomIcon from '../../assets/socialIcons/chesscomIcon.png'
import EmailIcon from '../../assets/socialIcons/emailIcon.png'

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
        const listProfiles = fetchedInstructorProfilesData.map(
            (element) => {
                return (
                    <div key={element.id}  className="InstructorProfileBox" >                        
                        <div className='InstructorProfileBoxPersonalData'> {/* Avatar, name, title, game, opinions */}
                            
                            <div className='InstructorProfileBoxAvatarCountr'> {/* avatar and country flag */}
                                <div className='InstructorProfileBoxAvatar'></div>
                                {/* <div className='InstructorProfileBoxCountryFlag'></div> */}
                                <div className='InstructorProfileBoxTypeOfGame'> Chess </div> {/* type of game */}
                            </div>{/* avatar and country flag */}

                            <div className='InstructorProfileBoxBoxName'> {/* title, name, game, opinions */}

                                <div className='InstructorProfileBoxTitleName'> {/* title name */}
                                    <div className='InstructorProfileBoxTitle'>GM</div> 
                                    <div className='InstructorProfileBoxNameName'> Kaczmarek Piotr</div>                             
                                </div> {/* className='InstructorProfileBoxTitleName' */}    

                                <div className='InstructorProfileBoxCountryFlag'></div>

                                <div className='InstructorProfileBoxELORating'> ELO rating: </div> {/* type of game */}
                                <div className='InstructorProfileBoxRatingActualRating'> 
                                    <div className='InstructorProfileBoxRatingActualRatingActual'>Actual:</div>
                                    <div className='InstructorProfileBoxRatingActualRatingRating'>1900</div>
                                    <div className='InstructorProfileBoxRatingActualRatingType'>standart</div>                                 
                                </div> {/* actual rating */}
                                <div className='InstructorProfileBoxRatingPB'> 
                                    <div  className='InstructorProfileBoxRatingActualRatingActual'> Personal Best:</div>
                                    <div className='InstructorProfileBoxRatingPBRating'>2063</div>
                                    {/* <div> 01/01/2005</div> */}
                                    <div className='InstructorProfileBoxRatingActualRatingType'>standart</div>
                                </div> {/* type of game */}

                                <div className='InstructorProfileBoxOpinions'> </div> {/* opinions */}
                            </div> {/*InstructorProfileBoxBoxName  */}

                        </div>{/* InstructorProfileBoxPersonalData */}
                        <div className='InstructorProfileBoxSMBox'>
                            <a href='https://www.instagram.com/' target="_blank" className='InstructorProfileBoxSMBoxIcon'> 
                                <img className='InstructorProfileBoxSMBoxIcon' src={InstagramIcon} alt = "FBIcon" style={{ display: "display"}} />
                            </a>
                            <a href='https://www.instagram.com/' target="_blank" className='InstructorProfileBoxSMBoxIcon'> 
                                <img className='InstructorProfileBoxSMBoxIcon' src={LichessIcon} alt = "FBIcon" style={{ display: "display"}} />
                            </a>
                            <a href='https://www.instagram.com/' target="_blank" className='InstructorProfileBoxSMBoxIcon'> 
                                <img className='InstructorProfileBoxSMBoxIconFB' src={FbICon} alt = "FBIcon" style={{ display: "display"}} />
                            </a>
                            <a href='https://www.instagram.com/' target="_blank" className='InstructorProfileBoxSMBoxIcon'> 
                                <img className='InstructorProfileBoxSMBoxIcon' src={LinkedinIcon} alt = "FBIcon" style={{ display: "display"}} />
                            </a>
                            <a href='https://www.instagram.com/' target="_blank" className='InstructorProfileBoxSMBoxIcon'> 
                                <img className='InstructorProfileBoxSMBoxIcon' src={ChesscomIcon} alt = "FBIcon" style={{ display: "display"}} />
                            </a>
                            <a href='https://www.instagram.com/' target="_blank" className='InstructorProfileBoxSMBoxIcon'> 
                                <img className='InstructorProfileBoxSMBoxIcon' src={TwitterIcon} alt = "FBIcon" style={{ display: "display"}} />
                            </a>
                            <a href='https://www.instagram.com/' target="_blank" className='InstructorProfileBoxSMBoxIcon'> 
                                <img className='InstructorProfileBoxSMBoxIcon' src={EmailIcon} alt = "FBIcon" style={{ display: "display"}} />
                            </a>
                        </div>{/* InstructorProfileBoxSMBox */}

                        <div className='InstructorProfileBoxTrainingsWord'>Trainings:</div>
                        <div className='InstructorProfileBoxTrainingBox'> 
                            <div>
                                <div className='InstructorProfileBoxTrainingPrice'> Price: </div>
                                <div className='InstructorProfileBoxTrainingPricePrice'> 100 pln/h</div>
                            </div>
                            <div>
                                <div className='InstructorProfileBoxTrainingPrice'> Online: </div>
                                <div className='InstructorProfileBoxTrainingPricePrice'> Yes</div>
                            </div>
                            <div>
                                <div className='InstructorProfileBoxTrainingPrice'> Stationary: </div>
                                <div className='InstructorProfileBoxTrainingPricePrice'> No</div>
                            </div>
                            {/* <div className='InstructorProfileBoxTrainingPricePrice'> 100 pln/h</div> */}
                        </div>

                        <div className='InstructorProfileBoxLanguagesBox'>
                            <div className='InstructorProfileBoxLanguagesBoxName'> languages: </div>
                            <div className='InstructorProfileBoxLanguagesBoxName'> polish english</div>
                        </div>
                        
                        <div className='InstructorProfileBoxLanguagesBoxName'> adress: Poznan</div>
                        <div> Filmy onilne: Tak</div>
                        <div>opis: Lorem ipsumm</div>
                                  {/*  */}
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