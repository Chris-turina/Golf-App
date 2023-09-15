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


import RoundStatScreen from "./screens/RoundStatScreen";


import FriendListScreen from "./screens/ProfileScreens/FriendListScreen";
import EnterScoreScreen from "./screens/EnterScoreScreen";

import AdminScreen from "./screens/AdminScreens/AdminScreen";

import AdminUserListScreen from "./screens/AdminScreens/AdminUser/AdminUserListScreen";
import AdminUserProfileScreen from "./screens/AdminScreens/AdminUser/AdminUserProfileScreen";

import AdminCourseListScreen from "./screens/AdminScreens/Golf Course/AdminCourseListScreen";
import AdminCreateCourseScreen from "./screens/AdminScreens/Golf Course/AdminCreateCourseScreen";
import AdminCourseInfoScreen from "./screens/AdminScreens/Golf Course/AdminCourseInfoScreen";
import AdminCourseInfoEditTeeBoxScreen from "./screens/AdminScreens/Golf Course/AdminCourseInfoEditTeeBoxScreen";




function App() {
  return (
    <BrowserRouter>
      <div className="background">                     
            <Routes>
              <Route path='/' element={<LoginScreen />} exact />
              <Route path='player' element={<PlayerScreen />} exact />
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
              <Route path='admin/golf_courses/create' element={<AdminCreateCourseScreen />} />
              <Route path='admin/golf_courses/course/:id' element={<AdminCourseInfoScreen />} />
              <Route path='admin/golf_courses/course/:id/edit_tee/:id' element={<AdminCourseInfoEditTeeBoxScreen />} />
            
      

            </Routes>          
        {/* <Footer /> */}
      </div>
      
    </BrowserRouter>
  );
}

export default App;
