/* eslint-disable no-unused-vars */
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import SeatSelectionForm from './components/SeatSelectionForm';
import SwapResults from './pages/Swapresults';
import BackToTop from './components/BackToTop';
import PrivateRoute from './components/PrivateRoute';
<<<<<<< HEAD

=======
import NotificationPage from './pages/NotificationPage';
>>>>>>> 198492d77c328e0fc29b8ab5514196b2bbcab69b
export default function App() {
  return (
    // <div>
    //   App
    // </div>
    <BrowserRouter>
    <Header/>
    <BackToTop/>
    <Routes>  
         <Route path='/' element={<Home/>} />
<<<<<<< HEAD
        
=======
         <Route path='/test' element={<NotificationPage/>}/>
>>>>>>> 198492d77c328e0fc29b8ab5514196b2bbcab69b
         <Route path='/about' element={<About/>} />
         <Route path='/sign-in' element={<SignIn/>} />
         <Route path='/sign-up' element={<SignUp/>} />
      
         <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
         <Route path='/projects' element={<Projects/>} />
         <Route element={<PrivateRoute />}>
          <Route path='/swap-request/:pnrNumber' element={<SeatSelectionForm />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path='/SwapResults/:pnrNumber' element={<SwapResults />} />
        </Route>
         {/* <Route path='/swap-request/:pnrNumber' element={<SeatSelectionForm/>} />
         <Route  path="/SwapResults"   element={  <SwapResults /> }  /> */}
    </Routes>
    <Footer/>
    </BrowserRouter>
    
  )
}
