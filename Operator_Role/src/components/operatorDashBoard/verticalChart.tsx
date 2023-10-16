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
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['']



// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export function VerticalBarChart() {

  const [driver, setDriver] = useState<any>()
  const [chartData, setChartData] = useState<any>({
    labels,
    datasets: [
      {
        label: 'total Form  complete',
        data:  labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Number Kilometers ',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  })



  useEffect(() => {
    const getDataDriver = async () => {
      const getToken = localStorage.getItem('token')
      const data = await axios.get("http://localhost:8000/api/v1/getStaticDriver", {
        headers: { Authorization: `Bearer ${getToken}` }
      }).then((response) => {
        const data = response.data.data || []
        const DataStatics = response
        // const DriverName = data.map((name:any) =>name.Name_of_driver )
        // console.log("data :" , data )
        setDriver(data)
        const labelList = response.data.data.map((d: any) => d.name)
        
        console.log("labelList: ", labelList)
        console.log("DataStatics: ", DataStatics)
        setChartData({
          labels: labelList,
          datasets: [
            {
              label: 'Total Form Driver ',
              data: data.map((d: any) => d.formCount),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Total Distances Driver',
              data: data.map((total:any) => total.numberKilometers),
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        })
      })
    }
    getDataDriver()
  }, [])

  console.log("driver:", driver)

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };
  return <Bar options={options} data={chartData} />;
}
