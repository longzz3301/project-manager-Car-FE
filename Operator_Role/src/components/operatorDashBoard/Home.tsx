import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Col, DatePicker, DatePickerProps, Divider, List, Modal, Radio, Row, Select, Space, Table, Tag } from 'antd';
import { LockOutlined, UserOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UserAddOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import BookedForm from 'components/userDashBoard/BookedForm';
import { id } from 'date-fns/locale';
import { RangePickerProps } from 'antd/es/date-picker';


interface DataType {
  create_at: Date;
  key: string;
  name: string;
  end_time: Date;
  start_time: Date;
  stt: number;
  status: string[];
  _id: string

  // age: number;
  address: string;
  driver: string;
  number_people: number;
  start_location: string;
  end_location: string;

}

interface info {
  _id: string
  Name_of_driver: string
  date_of_birth: Date

  name_of_Cars: string

  type_of_cars: string
  cars_template: string
  phone: string
  email: string
}


const columns: ColumnsType<DataType> = [

];




const CompleteForm: React.FC = () => {

  const [refresh, setRefresh] = useState<boolean>(false)


  // const AddCars = (_id: string, start_time: DataType, end_time: DataType) => {

  //   useEffect(() => {
  //     const ListCarReady = async () => {
  //       const getToken = localStorage.getItem("token")
  //       const ListCar = await axios.get("http://localhost:8000/api/v1/", {
  //         headers: { Authorization: `Bearer ${getToken}` }
  //       }).then((respone) => {
  //         const DriverReady = respone.data
  //       })
  //     }

  //   }, [refresh])

  //   setModalCar(true)

  // }

  const [info, setInfo] = useState<info[]>([])
  const [getidForm , setGetidForm] = useState<any>()



  const ListDriverReady = async (id: string, start_time: any, end_time: any) => {
    console.log("start_time", start_time)
    setGetidForm(id)
   
    const data = {
      start: new Date(start_time).getTime(),
      end: new Date(end_time).getTime()
    }
    
    console.log(data)
    const getToken = localStorage.getItem("token")
    const ListCar = await axios.post("http://localhost:8000/api/v1/getListDriversAndCarsReady", data, {
      headers: { Authorization: `Bearer ${getToken}` }
    })
    const dataDriver = ListCar.data.data

    // console.log("dataDriver" , dataDriver)
    setRefresh(!refresh)
    setModalCar(true)
    setInfo(dataDriver)

  }

  const [modalCar, setModalCar] = useState<boolean>(false)

  console.log("info", info)


  const [dataForm, setDataForm] = useState([])

  const [time, setTime] = useState<any>([])

  useEffect(() => {
    const getData = async (time : any) => {
      const reqData = {
        start: new Date(time[0]).getTime(),
        end: new Date(time[1]).getTime(),

    }
      const getToken = localStorage.getItem('token')
      const data = await axios.post("http://localhost:8000/api/v1/getListFormApproved",reqData , {
        headers: { Authorization: `Bearer ${getToken}` }
      }).then((response) => {
        const dataForm = response.data.data
        // console.log('dataForm', dataForm)
        setDataForm(dataForm.map((d: any, index: number) => {
          return {
            stt: index + 1,
            ...d
          }


        }))
      })
    }

    setInterval(async () => {
      await getData(time)
  }, 3000)
    getData(time)

  }, [time])

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const style: React.CSSProperties = { background: '#0092ff', padding: '8px 0' };

  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const handleDriverSelection = (driverId: any) => {
    setSelectedDriverId(driverId);
  };

  console.log("driver Id :", selectedDriverId)
  


  const AddCarstoFOrm = async () => {


    // const idForm = getidForm 
    const getToken = localStorage.getItem('token')
    const id = getidForm
    console.log(id)
    const idDriver = selectedDriverId 

    const AddCars = await axios.put(`http://localhost:8000/api/v1/addCarsForm/${id}` , {DriverId: idDriver} , {
      headers: { Authorization: `Bearer ${getToken}` }

    }).then((response) => {
     const res = response.data

    });
    // const response = AddCars.data
    // console.log(response)



    setModalCar(false)
    setRefresh(!refresh)


    
   

  }


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

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
      <DatePicker showTime onChange={onChange} onOk={onOk} />

  </Space>
);
 
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: "10px 40px 40px 40px", width: '1400px', height: '300px' }}>
      <h2 style={{ marginBottom: '50px' }}>List Apprved Form</h2>

      <div>Search Form by time_schedule : &emsp;<RangePicker
                style={{ marginBottom: "30px" }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOk}
            /></div>
            <div>Search Form by date form : &emsp;<RangePicker
                style={{ marginBottom: "30px" }}
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={onChange}
                onOk={onOk}
            /></div>
      
      <Table style={{ width: '100%', height: '300px' }} columns={[{
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',

      },
      {
        title: "id Form",
        dataIndex: '_id'

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
        title: 'People',
        dataIndex: 'number_people',
        key: 'number_people',


      },


      {
        title: 'status',
        // key: 'status',
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

      {
        title: "Driver & Booked",
        render: (_, record) => {
          return (
            <>
              <Button  style={({ color: "green", marginRight:3 })}  onClick={() => {
                ListDriverReady(record._id, record.start_time, record.end_time)

              }}>  <CheckCircleOutlined />AddCars & Booked</Button>
            </>
          )
        }
      },

      {
        title: "Action",
        render: (_, record) => {
          return (
            <>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                
                <Button style={({ color: "red", marginLeft: 12 })} onClick={() => {
                  // CancelForm(record._id)
                  // setRefresh(!refresh)
                }}>
                  <CloseCircleOutlined />
                  Cancel
                </Button>
              </div>
            </>

          )
        }
      }





        ,]} dataSource={dataForm} />
      <Modal
        title={<div> <UserAddOutlined />  Add Cars to Form  </div>}
        open={modalCar}
        cancelText="Cancel"
        okText="Add"

        onCancel={() => {
          setModalCar(false)

        }}
        onOk={(getidForm) => {
          AddCarstoFOrm()
          
        }}
      >
        <List
          itemLayout="horizontal"
          dataSource={info}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta style={{ width: "500px" }}




                title={<div style={{ width: "500px" }}>{item.Name_of_driver}


                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }} >
                    <div style={{ width: "350px" }} >
                      <h6>Name_Cars : {item.name_of_Cars}</h6>
                      <h6>cars_template : {item.cars_template}</h6>
                      <h6>phone: {item.phone}</h6>
                    </div>
                    <div style={{ width: "350px" }}>
                      <h6>Email: {item.email}</h6>
                      <h6> type of Cars : {item.type_of_cars}</h6>
                      <h6>Driver_id : {item._id}</h6>
                      {/* <h6>{item.Name_Cars}</h6> */}


                    </div>
                  </div>
                  {/* style={{display:"flex" ,flexDirection:"row"}} */}
                  {/* style={{display:"flex" , alignItems:'center' }} */}

                </div>}



              />

              <Radio
                value={item._id} // Sử dụng _id của tài xế làm giá trị của Radio
                checked={selectedDriverId === item._id} // Kiểm tra xem tài xế này có được chọn không
                onChange={() => handleDriverSelection(item._id)} // Xử lý sự kiện khi người dùng thay đổi lựa chọn
              />


            </List.Item>

          )}


        />



      </Modal>
    </div>
  )

}

export default CompleteForm;


