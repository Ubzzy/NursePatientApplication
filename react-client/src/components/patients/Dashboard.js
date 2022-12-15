import React, {useEffect, useState} from "react";
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";

const GET_PATIENT_RECORDS = gql`
    query getPatientVitalRecords {
        records {
            _id
            cp
            user_id
            date
            trestbps
            chol
            fps
            restecg
            thalch
            exang
            oldpeak
            slope
            thal
            target
        }
    }
`;

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [records, setRecords] = useState();
    const {loading: tipsLoading, error: tipsError, data: tipsData, refetch} = useQuery(GET_PATIENT_RECORDS)


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
        refetch().then(result => {
            setRecords(result.data.records);
        });
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
                        <div className="card" style={{
                            height: "120px",
                            width: "200px",
                            marginRight: "10px",
                            backgroundColor: "#d3d3d3"
                        }} onClick={() => openLink("daily-tip")}>
                            <div className="card-body">
                                <h5 className="card-title">Check Out Daily Tip</h5>
                            </div>
                        </div>
                        <div className="card" style={{
                            height: "120px",
                            width: "200px",
                            marginRight: "10px",
                            backgroundColor: "lightcoral"
                        }} onClick={() => openLink("vital-information")}>
                            <div className="card-body">
                                <h5 className="card-title">Add your Vital Information</h5>
                            </div>
                        </div>
                        <div className="card" style={{
                            height: "120px",
                            width: "200px",
                            marginRight: "10px",
                            backgroundColor: "khaki"
                        }} onClick={() => openLink("covid19")}>
                            <div className="card-body">
                                <h5 className="card-title">Submit your Covid Symptoms</h5>
                            </div>
                        </div>
                        <div className="card" style={{
                            height: "120px",
                            width: "200px",
                            marginRight: "10px",
                            backgroundColor: "lightsalmon"
                        }} onClick={() => openLink("game-zone")}>
                            <div className="card-body">
                                <h5 className="card-title">Improve your knowledge with our PlayZone</h5>
                            </div>
                        </div>
                    </div>
                    <div className="container mt-5">
                        <h3 className="p-3 mb-2 bg-secondary text-white">Vital Records</h3>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Cholesterol</th>
                                <th scope="col">Fasting Blood Sugar</th>
                                <th scope="col">Rest ECG</th>
                            </tr>
                            </thead>
                            <tbody>
                            {records && records.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.recordDate}</td>
                                    <td>{item.chol}</td>
                                    <td>{item.fps}</td>
                                    <td>{item.restecg}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )
        }
        </>
    );
}

export default Dashboard;
