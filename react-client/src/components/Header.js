import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header() {

    const navigate = useNavigate();
    const [user, setUser] = useState()

    //check if the user already logged-in
    const readCookie = async () => {
        const userData = JSON.parse(window.localStorage.getItem("user"));
        setUser(userData)
        if (!userData) {
            navigate("/");
        }
    };

    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
        readCookie();
    }, []); //only the first render 

    function logout() {
        window.localStorage.clear();
        navigate("/");
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand className="ms-4">
                Centennial Collage Hospital
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-4">
                    {/* Nurse  */}
                    {user && user.isNurse == true && <>
                        <Nav.Link as={Link} to="/nurse-dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/tips">
                            Tips
                        </Nav.Link>
                    </>
                    }
                    {/* Patient */}
                    {user && user.isNurse == false && <>
                        <Nav.Link as={Link} to="/dashboard">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/daily-tip">
                            Daily Tip
                        </Nav.Link>
                        <Nav.Link as={Link} to="/game-zone">
                            Game Zone
                        </Nav.Link>
                        <Nav.Link as={Link} to="/vital-information">
                            Vital Information
                        </Nav.Link>
                    </>
                    }

                    <button className="btn btn-secondary" onClick={() => logout()}>
                        logout
                    </button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
