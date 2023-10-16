import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';


import { DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';


interface DataType {
  create_at: Date;
  key: string;
  name: string;
  end_time: Date;
  start_time: Date;
  stt: number;

  // age: number;
  address: string;
  driver: string;
  number_people: number;
  start_location: string;
  end_location: string;

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
    // render: (_, record)=> {
    //   return(
    //     <>
    //     <button/>
    //     </>
    //   )}
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
    title: 'Driver',
    dataIndex: 'driver',
    // key: 'Driver',

  },
  {
    title: "Actions",
    render: (_, record) => {
      return (
        <>
          <Button onClick={Onclickk} type='primary'>View Detail</Button>
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


const WaitForm: React.FC = () => {
  let dataa: DataType[] = [];






  const [dataForm, setDataForm] = useState([])
  const getData = async (time: any) => {
    const reqData = {
      start: new Date(time[0]).getTime(),
      end: new Date(time[1]).getTime(),

    }
    const getToken = localStorage.getItem('token')
    const data = await axios.post("http://localhost:8000/api/v1/getFormByDay", reqData, {
      headers: { Authorization: `Bearer ${getToken}` }
    }).then((response) => {
      const dataForm = response.data.data
      console.log(response)
      console.log(dataForm)
      setDataForm(dataForm.map((d: any, index: number) => {
        return {
          stt: index + 1,
          ...d
        }

      }))
    })


    // setDataForm(dataForm)

  }



  const getFormbyDayCreate = async (time: any) => {
    const reqData = {
      start: new Date(time[0]).getTime(),
      end: new Date(time[1]).getTime(),

    }
    const getToken = localStorage.getItem('token')
    const data = await axios.post("http://localhost:8000/api/v1/getFormByDateCreateForm", reqData, {
      headers: { Authorization: `Bearer ${getToken}` }
    }).then((response) => {
      const dataForm = response.data.data
      console.log(response)
      console.log(dataForm)
      setDataForm(dataForm.map((d: any, index: number) => {
        return {
          stt: index + 1,
          ...d
        }

      }))
    })

    
    // setDataForm(dataForm)

  }
  const [time, setTime] = useState<any>([])
  const [dayCreate , setDayCreate] = useState<any>([])

  useEffect(() => {


    getData(time)

  }, [time])




  // useEffect(() => {
  //   const getData = async () => {
  //     const getToken = localStorage.getItem('token')
  //     console.log('getToken', getToken)

  //     const data = await axios.get("http://localhost:8000/api/v1/getFormByDay", {
  //       headers: { Authorization: `Bearer ${getToken}` }
  //     }).then((response) => {
  //       console.log('response', response)
  //       const getCompleteForm = response.data.data
  //       console.log('getCompleteForm :', getCompleteForm)
  //       dataa = getCompleteForm
  //       setData(getCompleteForm.map((d: any, index: number) => {
  //         return {
  //           stt: index + 1,
  //           ...d
  //         }
  //       }))



  //     })

  //     console.log('getData', dataa)


  //   }
  //   getData()




  // }, [])
  
  console.log("time", time)

  const { RangePicker } = DatePicker;
  const onDate = (
    value2: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,

  ) => {
    console.log('setDayCreate: ', value2);
    console.log('Formatted setDayCreate: ', dateString);
    setDayCreate(dateString)
    // getData({
    //   start: new Date(dateString[0]).getTime(),
    // end: new Date(dateString[1]).getTime()
    // })
  };

  const onDate2 = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('input Date 2: ', value);
  };

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,

  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setTime(dateString)
    // getData({
    //   start: new Date(dateString[0]).getTime(),
    // end: new Date(dateString[1]).getTime()
    // })
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };

  const App: React.FC = () => (
    <Space direction="vertical" size={12}>
      <DatePicker showTime onChange={onChange} onOk={onOk} />
      <DatePicker showTime onChange={onDate} onOk={onDate2} />

    </Space>
  );



  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: "10px 20px 20px 20px", width: '1250px', height: '300px' }}>

      <h2 style={{ marginBottom: '50px' }}>Form Waiting </h2>
      <div>Search Form by date form : &emsp;<RangePicker
        style={{ marginBottom: "30px" }}
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
      /></div>
      {/* <div>Search Form by time_schedule : &emsp;<RangePicker
        style={{ marginBottom: "30px" }}
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onDate2}
        onOk={onDate}
      /></div> */}
      <Table style={{ width: '100%', height: '300px' }} columns={columns} dataSource={dataForm} />
    </div>
  )

}



export default WaitForm;