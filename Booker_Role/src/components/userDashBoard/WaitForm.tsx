import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';


import { DatePicker , Button } from 'antd';
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
    title: 'People',
    dataIndex: 'number_people',
    


  },
  {
    title: 'status',
    key: 'status',
    dataIndex: 'status',
    render: (text, record: any) => {
        let color = '';
        if (record.status.toString() === 'COMPLETE_FORM') {
            color = 'green';
        } else if (record.status.toString() === 'CANCEL_FORM') {
            color = 'red';
        } else if (record.status.toString() === 'APPROVED') {
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
  // {
  //   title: 'Driver',
  //   dataIndex: 'driver',
  //   // key: 'Driver',

  // },
  {
    title:"Reason Travel" ,
    dataIndex: 'reason'
  }


];






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
  const [time, setTime] = useState<any>([])

  useEffect(() => {


    getData(time)

  }, [time ])




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


  const ondate = (
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

  const onday = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };


  // const App: React.FC = () => (
  //   <Space direction="vertical" size={12}>
  //     <DatePicker showTime onChange={onChange} onOk={onOk} />

  //   </Space>
  // );


  const [viewDetail , setViewDetail] = useState(false)

  const handleDetail = (stt:number) => {
    setViewDetail(true)
    console.log(stt)
  }
  console.log("viewDetail" , viewDetail)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: "10px 20px 20px 20px", width: '1250px', height: '300px' }}>

      <h2 style={{ marginBottom: '50px' }}>Form Waiting </h2>
      <div>Search Form by time_schedule : &emsp;<RangePicker
        style={{ marginBottom: "30px" }}
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={ondate}
        onOk={onday}
      /></div>
      <div>Search Form by date form : &emsp;<RangePicker
        style={{ marginBottom: "30px" }}
        showTime={{ format: 'HH:mm' }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
      /></div>
      <Table style={{ width: '100%', height: '300px' }} columns={columns} dataSource={dataForm} />
    </div>
  )

}



export default WaitForm;

{/* <Modal
          title="Edit Driver   "

          visible={newDriver}
          okText="update"
          onCancel={() => {
            setNewDriver(false)
          }}
          onOk={handleUpdate}






        >


          <Input

            value={`name : ${editDriver.Name_of_driver}`}
          />

          <Input onChange={(e) => {
            setEditDriver((pre) => {
              return { ...pre, name_of_Cars: e.target.value }
            })

          }}
            value={editDriver.name_of_Cars}>

          </Input>

          <Input onChange={(e) => {
            setEditDriver((pre) => {
              return { ...pre, type_of_cars: e.target.value }
            })
          }}
            value={editDriver.type_of_cars || ""}>

          </Input>

          <Input onChange={(e) => {
            setEditDriver((pre) => {
              return { ...pre, cars_template: e.target.value }
            })
          }}
            value={editDriver.cars_template || ""}>


          </Input>

          <Input onChange={(e) => {
            setEditDriver((pre) => {
              return { ...pre, phone: e.target.value }
            })
          }}
            value={editDriver.phone || ""}>


          </Input>
        </Modal> */}