import React, { useState, useEffect} from 'react';
import {fetchDailyData  } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from '../Chart/Chart.module.css';

const Chart = ({ data, country }) => {
    const [dailyData, setDailyData] = useState([]);
   
    useEffect ( () => {
        const fetchApi = async () => {
            const dailyData = await fetchDailyData();
            setDailyData(dailyData);
        } 
        
        fetchApi();

    },[]);

    const lineChartData = {
        labels: dailyData.map(({ date }) => date),
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
      }
       
     
    
    return (
        <div className={styles.container}>
         {/* check if data fetched or not */}
        { country ? (
            <Bar data={{
              labels:['Infected','Recovered','Deaths'],
        datasets: [{
                      label: 'People',
                      backgroundColor: [
                        'rgba(0,0,255,0.5)',
                        'rgba(0,255,0,0.5)',
                        'rgba(255,0,0,0.5)'
                      ],
    
                      data: [data.confirmed.value,data.recovered.value,data.deaths.value]
                    } ],
        options: [{
            legend: {display: false},
            title: {display: true, text: `Current state in ${country}`},
        }]
        }}/>) : <Line data={lineChartData}/> }
        </div>
    );
};

export default Chart;
