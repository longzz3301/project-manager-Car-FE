import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import BookedForm from 'components/userDashBoard/BookedForm';

interface DataType {
  create_at: Date ;
  key: string;
  name: string;
  end_time: Date ;
  start_time:Date ;
  stt:number;
  status:string[];

  // age: number;
  address: string;
  driver:string ;
  number_people:number;
  start_location:string;
  end_location: string ;
 
}


const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    key: 'stt',
    
  },
  {
    title: 'Date of Form ',
    dataIndex: 'create_at',
    // key: 'DateForm',
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    key: 'Start_Time',
    
    
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    key: 'End_ Time',
  },
  {
    title: 'Start Location',
    dataIndex: 'start_location',
    key: 'Start_Location',
    
    
  },
  {
    title: 'End Location',
    dataIndex: 'end_location',
    key: 'End_Location',
  },
  {
    title: 'Number People',
    dataIndex: 'number_people',
    key: 'number_people',
    
    
  },
  {
    title: 'Driver',
    dataIndex: 'driverName',
    key: 'Driver',
    
  },
  
  {
    title: 'status',
    key: 'status',
    dataIndex: 'status',
    render: (text, record) => {
      let color = '';
      if (record.status.toString() === 'COMPLETE_FORM') {
        color = 'green';
      } else if (record.status.toString() === 'CANCEL_FORM') {
        color = 'red';
      } else if(record.status.toString() === 'APPROVED') {
        color = 'volcano'; // Màu mặc định nếu không khớp với "COMPLETE" hoặc "Cancel"
      } else if (record.status.toString() === 'BOOKED_FORM') {
        color = 'yellow'
      } else {
        color = 'blue'
      }
  
      return (
        <Tag color={color}>
          {record.status.toString().toLocaleUpperCase()}
        </Tag>
      );
    },
  },
  
  
  
  
  
  
  
 
  
];
// {status.map((status :any) => {
//     let color = status.length > 5 ? 'geekblue' : 'green';
//     if (status === 'loser') {
//       color = 'volcano';
//     }
//     return (
//       <Tag color={color} key={status}>
//         {status.toUpperCase()}
//       </Tag>
//     );
//   })}





 

const CompleteForm: React.FC = () => {
  const [dataForm , setDataForm] = useState([])

  useEffect(() => {
    const getData = async () => {
      const getToken = localStorage.getItem('token')
      const data = await axios.get("http://localhost:8000/api/v1/GetListFormComplete" , {
        headers: { Authorization: `Bearer ${getToken}` }
      }).then((response) => {
        const dataForm = response.data.data
        console.log('dataForm' , dataForm)
        setDataForm(dataForm.map((d:any , index:number) =>{
          return {
            stt:index +1 ,
            ...d 
          }
          
        }))
      })
    }
    getData()
    console.log('data :' , dataForm)

  },[])


  return(
    <div style={{display:'flex' , flexDirection:'column' , margin:"20px 50px 50px 50px", width:'1340px' , height:'300px'}}> 
      <h2 style={{marginBottom:'50px'}}>Complete Form</h2>
      <Table style={{width:'100%' , height:'300px' }} columns={columns} dataSource={dataForm} />
    </div>
  )

} 

export default CompleteForm;