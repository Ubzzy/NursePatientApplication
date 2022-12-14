import React, {useEffect, useState} from "react";
import Header from "../Header";
import {useNavigate} from "react-router-dom";

function Dashboard() {
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

    function openLink(link) {
        navigate("/" + link);
    }

    useEffect(() => {
        readCookie();
    }, []); //only the first render 
    return (
        <>
            <Header/> {
            user &&
            (
                <>
                    <div className="jumbotron p-3 p-md-5 text-white bg-dark">
                        <div className="col-md-6 px-0">
                            <h1 className="display-4 font-italic">Hello {user.firstName}!</h1>
                            <p className="lead my-3">Welcome to Centennial collage Hospital!</p>
                            <p className="lead my-3">Feeling Bored! Checkout below activities!</p>
                        </div>
                    </div>
                    <div className="card-list">
                        <div className="card" style={{height: "120px", width: "200px", marginRight: "10px", backgroundColor: "#d3d3d3"}} onClick={() => openLink("daily-tip")}>
                            <div className="card-body">
                                <h5 className="card-title">Check Out Daily Tip</h5>
                            </div>
                        </div>
                        <div className="card" style={{height: "120px", width: "200px", marginRight: "10px", backgroundColor: "lightcoral"}} onClick={() => openLink("vital-information")}>
                            <div className="card-body">
                                <h5 className="card-title">Add your Vital Information</h5>
                            </div>
                        </div>
                        <div className="card" style={{height: "120px", width: "200px", marginRight: "10px", backgroundColor: "lightsalmon"}} onClick={() => openLink("game-zone")}>
                            <div className="card-body">
                                <h5 className="card-title">Improve your knowledge with our PlayZone</h5>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        </>
    );
}

export default Dashboard;
