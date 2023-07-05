import "react-datepicker/dist/react-datepicker.css";
import './styles/app.css'
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer'


import HomeScreen from './screens/HomeScreen';
import CourseSelector from './screens/CourseSelector';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import RoundsScreen from './screens/RoundsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CourseDetailsScreen from './screens/CourseDetailsScreen';
import BookTeeTimeScreen from "./screens/BookTeeTimeScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import AdminCourseListScreen from "./screens/AdminCourseListScreen";
import AdminCourseEditScreen from "./screens/AdminCourseEditScreen";
import AdminCourseCreateScreen from "./screens/AdminCourseCreateScreen";
import AdminCourseDetailScreen from "./screens/AdminCourseDetailScreen";
import AdminCourseHoleDetailsScreen from "./screens/AdminCourseHoleDetailsScreen";
import AdminCourseHoleEditScreen from "./screens/AdminCourseHoleEditScreen";
// import ScoreFormInput from "./components/ScoreFormInput";



function App() {
  return (
    <BrowserRouter>
      <div className="background">
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen />} exact />
              <Route path='login' element={<LoginScreen />} />
              <Route path='register' element={<RegisterScreen />} />
              <Route path='golfcourses' element={<CourseSelector />} />
              <Route path='rounds' element={<RoundsScreen />} />            
              <Route path='profile' element={<ProfileScreen />} />
              <Route path='/golfcourses/:id' element={<CourseDetailsScreen />} />
              <Route path='bookTeeTime' element={<BookTeeTimeScreen />} />
              
              <Route path='admin/userlist' element={<UserListScreen />} />
              <Route path='admin/user/:id/edit' element={<UserEditScreen />} />

              <Route path='admin/golfcourselist' element={<AdminCourseListScreen />} />
              <Route path='admin/golfcourse/:id/create' element={<AdminCourseCreateScreen />} />
              <Route path='admin/golfcourse/:id/edit' element={<AdminCourseEditScreen />} />
              <Route path='admin/golfcourse/:id/details' element={<AdminCourseDetailScreen />} />
              <Route path='admin/golfcourse/:id/holes_details' element={<AdminCourseHoleDetailsScreen />} />
              <Route path='admin/golfcourse/:id/holes_edit' element={<AdminCourseHoleEditScreen />} />



            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
      
    </BrowserRouter>
  );
}

export default App;
