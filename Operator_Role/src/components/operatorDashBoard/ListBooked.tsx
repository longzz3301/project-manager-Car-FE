import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Form, List, Select, Space, Table, Tag } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import axios from 'axios';



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



const ListBooked: React.FC = () => {

    const [refresh, setRefresh] = useState<boolean>(false)

    const [listForm, setListForm] = useState([])
    useEffect(() => {
        const getListDriver = async () => {

            const getToken = localStorage.getItem('token')
            const data = await axios.get("http://localhost:8000/api/v1/GetListFormBooked", {
                headers: { Authorization: `Bearer ${getToken}` }
            }).then((response) => {
                const ListDriver = response.data.data
                console.log("ListDriver", ListDriver)
                setListForm(ListDriver.map((d: any, index: number) => {
                    return {
                        stt: index + 1,
                        ...d
                    }
                }))


            })
            

        }
        getListDriver()
        // setRefresh(!refresh)
    }, [refresh])

    const updateStatusForm = async (id:string) => {
        const data = id
        const getToken = localStorage.getItem('token')

        const updateStatus = await axios.put(`http://localhost:8000/api/v1/updateStatusComplete/${data}` , {} , {
            headers : {Authorization :`Bearer ${getToken}`}
        }).then(response => {
            console.log(response)
        })
        // console.log(data)
        setRefresh(!refresh)

    }

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const filterOption = (input: string, option: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());



        return (
            <div style={{ display: 'flex', flexDirection: 'column', margin: "10px 40px 40px 40px", width: '1400px', height: '300px' }}>
              <h2 style={{ marginBottom: '50px' }}>List Booked Form</h2>
              <Table style={{ width: '100%', height: '300px' }} columns={[{
                title: 'STT',
                dataIndex: 'stt',
                key: 'stt',
        
              },
              {
                title: "id Form",
                dataIndex: 'id'
        
              },
              {
                title: "Driver book",
                dataIndex: 'driverName'
        
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
                title: "Update Status",
                render: (_, record) => {
                  return (
                    <>
                      <Button type="primary" onClick={() => {
                        updateStatusForm(record._id)
                       
        
                      }}>Complete</Button>
                    </>
                  )
                }
              },
        
           ]} dataSource={listForm} />
              
            </div>
          )
        
        }

export default ListBooked;