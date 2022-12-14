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
import NurseDashboard from "./components/nurse/NurseDashboard";
import ListTips from "./components/tips/ListTips";
import TipDetails from "./components/tips/TipDetails";
import AddTip from "./components/tips/AddTip";
import EditTip from "./components/tips/EditTip";
import DailyInformation from "./components/patients/DailyInformation";
import AddPatient from "./components/nurse/AddPatient";
import ListPatients from "./components/nurse/ListPatients";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path="/home" element={<Home/>}></Route>
                    <Route path="/dashboard" element={<Dashboard/>}></Route>
                    <Route path="/game-zone" element={<GameZone/>}></Route>
                    <Route path="/daily-information" element={<DailyInformation/>}></Route>
                    <Route path="/nurse" element={<NurseDashboard/>}></Route>
                    <Route path="/addPatient" element={<AddPatient />}></Route>
                    <Route path="/patients" element={<ListPatients />}></Route>
                    <Route path="/tips" element={<ListTips/>}></Route>
                    <Route path="/tips/details/:id" element={<TipDetails/>}></Route>
                    <Route path="/tips/add" element={<AddTip/>}></Route>
                    <Route path="/tips/edit/:id" element={<EditTip/>}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
