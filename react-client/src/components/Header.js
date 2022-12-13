import React from "react";
import { Link } from "react-router-dom";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Header() {
    /*     
        state variable for the screen, admin or user
        const [screen, setScreen] = useState('auth');

        //check if the user already logged-in
        const readCookie = async () => {
            try {
                console.log('--- in readCookie function ---');

                //
                const res = await axios.get('/read_cookie');
                //
                if (res.data.screen !== undefined) {
                    setScreen(res.data.screen);
                    console.log(res.data.screen)
                }
            } catch (e) {
                setScreen('auth');
                console.log(e.response.data);
            }
        };

        const logout = async () => {
            try {
                await axios.get('/signout');
                setScreen('auth');
                redirect('/')
            } catch (e) {
                console.log(e);
            }
        };

        //runs the first time the view is rendered
        //to check if user is signed in
        useEffect(() => {
            readCookie();
        }, []); //only the first render 
    */

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="home" className="ms-4">
                Centennial Collage Hospital
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto me-4">
                    <Nav.Link as={Link} to="/home">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/game-zone">
                        Game Zone
                    </Nav.Link>
                    <Nav.Link as={Link} to="/">
                        Logout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
