import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

interface DataType {
  create_at: Date ;
  key: string;
  name: string;
  end_time: Date ;
  start_time:Date ;
  stt:number;

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
    dataIndex: 'Start_Time',
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
    dataIndex: 'driver',
    key: 'Driver',
    
  },
 
  
];

const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     number_people: 32,
//     address: 'New York No. 1 Lake Park',
//     driver : 'Nguyen Van B' ,
//     Start_Location:'cau giay',
//     End_Location:'my dinh '
 
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     number_people: 42,
//     address: 'London No. 1 Lake Park',
//     driver : 'Nguyen Van A',
//     Start_Location:'cau giay',
//     End_Location:'1231my dinh '
   
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     number_people: 32,
//     address: 'Sydney No. 1 Lake Park',
//     driver : 'Nguyen Van C',
//     Start_Location:'1231cau giay',
//     End_Location:'my dinh '
   
//   },
//   {
//     key: '4',
//     name: 'Jim Green',
//     number_people: 42,
//     address: 'London No. 1 Lake Park',
//     driver : 'Nguyen Van A',
//     Start_Location:'cau giay',
//     End_Location:'1231my dinh '
   
//   },
//   {
//     key: '5',
//     name: 'Jim Green',
//     number_people: 42,
//     address: 'London No. 1 Lake Park',
//     driver : 'Nguyen Van A',
//     Start_Location:'cau giay',
//     End_Location:'1231my dinh '
   
//   },
//   {
//     key: '6',
//     name: 'Jim Green',
//     number_people: 42,
//     address: 'London No. 1 Lake Park',
//     driver : 'Nguyen Van A',
//     Start_Location:'cau giay',
//     End_Location:'1231my dinh '
   
//   },
//   {
//     key: '7',
//     name: 'Jim Green',
//     number_people: 42,
//     address: 'London No. 1 Lake Park',
//     driver : 'Nguyen Van A',
//     Start_Location:'cau giay',
//     End_Location:'1231my dinh '
   
//   },
//   {
//     key: '8',
//     name: 'Jim Green',
//     number_people: 42,
//     address: 'London No. 1 Lake Park',
//     driver : 'Nguyen Van A',
//     Start_Location:'cau giay',
//     End_Location:'1231my dinh '
   
//   },


 ];


 

const CancelForm: React.FC = () => {
  const [dataForm , setDataForm] = useState([])

  useEffect(() => {
    const getData = async () => {
      const getToken = localStorage.getItem('token')
      const data = await axios.get("http://localhost:8000/api/v1/getCancelForm" , {
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
    <div style={{display:'flex' , flexDirection:'column' , margin:"10px 20px 20px 20px", width:'1250px' , height:'300px'}}> 
      <h2 style={{marginBottom:'50px'}}>Cancel Form</h2>
      <Table style={{width:'100%' , height:'300px' }} columns={columns} dataSource={dataForm} />
    </div>
  )

} 

export default CancelForm;