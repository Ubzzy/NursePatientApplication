import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { gql, useQuery } from "@apollo/client";

import Header from "../Header";

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

// GraphQL Query to get all tips
const GET_TIPS = gql`
    query getAlltips{
        tips {
            _id
            message
            createdBy
        }
    }
`;

function ListTips() {
    let navigate = useNavigate();

    // Hook to store all tip data
    const [tips, setTips] = useState([])

    // Hook to get data using apollo's useQuery
    const { loading: tipsLoading, error: tipsError, data: tipsData, refetch } = useQuery(GET_TIPS)

    // Fetch and store tips on initial load
    useEffect(() => {
        refetch()
        if (tipsData) {
            setTips(tipsData.tips)
        }
    }, [tipsData])
    // Navigation Routes
    const tipDetails = (id) => { navigate('/tips/details/' + id) }
    const addTip = () => { navigate('/tips/add') }

    // Return table of tips
    return (
        <>
            <Header />
            <h1 className='text-center m-2'>List of all tips</h1>
            <div className='m-5'>
                <Button variant="primary" className='mb-2' onClick={addTip}>
                    Add Tip
                </Button>
                <Table className='table' hover>
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Message</th>
                            <th scope="col">Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tips.map((tip) => (
                            <tr key={tip._id} onClick={() => { tipDetails(tip._id) }}>
                                <td>{tip.message}</td>
                                <td>{tip.createdBy}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ListTips