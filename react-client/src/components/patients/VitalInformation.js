import React, {useEffect, useState} from "react";
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import {gql, useMutation, useQuery} from '@apollo/client';

const ADD_DAILY_INFORMATION = gql`
    mutation AddVitalInformation(
        $userId: String!, 
        $cp: String!,
        $trestbps: String!,
        $chol: String!,
        $fps: String!,
        $restecg: String!,
        $thalch: String!,
        $exang: String!,
        $oldpeak: String!        
        $slope: String!        
        $thal: String!        
        $target: String!        
        ) {
        addVitalInformation(
            userId: $userId,
            cp: $cp,
            trestbps: $trestbps,
            chol: $chol,
            fps: $fps,
            restecg: $restecg,
            thalch: $thalch,
            exang: $exang,
            oldpeak: $oldpeak
            slope: $slope
            thal: $thal
            target:$target
            ) {
            _id
        }
    }
`;

const GET_PATIENTS = gql`
    query patients {
        patients {
            _id
            firstName
            lastName
        }
    }
`;

function VitalInformation() {
    const navigate = useNavigate();

    const [vitalInformation, setVitalInformation] = useState({
        userId: "",
        cp: "",
        trestbps: "",
        chol: "",
        fps: "",
        restecg: "",
        thalch: "",
        exang: "",
        oldpeak: "",
        slope: "",
        thal: "",
        target: ""
    });

    const [patients, setPatients] = useState([]);
    const [user, setUser] = useState();

    const [AddVitalInformation, {data, loading, error}] = useMutation(ADD_DAILY_INFORMATION);

    const {loading: patientsLoading, error: patientsError, data: patientsData, refetch} = useQuery(GET_PATIENTS);

    const onChange = (e) => {
        e.persist();
        setVitalInformation({...vitalInformation, [e.target.name]: e.target.value});
    };

    const readCookie = async () => {
        const userData = JSON.parse(window.localStorage.getItem("user"));
        setUser(userData)
        if (!userData) {
            navigate("/");
        }
    };

    async function saveVitalInformation() {
        if (!user.isNurse) {
            vitalInformation.userId = user._id;
        }
        if (!vitalInformation.cp || !vitalInformation.trestbps) {
            alert("Enter valid information");
            return;
        }
        await AddVitalInformation({variables: vitalInformation})
        backToDashboard();
    }

    function backToDashboard() {
        if (user.isNurse) {
            navigate("/nurse-dashboard");
        } else {
            navigate("/dashboard");
        }
    }

    useEffect(() => {
        readCookie();
        refetch().then(result => {
            setPatients(result.data.patients)
        })
    }, [])

    return (<>
        <Header/>

        <div className="container">
            <fieldset>
                <h1 className="text-center m-5">Add Vital Information</h1>{
                user && user.isNurse && (
                    <div className="form-group mb-3">
                        <label className="col-md-12 control-label" htmlFor="cp">Patient</label>
                        <div className="col-md-12">
                            <select id="userId" name="userId" onChange={onChange} className="form-control ">
                                <option value="">Select</option>
                                {patients && patients.map(patient => (
                                    <option key={patient._id} value={patient._id}>{patient.firstName}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )
            }
                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="cp">Chest Pain</label>
                    <div className="col-md-12">
                        <input id="cp" name="cp" type="number" placeholder="" value={vitalInformation.cp} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="trestbps">Tres BPS</label>
                    <div className="col-md-12">
                        <input id="trestbps" name="trestbps" type="number" placeholder="" value={vitalInformation.trestbps} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="chol">Cholesterol(mg)</label>
                    <div className="col-md-12">
                        <input id="chol" name="chol" type="number" placeholder="" value={vitalInformation.chol} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="fps">Fasting Blood Sugar</label>
                    <div className="col-md-12">
                        <input id="fps" name="fps" type="number" placeholder="" value={vitalInformation.fps} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="restecg">Rest ECG</label>
                    <div className="col-md-12">
                        <input id="restecg" name="restecg" type="number" placeholder="" value={vitalInformation.restecg} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="thalch">Heart Rate Achieved</label>
                    <div className="col-md-12">
                        <input id="thalch" name="thalch" type="number" placeholder="" value={vitalInformation.thalch} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="exang">Exang</label>
                    <div className="col-md-12">
                        <input id="exang" name="exang" type="number" placeholder="" value={vitalInformation.exang} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="oldpeak">Exercise Relative To Rest</label>
                    <div className="col-md-12">
                        <input id="oldpeak" name="oldpeak" type="number" placeholder="" value={vitalInformation.oldpeak} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="slope">Slope</label>
                    <div className="col-md-12">
                        <input id="slope" name="slope" type="number" placeholder="" value={vitalInformation.slope} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="thal">The Slope of the Peak Exercise</label>
                    <div className="col-md-12">
                        <input id="thal" name="thal" type="number" placeholder="" value={vitalInformation.thal} onChange={onChange} className="form-control "/>
                    </div>
                </div>


                <div className="form-group mb-3">
                    <label className="col-md-12 control-label" htmlFor="target">Target</label>
                    <div className="col-md-12">
                        <input id="target" name="target" type="number" placeholder="" value={vitalInformation.target} onChange={onChange} className="form-control "/>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <button type={"submit"} className={"btn btn-primary"} onClick={() => saveVitalInformation()}>Submit</button>
                </div>

            </fieldset>

        </div>
    </>);
}

export default VitalInformation;
