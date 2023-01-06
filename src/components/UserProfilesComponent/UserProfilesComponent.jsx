import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

// using context
import {useAuth} from '../../hooks/useAuth'

// import services
import { refreshAccessToken } from '../../services/user-services'
import { fetchUserProfiles } from '../../services/profile-services'

// import country list 
import { CountryList } from '../../assets/contryList';

export default function UserProfilesComponent() {
    
    // useStates for context
    const {authData, setAuth} =useAuth()

    // lokal useStates
    const [fetchedUserProfilesData, setFetchedUserProfilesData] = useState([])

    // navigate
    const navigate = useNavigate()

    const navigateHome = () => {           
        navigate('/');          
                };

    const navigateCreatePage = () => {           
        navigate('/myprofile/create/');          
                };                

    const test_wrong_token = 'abc'

    useEffect(()=> {
        console.log("second use effe")
        console.log(fetchedUserProfilesData)
    },[fetchedUserProfilesData])
  
    useEffect(()=> {
        
        const getUserProfileData = async e=> {
            
            if (authData) {
             
                const newAccessToken = await refreshAccessToken(authData.tokens.refresh)
                // const newAccessToken = await refreshAccessToken(test_wrong_token)
                
                // if refresh token is not valid, we logout the user
                if (newAccessToken.detail) {

                    setAuth(null)
                    navigateHome()

                // else, we fetch user profiles    
                } else {
                    const userProfilesData =await fetchUserProfiles(newAccessToken.access)
                    if (userProfilesData){
                        // console.log("chuj")
                        setFetchedUserProfilesData(userProfilesData.results)
                        // console.log(fetchedUserProfilesData)
                    }

                }
 
            } else {
                console.log("you need to login")
                // we need to send info to user that he needs to login
            }
            

        }
        getUserProfileData()
      
    },[])

    // that was for testing:

    // console.log( Object.entries(CountryList).map(
    //     ([key, value]) => `My key is ${key} and my value is ${value}`
    // ))

    // function RenderCountryList () {
    //     const list = Object.entries(CountryList).map(
    //         ([key, value]) => {
    //         return (
    //             <div> My key is {key} and my value is {value}</div>
    //         )
            
    //     }
    //     )
    //     return (
    //         <div>
    //             {list}
    //         </div>
    //     )
    // }

    // that works for keys
    // const sortable = Object.entries(CountryList)
    //     .sort(([,a],[,b]) => a-b)
    //     .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

    // console.log(sortable);

    const sortable = Object.fromEntries(
        Object.entries(CountryList).sort(([,a],[,b]) => a-b)
    );
    
    console.log(sortable);


    function RenderProfiles(){
        // const testProf = fetchedUserProfilesData.filter()
        const listProfiles = fetchedUserProfilesData.map(
            (element) => {
                return (
                    <div key={element.id}>
                        {element.id} first name: {element.first_name} last name = {element.last_name}
                        profile type: {element.profile_type}
                    </div>
                )
            }
        )
        return(
            <div>
                {listProfiles}
            </div>
        )
        
    }

  return (
    <div> settings 
        Your Profiles 
        <button onClick={()=> navigateCreatePage()}> create profile</button>
        <div>{RenderProfiles()} </div>
        {/* <div>{RenderCountryList()}</div> */}
    </div>
  )
}
