import React, {useState} from 'react'

// using context
import {useAuth} from '../../hooks/useAuth'

// services
import { CreateNewProfile } from '../../services/profile-services'
import { refreshAccessToken } from '../../services/user-services'

// css
import './CreateNewProfileComponent.css'

// mui
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// import country list 
import { CountryList } from '../../assets/contryList';

function CreateNewProfileComponent() {

    // temporary button colors
    const activeButtonColor = 'lightblue'
    const notActiveButtonColor = '#FCFCFC'

    // usestate for error
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // useStates for context
    const {authData,setAuth} =useAuth()

    // useStates for profile
    const [chessInstructor, setChessInstructor] = useState(true)
    const [chessInstructorStyle, setChessInstructorStyle] = useState(activeButtonColor)

    const [draughtsInstructor, setDraughtsInstructor] = useState(false)
    const [draughtsInstructorStyle, setDraughtsInstructorStyle] = useState(notActiveButtonColor)

    // useStates for form
    const [isVisible, setIsVisible] = useState(false) // visible on all instructors page
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [slug,setSlug] = useState('') // profilename
    const [avatar, setAvatar] = useState()
    const [country, setCountry] = useState("ad")

    // chess
    const [chessTitile, setChessTitle] = useState("None")
    const [actualRatingStdChess, setActualRatingStdChess] = useState('')
    const [actualRatingRapidChess, setActualRatingRapidChess] = useState('')
    const [actualRatingBlitzChess, setActualRatingBlitzChess] = useState('')
    const [topRatingStdChess, setTopRatingStdChess] = useState('')
    const [topRatingStdChessYear, setTopRatingStdChessYear] = useState('')
    const [topRatingRapidChess, setTopRatingRapidChess] = useState('')
    const [topRatingRapidChessYear, setTopRatingRapidChessYear] = useState('')
    const [topRatingBlitzChess, setTopRatingBlitzChess] = useState('')
    const [topRatingBlitzChessYear, setTopRatingBlitzChessYear] = useState('')

    // checkers
    const [checkersTitile, setCheckersTitle] = useState("None")
    const [actualRatingStdCheckers, setActualRatingStdCheckers] = useState('')
    const [actualRatingBlitzCheckers, setActualRatingBlitzCheckers] = useState('')
    const [topRatingStdCheckers, setTopRatingStdCheckers] = useState('')
    const [topRatingStdCheckersYear, setTopRatingStdCheckersYear] = useState('')
    const [topRatingBlitzCheckers, setTopRatingBlitzCheckers] = useState('')
    const [topRatingBlitzCheckersYear, setTopRatingBlitzCheckersYear] = useState('')

    // social media
    const [FB, setFB] = useState('')
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [yt, setYt] = useState('')
    const [tiktok, setTiktok] = useState('')

    // social chess
    const [fide, setFide] = useState('')
    const [chess_com, setChess_com] = useState('')
    const [lichess, setLichess] = useState('')

    // social checkers
    const [fmjd, setFmjd] = useState('')

    // other for later
    const [languages, setLanguages] = useState('')

    // profile description
    const [description, setDescription] = useState('')
    const [successes, setSuccesses] = useState('')
    const [experience, setexperience] = useState('')
    // const [aboutMe, setAboutMe] = useState('')
    const [messageToSMC, setMessageToSMC] = useState('')
    
    console.log(chessTitile)

     // function for create new profile
    const handleSubmit = async e => {
        // e.preventDefault() // we are not going to refresh the page
        // console.log("wszedlem")
        if (slug == '') {
            setErrorMessage('Profile Name cannot be empty')
        }
        if (authData) {
            
            // first we create new access token
            const newAccessToken = await refreshAccessToken(authData.tokens.refresh)
            // const newAccessToken = await refreshAccessToken(test_wrong_token)
            // console.log(newAccessToken.access)
            
            // if refresh token is not valid, we logout the user
            if (newAccessToken.detail) {

                setAuth(null)
                // navigateHome()
             
            } else {
 
                    // form data automatically create  'Content-Type'
                    const createData = new FormData()

                    const defaultChessProfile = {
                        "chess_title":chessTitile,                        
                        "actual_rating":actualRatingStdChess,
                        "actual_ratingRapid":actualRatingRapidChess,
                        "actual_ratingBlitz":actualRatingBlitzChess,
                        "top_rating":topRatingStdChess,
                        "top_rating_date":topRatingStdChessYear,
                        "top_ratingRapid":topRatingRapidChess,
                        "top_ratingRapid_date":topRatingRapidChessYear,
                        "top_ratingBlitz":topRatingBlitzChess,
                        "top_ratingBlitz_date":topRatingBlitzChessYear,                                                 
                        "chess.com":chess_com,
                        "fide.com":fide,
                        "lichess.org":lichess,                        
                    }

                    const defaultCheckersProfile = {
                        "draughts_title":checkersTitile,                        
                        "actual_rating":actualRatingStdCheckers,
                        "actual_ratingBlitz":actualRatingBlitzCheckers,
                        "top_rating":topRatingStdCheckers,
                        "top_rating_date":topRatingStdCheckersYear,
                        "top_ratingBlitz":topRatingBlitzCheckers,
                        "top_ratingBlitz_date":topRatingBlitzCheckersYear,                                                 
                        "fmjd.org":fmjd,                      
                    }

                    const socialMedia = {
                        "facebook":FB, 
                        "instagram":instagram,
                        "twitter":twitter,
                        "tiktok":tiktok,
                        "yt":yt,                     
                    }

                    // we add all fields to FormData like that:
                    createData.append('user',authData.id)
                    createData.append('first_name',name)
                    createData.append('last_name',lastName)
                    createData.append('country',country)
                    createData.append('avatar',avatar)
                    createData.append('slug',slug)
                    createData.append('successes',successes)
                    createData.append('teachingExperience',experience)
                    createData.append('description',description)
                    createData.append('hidden_message',messageToSMC)

                    if (chessInstructor) {
                        createData.append('chess_profile',JSON.stringify(defaultChessProfile))
                        createData.append('profileType','2') // 2 is chess instructor ID
                    } else {
                        createData.append('chess_profile',JSON.stringify({}))
                    }
                    
                    if (draughtsInstructor) {
                        createData.append('checkers_profile',JSON.stringify(defaultCheckersProfile))
                        createData.append('profileType','3') //  is checkers instructor ID
                    } else {
                        createData.append('checkers_profile',JSON.stringify({}))
                    }                    

                    createData.append('socials',JSON.stringify(socialMedia))
                    

                    // we call CreateNewProfile function and paste token + data
                    const data = await CreateNewProfile( 
                        newAccessToken.access,
                        createData
                    ) 
                    console.log(data)
                    console.log(data.avatar)
                    if (data.avatar == 'The submitted data was not a file. Check the encoding type on the form.') {
                        setErrorMessage(' You need to add avatar')
                    } else if (data.slug == 'profile_owner with this slug already exists.') {
                        setErrorMessage('The Profile Name already exist')
                    }
                }
            }
        else {
            console.log("you need to login")
            // we need to send info to user that he needs to login
        }
    }

    function ChangeActiveProfile(profile) {

        if (profile === 'chess') {
            
            setChessInstructor(true)
            setChessInstructorStyle(activeButtonColor)
            setDraughtsInstructor(false)
            setDraughtsInstructorStyle(notActiveButtonColor)

        } else if (profile === 'checkers') {
            setChessInstructor(false)
            setChessInstructorStyle(notActiveButtonColor)
            setDraughtsInstructor(true)
            setDraughtsInstructorStyle(activeButtonColor)
        } else {
            console.log('something wrong')
        }
    }

    // country List [and states]
    const list = Object.entries(CountryList).map(
        ([key, value]) => {
        return (
            <MenuItem value={key} style={{ textTransform: 'uppercase'}}>{key} - {value}</MenuItem>
        )
        
    }
    )

  return (
    <div className='CNPContainer'>
        Create a new Sharp Mind Profile
        <div>
            <button onClick={()=> ChangeActiveProfile('chess')} style={{backgroundColor:chessInstructorStyle}}>Chess Instructor</button>
            <button onClick={()=> ChangeActiveProfile('checkers')} style={{backgroundColor:draughtsInstructorStyle}} >Draughts Instructor</button>
            <button disabled={true}>Academy/Club</button>
        </div>

        {/* form for creating profile */}
        <form  className='CNPForm'>
            {/* <label className='CNPLabel'>
                <div className='CNPLabelName'> Profile Visible (Landing Page):</div>
                <input type="radio" />
            </label > */}
            <label className='CNPLabel'>
                <div className='CNPLabelName'> First Name:</div>
                <input type="text" onChange={ e => setName(e.target.value)}/>
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Last Name:</div>
                <input type="text" onChange={ e => setLastName(e.target.value)}/>
            </label >
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Profile name </div>
                <input type="text" onChange={ e => setSlug(e.target.value)} /> 
            </label >
            <label className='CNPLabel'>
                <div className='CNPLabelName' > Avatar:</div>
                {/* files bec we can add many files, and we want 1, that is we add [0] */}
                <input type="file" accept='image/*'  onChange={ e => setAvatar(e.target.files[0])} /> 
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Country:</div>
                <div className='CNPSelectTitle'>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Chess Title</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={country}
                                // label="Chess Title"
                                onChange={e => setCountry(e.target.value)}
                                fullWidth
                                style={{ textTransform: 'uppercase'}}
                                >
                                    {list}
                            </Select>
                        </FormControl>
                        </div>
            </label>
            {/* <label className='CNPLabel'>
                <div className='CNPLabelName'> Languages:</div>                
                <input type="text" onChange={ e => setLanguages(e.target.value)}/>
            </label> */}

            {chessInstructor ? 
                <> 
                    <div className='CNPBreakSpace'>Chess player profile:</div>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Chess Titile:</div>
                        <div className='CNPSelectTitle'>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Chess Title</InputLabel> */}
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={chessTitile}
                                // label="Chess Title"
                                onChange={e => setChessTitle(e.target.value)}
                                fullWidth
                                >
                                <MenuItem value={"None"}>None</MenuItem>
                                <MenuItem value={"Grandmaster (GM)"}>Grandmaster (GM)</MenuItem>
                                <MenuItem value={"Woman Grandmaster (WGM)"}>Woman Grandmaster (WGM)</MenuItem>
                                <MenuItem value={"International Master (IM)"}>International Master (IM)</MenuItem>
                                <MenuItem value={"Woman International Master (WIM)"}>Woman International Master (WIM)</MenuItem>
                                <MenuItem value={"FIDE Master (FM)"}>FIDE Master (FM)</MenuItem>
                                <MenuItem value={"Woman FIDE Master (WFM)"}>Woman FIDE Master (WFM)</MenuItem>
                                <MenuItem value={"Candidate Master (CM)"}>Candidate Master (CM)</MenuItem>
                                <MenuItem value={"Woman Candidate Master (WCM)"}>Woman Candidate Master (WCM)</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                    </label>

                    Rating (fide.com)
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Actual Rating Std</div>
                        <input type="text" onChange={ e => setActualRatingStdChess(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Actual Rating Rapid:</div>                
                        <input type="text" onChange={ e => setActualRatingRapidChess(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Actual Rating Blitz:</div>                
                        <input type="text" onChange={ e => setActualRatingBlitzChess(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> The highest ranking Std:</div>                
                        <input type="text" onChange={ e => setTopRatingStdChess(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Year:</div>                
                        <input type="text" onChange={ e => setTopRatingStdChessYear(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> The highest ranking Rapid:</div>                
                        <input type="text" onChange={ e => setTopRatingRapidChess(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Year:</div>                
                        <input type="text" onChange={ e => setTopRatingRapidChessYear(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> The highest ranking Blitz:</div>                
                        <input type="text" onChange={ e => setTopRatingBlitzChess(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Year:</div>                
                        <input type="text" onChange={ e => setTopRatingBlitzChessYear(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                    <div className='CNPLabelName'> Fide.com:</div>                
                    <input type="text" onChange={ e => setFide(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Chess.com:</div>                
                        <input type="text" onChange={ e => setChess_com(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Lichess.org:</div>                
                        <input type="text" onChange={ e => setLichess(e.target.value)}/>
                    </label>
                </>
            : <div></div>}


            {/* checkers rating  */}
            {draughtsInstructor ? 
                <>
                    <div className='CNPBreakSpace'>Draughts player profile:</div>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Draughts Title:</div>
                        <div className='CNPSelectTitle'>
                            <FormControl fullWidth>
                                {/* <InputLabel id="demo-simple-select-label">Chess Title</InputLabel> */}
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={checkersTitile}
                                    // label="Chess Title"
                                    onChange={e => setCheckersTitle(e.target.value)}
                                    fullWidth
                                    >
                                    <MenuItem value={"None"}>None</MenuItem>
                                    <MenuItem value={"International Grandmaster (GMI)"}>International Grandmaster (GMI)</MenuItem>
                                    <MenuItem value={"Woman International Grandmaster (GMIF))"}>Woman International Grandmaster (GMIF))</MenuItem>
                                    <MenuItem value={"National Grandmaster (GMN)"}>National Grandmaster (GMN)</MenuItem>
                                    <MenuItem value={"International Master (MI)"}>International Master (MI)</MenuItem>
                                    <MenuItem value={"Woman International Master (MIF)"}>Woman International Master (MIF)</MenuItem>
                                    <MenuItem value={"FMJD Master (MF)"}>FMJD Master (MF)</MenuItem>
                                    <MenuItem value={"Woman FMJD Master (MFF)"}>Woman FMJD Master (MFF)</MenuItem>
                                    <MenuItem value={"National Master (MN)"}>National Master (MN)</MenuItem>
                                    <MenuItem value={"Woman National Master (MNF)"}>Woman National Master (MNF)</MenuItem>
                                    <MenuItem value={"Candidate National Master (cMN)"}>Candidate National Master (cMN)</MenuItem>
                                    <MenuItem value={"Woman Candidate National Master (cMNF)"}>Woman Candidate National Master (cMNF)</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </label>
                    Rating (fmjd.org)
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Actual Rating Classic</div>
                        <input type="text" onChange={ e => setActualRatingStdCheckers(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Actual Rating Blitz:</div>                
                        <input type="text" onChange={ e => setActualRatingBlitzCheckers(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Top Rating Classic:</div>                
                        <input type="text" onChange={ e => setTopRatingStdCheckers(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Top Rating Classic Year:</div>                
                        <input type="text" onChange={ e => setTopRatingStdCheckersYear(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Top Rating Blitz:</div>                
                        <input type="text" onChange={ e => setTopRatingBlitzCheckers(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> Top Rating Blitz Year:</div>                
                        <input type="text" onChange={ e => setTopRatingBlitzCheckersYear(e.target.value)}/>
                    </label>
                    <label className='CNPLabel'>
                        <div className='CNPLabelName'> fmjd.org:</div>                
                        <input type="text" onChange={ e => setFmjd(e.target.value)}/>
                    </label>
                </>
            : <div></div>
            }

            <div className='CNPBreakSpace'>Social Media </div>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Facebook</div>                
                <input type="text" onChange={ e => setFB(e.target.value)}/>
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Instagram:</div>                
                <input type="text" onChange={ e => setInstagram(e.target.value)}/>
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Twitter:</div>                
                <input type="text" onChange={ e => setTwitter(e.target.value)}/>
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Youtube:</div>                
                <input type="text" onChange={ e => setYt(e.target.value)}/>
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Tiktok</div>                
                <input type="text" onChange={ e => setTiktok(e.target.value)}/>
            </label>


            <div className='CNPBreakSpace'>Profile description</div>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Successes:</div>                
                <textarea rows='5' cols="50" onChange={ e => setSuccesses(e.target.value)}> </textarea>
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Teaching Experience:</div>                
                <textarea rows='5' cols="50" onChange={ e => setexperience(e.target.value)}> </textarea>
            </label>
            {/* <label className='CNPLabel'>
                <div className='CNPLabelName'> About Me:</div>                
                <textarea rows='5' cols="50" value=''onChange={ e => setAboutMe(e.target.value)}> </textarea>
            </label> */}
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Description:</div>                
                <textarea rows='5' cols="50"  onChange={ e => setDescription(e.target.value)}> </textarea>
            </label>
            <label className='CNPLabel'>
                <div className='CNPLabelName'> Message to SMC (optional):</div>                
                <textarea rows='5' cols="50" onChange={ e => setMessageToSMC(e.target.value)}> </textarea>
            </label>
        </form>

        <div> By clicking Create New Profile you agree to the Terms and Conditions </div>
        <div className='CNPError'>{errorMessage}</div>
        <button onClick={()=>handleSubmit()} className='createProfileButton'> Create New Profile</button>
    </div>
  )
}

export default CreateNewProfileComponent