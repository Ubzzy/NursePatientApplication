import React, {useState} from "react";
import Header from "../Header";
import {useNavigate} from "react-router-dom";
import {gql, useMutation} from '@apollo/client';

const ADD_DAILY_INFORMATION = gql`
    mutation AddVitalInformation(
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

function VitalInformation() {

    const [vitalInformation, setVitalInformation] = useState({
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

    const [AddVitalInformation, {data, loading, error}] = useMutation(ADD_DAILY_INFORMATION);


    const navigate = useNavigate();

    const onChange = (e) => {
        e.persist();
        setVitalInformation({...vitalInformation, [e.target.name]: e.target.value});
    };

    async function saveVitalInformation() {
        console.log(vitalInformation)
        if (!vitalInformation.cp || !vitalInformation.trestbps) {
            alert("Enter valid information");
            return;
        }
        await AddVitalInformation({variables: vitalInformation})
        backToDashboard();
    }

    function backToDashboard() {
        navigate("/dashboard");
    }


    return (<>
        <Header/>

        
            <fieldset>
                <h1 className="text-center m-5">Vital Information</h1>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="cp">CP</label>
                    <div className="col-md-12">
                        <input id="cp" name="cp" type="text" placeholder="" value={vitalInformation.cp} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="trestbps">Tres BPS</label>
                    <div className="col-md-12">
                        <input id="trestbps" name="trestbps" type="text" placeholder="" value={vitalInformation.trestbps} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="chol">Chol</label>
                    <div className="col-md-12">
                        <input id="chol" name="chol" type="text" placeholder="" value={vitalInformation.chol} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="fps">Fps</label>
                    <div className="col-md-12">
                        <input id="fps" name="fps" type="text" placeholder="" value={vitalInformation.fps} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="restecg">restecg</label>
                    <div className="col-md-12">
                        <input id="restecg" name="restecg" type="text" placeholder="" value={vitalInformation.restecg} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="thalch">thalch</label>
                    <div className="col-md-12">
                        <input id="thalch" name="thalch" type="text" placeholder="" value={vitalInformation.thalch} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="exang">exang</label>
                    <div className="col-md-12">
                        <input id="exang" name="exang" type="text" placeholder="" value={vitalInformation.exang} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="oldpeak">oldpeak</label>
                    <div className="col-md-12">
                        <input id="oldpeak" name="oldpeak" type="text" placeholder="" value={vitalInformation.oldpeak} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="slope">slope</label>
                    <div className="col-md-12">
                        <input id="slope" name="slope" type="text" placeholder="" value={vitalInformation.slope} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="thal">thal</label>
                    <div className="col-md-12">
                        <input id="thal" name="thal" type="text" placeholder="" value={vitalInformation.thal} onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>


                <div className="form-group">
                    <label className="col-md-12 control-label" htmlFor="target">target</label>
                    <div className="col-md-12">
                        <input id="target" name="target" type="text" placeholder="" value={vitalInformation.target}
                               onChange={onChange}
                               className="form-control "/>
                    </div>
                </div>


                <div className="form-group">
                    <button type={"submit"} className={"btn btn-primary"} onClick={() => saveVitalInformation()}>submit</button>
                </div>

            </fieldset>


      


    </>);
}

export default VitalInformation;
