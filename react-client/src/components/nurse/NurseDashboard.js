import React, {useEffect, useState} from "react";
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";

const GET_ALERTS = gql`
    query getAllAlerts{
        alerts {
            _id
            userId
            userName
            status
            attendedBy
            alertedOn
        }
    }
`;

const UPDATE_ALERT = gql`
    mutation UpdateAlert($_id: String!) {
        updateAlert(_id: $_id) {
             _id
            userId
            userName
            status
            attendedBy
            alertedOn
        }
    }
`;

function NurseDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [alerts, setAlerts] = useState();

    const {loading: alertsLoading, error: alertsError, data: alertsData, refetch} = useQuery(GET_ALERTS);
    const [updateAlert, {loading: updateLoading, error: updateError, data: updateData}] = useMutation(UPDATE_ALERT)
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
        refetch().then(list => {
            setAlerts(list.data.alerts);
        });
    }, []); //only the first render 

    function resolveAlert(id) {
        updateAlert({
                variables: {
                    _id: id,
                }
            }
        ).then(() => {
            alert("Resolved");
            refetch().then(list => {
                setAlerts(list.data.alerts);
            });
        })
    }

    return (
        <>
            <Header/> {
            user &&
            (
                <>
                    <div className="jumbotron p-3 p-md-5 text-white bg-dark">
                        <div className="col-md-6 px-0">
                            <h1 className="display-4 font-italic">Hello {user.firstName}!</h1>
                            <p className="lead my-3">Welcome to the Nurse Dashboard!</p>
                        </div>
                    </div>
                    <div className="card-list">
                        <div className="card" style={{
                            height: "120px",
                            width: "200px",
                            marginRight: "10px",
                            backgroundColor: "#d3d3d3"
                        }} onClick={() => openLink("tips")}>
                            <div className="card-body">
                                <h5 className="card-title">Provide Health Tips for Patients</h5>
                            </div>
                        </div>
                        <div className="card" style={{
                            height: "120px",
                            width: "200px",
                            marginRight: "10px",
                            backgroundColor: "lightcoral"
                        }} onClick={() => openLink("vital-information")}>
                            <div className="card-body">
                                <h5 className="card-title">Add Vital Information For Your Patient</h5>
                            </div>
                        </div>
                        <div className="card" style={{
                            height: "120px",
                            width: "200px",
                            marginRight: "10px",
                            backgroundColor: "lightsalmon"
                        }} onClick={() => openLink("covid19")}>
                            <div className="card-body">
                                <h5 className="card-title">Add a Patients Covid Symptoms</h5>
                            </div>
                        </div>
                    </div>
                    {
                        alerts && alerts.length > 0 && (
                            <div className="container mt-5 mb-5">
                                <h3 className="p-3 mb-2 bg-secondary text-white">Check who is in trouble!</h3>
                                <table className="table table-hover">
                                    <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Patient</th>
                                        <th scope="col">Alerted On</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {alerts && alerts.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{index + 1}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.alertedOn}</td>
                                            <td className="link-primary" onClick={() => {
                                                resolveAlert(item._id)
                                            }
                                            } style={{cursor: "pointer"}}>Resolved
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </>
            )
        }
        </>
    );
}

export default NurseDashboard;
