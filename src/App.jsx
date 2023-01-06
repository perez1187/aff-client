import './App.css'

// components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// react
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// context
import {AuthenticationProvider} from './hooks/useAuth'
import InstructorsPage from './pages/InstructorsPage';

// pages
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import RegisterPage from './pages/RegisterPage';
import ActivatePage from './pages/ActivatePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ChangeForgotPasswordPage from './pages/ChangeForgotPasswordPage';
import UserProfile from './pages/UserProfile';
import Academies from './pages/AcademiesPage';
import AboutUsPage from './pages/AboutUsPage';
import CookieSettiings from './pages/PrivacyAndPolicyPages/CookieSettiings';
import PrivacyPolicyPage from './pages/PrivacyAndPolicyPages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/PrivacyAndPolicyPages/TermsAndConditionsPage';
import CreateNewProfilePage from './pages/CreateNewProfilePage';
import AdminPage from './pages/AdminPage/AdminPage'

import AdminPlayerViewPage from './pages/AdminPlayerViewPage/AdminPlayerViewPage'


function App() {

  // we check auth data from local storage and put it as an object to user
  const user = JSON.parse(localStorage.getItem('smc-user') )

  return (
    <BrowserRouter>
      {/* // we give user, user is sendingg to Authentication provider, and then is set as authDate (useState) */}
      <AuthenticationProvider user = {user}>  {/* everything below are children */}
        <> 
          
          <Navbar/>

          <Routes> 
            <Route path='/' element={<LandingPage/>} />  
            <Route path='admin/' element={<AdminPage/>} />
            <Route path='player/' element={<AdminPlayerViewPage/>} />            

            {/* user pages */}
            <Route path='login/' element={<LoginPage/>} />
            {/* <Route path='register/' element={<RegisterPage/>} /> */}
            <Route path='activate/' element={<ActivatePage/>} /> 
            <Route path='forgot-password/' element={<ForgotPasswordPage/>} /> 
            <Route path='change-forgot-password/' element={<ChangeForgotPasswordPage/>} />
            <Route path='myprofile/' element={<UserProfile/>} /> 
            <Route path='myprofile/create/' element={<CreateNewProfilePage/>} /> 

            {/* main pages  */}
            <Route path='contact/' element={<ContactPage/>} />
            <Route path='instructors/' element={<InstructorsPage/>} />
            <Route path='academies/' element={<Academies/>} />
            <Route path='aboutus/' element={<AboutUsPage/>} />

            {/* Privacy and Policy pages */}
            <Route path='cookies/' element={<CookieSettiings/>} />
            <Route path='privacy/' element={<PrivacyPolicyPage/>} />
            <Route path='terms/' element={<TermsAndConditionsPage/>} />

          </Routes>

          {/* <Footer/> */}
        </>
      </AuthenticationProvider>
    </BrowserRouter>
  )
}

export default App
