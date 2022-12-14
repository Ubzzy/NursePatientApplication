import React, {useState, useEffect} from 'react'
import {gql, useQuery} from "@apollo/client";

import Header from "../Header";

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

function DailyTip() {
    // Hook to store all tip data
    const [tips, setTips] = useState([])

    // Hook to store one random daily tip
    const [tip, setTip] = useState('')

    // Hook to get data using apollo's useQuery
    const {loading: tipsLoading, error: tipsError, data: tipsData, refetch} = useQuery(GET_TIPS)

    // Select random tip from DB
    const setRandomTip = () => {
        console.log(tips)
        const length = tips.length
        let randomTip = tips[Math.floor(Math.random() * length)]
        setTip(randomTip?.message)
        console.log("tip: " + JSON.stringify(randomTip))
        console.log("tip: " + randomTip?.message)

    }

    // Fetch and store tips on initial load
    useEffect(() => {
        refetch().then((result) => {
                if (result.data) {
                    setTips(result.data.tips)
                }
            })

    }, [])

    useEffect(() => {
        setRandomTip()
    }, [tips]);

    if (tipsLoading) {
        return <p>Loading Tips...</p>
    }
    if (tipsError) {
        return <p>Error Loading Tips: ${tipsError.message}</p>
    }

    // Return table of tips
    return (
        <>
            <Header/>
            <h1 className='text-center m-2'>Tip Of The Day</h1>
            <h2 className='text-center m-5'>{tip}</h2>
        </>
    )
}

export default DailyTip