import React, { useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import { Line } from 'react-chartjs-2';

import styles from '../Chart/Chart.module.css';

const Chart = () => {
    const [dailyData, setDailyData] = useState([]);

    
    useEffect ( () => {
        const fetchApi = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        } 
        
        fetchApi();
        //console.log(dailyData);
    });

   
    const lineChart = (
        // check if data fetched or not
        //{confirmed_data} =  dailyData.map(({ date }) => date)
        

        dailyData.length ? 
        (
            <Line
                data = {{
                    // label and dataset needs to be an array
                    // destructure date and return it
                    label: dailyData.map(({ date }) => date).values,
                   // label: [12,32,32,345,455],
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    },
                    {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        fill: true,
                        backgroundColor: 'rgba(255,0,0,0.5)',

                    } ],
                }}
            />
        ) :
        null
    );
    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    );
};

export default Chart;
