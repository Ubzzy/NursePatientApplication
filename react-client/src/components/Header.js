import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, redirect } from "react-router-dom";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// Components
import Home from './Home';
// import ListStudents from './student/ListStudents';
// import AddStudent from './student/AddStudent';
// import EditStudent from './student/EditStudent';
// import StudentDetails from './student/StudentDetails';
// import ListCourses from './course/ListCourses';
// import AddCourse from './course/AddCourse';
// import EditCourse from './course/EditCourse';
// import CourseDetails from './course/CourseDetails';
import Login from './Login';

function Header() {
    // //state variable for the screen, admin or user
    // const [screen, setScreen] = useState('auth');

    // //check if the user already logged-in
    // const readCookie = async () => {
    //     try {
    //         console.log('--- in readCookie function ---');

    //         //
    //         const res = await axios.get('/read_cookie');
    //         // 
    //         if (res.data.screen !== undefined) {
    //             setScreen(res.data.screen);
    //             console.log(res.data.screen)
    //         }
    //     } catch (e) {
    //         setScreen('auth');
    //         console.log(e.response.data);
    //     }
    // };

    // const logout = async () => {
    //     try {
    //         await axios.get('/signout');
    //         setScreen('auth');
    //         redirect('/')
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };


    // //runs the first time the view is rendered
    // //to check if user is signed in
    // useEffect(() => {
    //     readCookie();
    // }, []); //only the first render

    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Navbar.Brand href="home" className='ms-4'>Project - Group 4</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto me-4">
                        <Nav.Link as={Link} to="/home" >Home</Nav.Link>
                        {/* <Nav.Link as={Link} to="/courses" >Courses</Nav.Link>
                        <Nav.Link className="me-5" as={Link} to="/students" >Students</Nav.Link> */}
                        {/* {screen === 'auth' ? ( */}
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        {/* ) : (<Nav.Link as={Link} onClick={logout}>{screen} - Logout</Nav.Link>)} */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Routes>
                <Route index element={<Home />} />
                <Route path='home' element={<Home />} />
                {/* <Route path='courses' element={<ListCourses />} />
                <Route path='courses/details/:id' element={<CourseDetails />} />
                <Route path='courses/edit/:id' element={<EditCourse />} />
                <Route path='courses/add' element={<AddCourse />} />
                <Route path="students" element={<ListStudents />} />
                <Route path="students/details/:id" element={<StudentDetails />} />
                <Route path="students/edit/:id" element={<EditStudent />} />
                <Route path="students/add" element={<AddStudent />} /> */}
                <Route path='login' element={<Login/>} />
            </Routes>
        </Router>
    )
}

export default Header