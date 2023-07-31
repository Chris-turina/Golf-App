import "react-datepicker/dist/react-datepicker.css";
import './styles/app.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'

import Header from './components/Header';
import Footer from './components/Footer'


import PlayerScreen from './screens/PlayerScreen';
import CourseSelector from './screens/CourseSelector';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import RoundsScreen from './screens/RoundsScreen';
import ProfileScreen from './screens/ProfileScreens/ProfileScreen';
import PlayRoundScreen from './screens/PlayRoundScreen';
import BookTeeTimeScreen from "./screens/BookTeeTimeScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import AdminCourseListScreen from "./screens/AdminCourseListScreen";
import RoundStatScreen from "./screens/RoundStatScreen";
import AdminCourseInfoScreen from "./screens/AdminCourseInfoScreen";
import AdminCourseCreateScreen from "./screens/AdminCourseCreateScreen"
import FriendListScreen from "./screens/ProfileScreens/FriendListScreen";




function App() {
  return (
    <BrowserRouter>
      <div className="background">                     
            <Routes>
              <Route path='/' element={<PlayerScreen />} exact />
              <Route path='login' element={<LoginScreen />} />
              <Route path='register' element={<RegisterScreen />} />
              <Route path='golfcourses' element={<CourseSelector />} />

              <Route path='rounds' element={<RoundsScreen />} />
              <Route path='rounds/:id/stats' element={<RoundStatScreen />} />
        

              <Route path='profile/:id' element={<ProfileScreen />} />
              <Route path='profile/:id/friends' element={<FriendListScreen />} />
              <Route path='/golfcourses/:id' element={<PlayRoundScreen />} />
              <Route path='bookTeeTime' element={<BookTeeTimeScreen />} />
              
              <Route path='admin/userlist' element={<UserListScreen />} />
              <Route path='admin/user/:id/edit' element={<UserEditScreen />} />

              <Route path='admin/golfcourselist' element={<AdminCourseListScreen />} />
              <Route path='admin/golfcourselist/create/:id' element={<AdminCourseCreateScreen />} />              
              <Route path='admin/golfcourse/:id/score_card' element={<AdminCourseInfoScreen />} />

            </Routes>          
        <Footer />
      </div>
      
    </BrowserRouter>
  );
}

export default App;
