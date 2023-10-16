import React, { useEffect, useState } from 'react';
import { Button, Modal, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';

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



];








const BookedForm: React.FC = () => {
  const [dataForm, setDataForm] = useState([])

  const [openModal, setOpenModal] = useState<boolean>(false)

  const [info, setInfor] = useState<any>({})
  console.log("info", info)

  const inforDriver = async (id: string) => {
    const getToken = localStorage.getItem('token')

    const data = await axios.get(`http://localhost:8000/api/v1/getInfoDriver/${id}`, {
      headers: { Authorization: `Bearer ${getToken}` }
    }).then((response) => {
      const Driver = response.data
      setInfor(Driver)
      console.log(Driver)
    })



    setOpenModal(true)

  }


  useEffect(() => {
    const getData = async () => {
      const getToken = localStorage.getItem('token')
      const data = await axios.get("http://localhost:8000/api/v1/getBookedForm", {
        headers: { Authorization: `Bearer ${getToken}` }
      }).then((response) => {
        const dataForm = response.data.data
        console.log('dataForm', dataForm)
        setDataForm(dataForm.map((d: any, index: number) => {
          return {
            stt: index + 1,
            ...d
          }

        }))
      })
    }
    getData()
    // console.log('data :', dataForm)

  }, [])


  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: "10px 20px 20px 20px", width: '1340px', height: '300px' }}>
      <h2 style={{ marginBottom: '50px' }}>Booked Form</h2>
      <Table style={{ width: '100%', height: '300px' }} columns={[
        {
          title: 'STT',
          dataIndex: 'stt',
          key: 'stt',

        },
        {
          title: 'ID Form',
          dataIndex: '_id',
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
          key: 'start_time',


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
        {
          title: "Driver",
          render: (_, record) => {
            return (
              <>

                <Button style={{ backgroundColor: "primary" }} type="primary" onClick={() => inforDriver(record._id)}> Infor Driver </Button>


              </>
            )
          }
        }
      ]} dataSource={dataForm} />

      <Modal

        open={openModal}
        onCancel={() => {
          setOpenModal(false)
        }}
        onOk={() => {
          setOpenModal(false)
        }}
        title="Driver Information"

      >
        <h3>Name of Driver : {info.Name_of_driver}</h3>
        <br/>
        <p>Name_of_Cars: {info.name_of_Cars} </p>
        <p>Cars_template: {info.cars_template}</p>
        <p>Type_of_cars {info.type_of_cars}</p>
        <p>Date_of_birth : {info.date_of_birth}</p>
        <p>Phone Number : {info.phone}</p>
        

      </Modal>

    </div>


  )

}

export default BookedForm;