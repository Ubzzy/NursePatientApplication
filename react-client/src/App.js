import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes,
    redirect,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
