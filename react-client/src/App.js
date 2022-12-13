import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    redirect,
} from "react-router-dom";

import './app.css';

import Home from "./components/Home";
import Login from "./components/Login";
import GameZone from "./components/patients/GameZone";
import Dashboard from "./components/patients/Dashboard";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/game-zone" element={<GameZone />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
