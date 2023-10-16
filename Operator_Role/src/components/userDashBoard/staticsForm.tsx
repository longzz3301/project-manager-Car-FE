import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    // title: {
    //   display: true,
    //   text: 'Chart.js Bar Chart',
    // },
  },
};
// const StaticsData = await axios.get()

const labels = [ 'January','February', 'March', 'April', 'May', 'June', 'July' , 'August' , 'September' , 'October' , 'November' , 'December'];









export function StaticsForm() {
  const [statics , setStatics] = useState<any>({})
  // const [refresh, setRefresh] = useState<boolean>(false)

  function SetDataStatics () {
  
    useEffect(() => {
      const GetDataInfo = async () => {
        const getToken = localStorage.getItem('token')
        const data = await axios.get("http://localhost:8000/api/v1/getStactics" ,{
          headers: { Authorization: `Bearer ${getToken}` }
  
        }).then((response) => {
          const data = response.data
          console.log("Statics :" , data)
          setStatics(data)
        })
      }
      
    
      GetDataInfo()
      
      
    },[])
  
    
    
  
    return statics
    
  }
  
  SetDataStatics()
  

   const data = {
  
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data:statics,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  console.log('dataFake', data)
  console.log('statics' , statics)
  

  // console.log('dataFake2', data)
 
  

  return (
    <div>
      <h1 style={{display:'flex' , alignItems:"center" , justifyContent:'center' , marginBottom:'50px'}}>business trip statistics</h1>
      <Bar style={{width:"1100px" , height:"600px" , marginLeft:"80px"}} options={options} data={data} />
    </div>

  )
}
