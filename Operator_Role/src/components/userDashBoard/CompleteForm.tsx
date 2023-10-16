import React , { useEffect , useState} from 'react';
import { Button, Space, Table, Tag } from 'antd';
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
    // key: 'stt',
    
  },
  {
    title: 'Date of Form ',
    dataIndex: 'create_at',
    // key: 'DateForm',
  },
  {
    title: 'Start Time',
    dataIndex: 'start_time',
    // key: 'Start_Time',
    
    
  },
  {
    title: 'End Time',
    dataIndex: 'end_time',
    // key: 'End_ Time',
  },
  {
    title: 'Start Location',
    dataIndex: 'start_location',
    // key: 'Start_Location',
    
    
  },
  {
    title: 'End Location',
    dataIndex: 'end_location',
    // key: 'End_Location',
  },
  {
    title: 'Number People',
    dataIndex: 'number_people',
    // key: 'number_people',
    
    
  },
  {
    title: "Actions",
    render: (_, record) => {
      return (
        <>
          <Button onClick={Onclickk} type='primary' >View Detail</Button>
        </>
      )
    }
  }
 
  
];

const Onclickk = () => {
  console.log(123)
}


// const data: DataType[] = [
//   { 
    
//     key: 'string',
//   name: 'string',
 


//   // age: number;
//   address: 'string',
//   driver:'string' ,
//   number_people:1,
//   Start_Location:'string',
//   End_Location: 'string' ,
//   }
// ];


const CompleteForm: React.FC = () => {
  let dataa: DataType[] = [];
  


  const [data , setData] = useState([])
  
  
  useEffect(() => {
    const getData = async () => {
      const getToken = localStorage.getItem('token')
      
      const data = await axios.get("http://localhost:8000/api/v1/getCompleteForm" , {
        headers: { Authorization: `Bearer ${getToken}` }
    }).then((response) => {
        console.log('response' , response)
        const getCompleteForm = response.data.data
        console.log('getCompleteForm :' , getCompleteForm)
        dataa = getCompleteForm
        setData(getCompleteForm.map((d: any, index: number) => {
          return {
            stt: index +1,
            ...d
          }
        }))
        
       
        
      })
      
     console.log('getData', dataa)
     
     
    }
    getData()
    
    
    

  } ,[])
  

  return(
    <div style={{display:'flex' , flexDirection:'column' , margin:"10px 20px 20px 20px", width:'1250px' , height:'300px'}}> 
      <h2 style={{marginBottom:'50px'}}>Complete Form</h2>
      <Table style={{width:'100%' , height:'300px' }} columns={columns} dataSource={data} />
    </div>
  )

} 



export default CompleteForm;