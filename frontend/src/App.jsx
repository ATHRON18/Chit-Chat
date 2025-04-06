import './App.css'
import  Navbar  from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

import { useAuthStore } from './store/useAuthStore'
import { useThemeStore } from './store/useThemeStore'

import { useEffect } from 'react'
import {Toaster} from "react-hot-toast"
import { useLocation } from 'react-router-dom'

const App = () => {

  const {authUser,checkAuth,isCheckingAuth,onlineUser} = useAuthStore()
  const {theme} = useThemeStore();
  
  const use = useLocation();

  useEffect(()=>{checkAuth()},[checkAuth])
  
  if(isCheckingAuth && !authUser){
    return(
    <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-ring loading-xl"></span>
    </div>)
  }

  
  return (
    
    <div data-theme={theme} className={`font-quicksand flex flex-col ${use.pathname=="/settings"?"min-h-screen" : "h-screen"} `}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser?<HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser?<SignupPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser?<LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={<SettingsPage /> } />
        <Route path='/profile' element={authUser?<ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster  toastOptions={{duration: 1600,}}/>
    </div>
  )
}

export default App
