import "react-datepicker/dist/react-datepicker.css";
import './styles/app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

import Footer from './components/Footer'


import PlayerScreen from './screens/PlayerScreen';
import PlayGolfScreen from './screens/PlayGolfScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import RoundsScreen from './screens/RoundsScreen';
import ProfileScreen from './screens/ProfileScreens/ProfileScreen';
import SelectTeeScreen from './screens/SelectTeeScreen';
import BookTeeTimeScreen from "./screens/BookTeeTimeScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";

import RoundStatScreen from "./screens/RoundStatScreen";
// import AdminCourseInfoScreen from "./screens/AdminCourseInfoScreen";
import AdminCourseCreateScreen from "./screens/AdminCourseCreateScreen"
import FriendListScreen from "./screens/ProfileScreens/FriendListScreen";
import EnterScoreScreen from "./screens/EnterScoreScreen";

import AdminScreen from "./screens/AdminScreens/AdminScreen";
import AdminUserListScreen from "./screens/AdminScreens/AdminUserListScreen";
import AdminUserProfileScreen from "./screens/AdminScreens/AdminUserProfileScreen";
import AdminCourseListScreen from "./screens/AdminScreens/Golf Course/AdminCourseListScreen";
import AdminCourseInfoScreen from "./screens/AdminScreens/Golf Course/AdminCourseInfoScreen"; 
import AdminCreateCourseScreen from "./screens/AdminScreens/Golf Course/AdminCreateCourseScreen";




function App() {
  return (
    <BrowserRouter>
      <div className="background">                     
            <Routes>
              <Route path='/' element={<PlayerScreen />} exact />
              <Route path='login' element={<LoginScreen />} />
              <Route path='register' element={<RegisterScreen />} />
              <Route path='golfcourses' element={<PlayGolfScreen />} />
              <Route path='/golfcourses/:id' element={<SelectTeeScreen />} />
              <Route path='/golfcourses/:id/scorecard' element={<EnterScoreScreen />} />

              <Route path='rounds' element={<RoundsScreen />} />
              <Route path='rounds/:id/stats' element={<RoundStatScreen />} />
        

              <Route path='profile/:id' element={<ProfileScreen />} />
              <Route path='profile/:id/friends' element={<FriendListScreen />} />
              
              <Route path='bookTeeTime' element={<BookTeeTimeScreen />} />


              <Route path='admin' element={<AdminScreen />} />
              <Route path='admin/users' element={<AdminUserListScreen />} />
              <Route path='admin/users/:id' element={<AdminUserProfileScreen />} />

              <Route path='admin/golf_courses' element={<AdminCourseListScreen />} />
              <Route path='admin/golf_courses/:id' element={<AdminCourseInfoScreen />} />
              <Route path='admin/golf_courses/create' element={<AdminCreateCourseScreen />} />




              {/* Depricate on Next Refactor */}
              <Route path='admin/userlist' element={<UserListScreen />} />
              


              
              {/* <Route path='admin/golfcourselist/create/:id' element={<AdminCourseCreateScreen />} />               */}
              {/* <Route path='admin/golfcourse/:id/score_card' element={<AdminCourseInfoScreen />} /> */}

            </Routes>          
        <Footer />
      </div>
      
    </BrowserRouter>
  );
}

export default App;
