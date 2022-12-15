import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from "@apollo/client";

import Header from '../Header';
import Button from 'react-bootstrap/Button'

// GraphQL Query to get tip
const GET_TIP = gql`
    query getTip($_id: String!) {
        tip(id: $_id) {
            _id
            message
            createdBy
        }
    }
`;

// GraphQL Query to delete tip
const DELETE_TIP = gql`
    mutation DeleteTip($_id: String!) {
        deleteTip(id: $_id) {
            _id
        }
    }
`;

function TipDetails() {
    let { id } = useParams();
    let navigate = useNavigate();

    // Hook to store tip details
    const [tip, setTip] = useState('');

    // Hook to get tip using apollo's useQuery
    const { data: getTipData, loading: getTipLoading, error: getTipError } = useQuery(GET_TIP, { variables: { _id: id } })

    // fetch tip details
    useEffect(() => {
        if (getTipData) {
            setTip(getTipData.tip)
        }
    }, [getTipData])

    // Hook to get tip using apollo's useQuery
    const [deleteTip, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TIP, { variables: { _id: id } })


    if (getTipLoading) return <p>Loading Tip...</p>;
    if (deleteLoading) return <p>Deleting Tip...</p>;
    if (getTipError) return <p>Error Loading Tip:  ${getTipError.message}</p>;
    if (deleteError) return <p>Error deleting Tip:  ${deleteError.message}</p>;

    // Delete tip and navigate
    const deleteAndRedirect = (id) => {
        deleteTip(id)
        navigate('/tips')
    }

    // Navigate to Edit page
    const editTip = (id) => { navigate('/tips/edit/' + id) }

    const back = () => {
        navigate('/tips')
    }

    return (
        <>
            <Header />
            <div className='w-50 m-auto mt-3'>
                <Button className="btn btn-primary" onClick={back}>
                    Back to Tips
                </Button>
                <h1 className='text-center m-2'>Tip Details</h1>

                <div><b>Message:</b> {tip.message}</div>
                <div><b>Created By:</b> {tip.createdBy}</div>

                <Button className="btn btn-success m-3" onClick={() => { editTip(tip._id) }}>
                    Edit Tip
                </Button>
                <Button className="btn btn-danger m-3" onClick={() => { deleteAndRedirect(tip._id) }}>
                    Delete
                </Button>
            </div>
        </>
    )
}

export default TipDetails