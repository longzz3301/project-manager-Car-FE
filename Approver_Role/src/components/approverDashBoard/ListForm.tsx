import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Space, Statistic, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { LockOutlined, UserOutlined, EditOutlined, DeleteOutlined, SearchOutlined, CheckCircleOutlined, CalculatorOutlined, FileSearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';


import { DatePicker } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import Alert from 'antd/es/alert/Alert';
// import { id } from 'date-fns/locale';



interface DataType {
    create_at: Date;
    key: string;
    name: string;
    end_time: Date;
    start_time: Date;
    stt: number;
    status: string;

    // age: number;
    address: string;
    driver: string;
    number_people: number;
    start_location: string;
    end_location: string;

}

interface ValueEstimate {
    calculateDistance: number;
    calculateTime: number
}



const WaitForm: React.FC = () => {
    let dataa: DataType[] = [];


    const [refresh, setRefresh] = useState<boolean>(false)


    const [dataForm, setDataForm] = useState([])


    const [startLocation, setStartLocation] = useState("")

    const [endLocation, setEndLocation] = useState("")

    const handleStartLocationChange = (e: any) => {
        setStartLocation(e.target.value);
    };

    const handleEndLocationChange = (e: any) => {
        setEndLocation(e.target.value);
    };


    const [time, setTime] = useState<any>([])

    // useEffect(() => {
    //     const getData = async (time: any) => {


    //         if (time && time.length === 2) {

    //             const reqData = {
    //                 start: new Date(time[0]).getTime(),
    //                 end: new Date(time[1]).getTime(),

    //             }
    //             const getToken = localStorage.getItem('token')
    //             const data = await axios.post("http://localhost:8000/api/v1/getListFormWait", reqData, {
    //                 headers: { Authorization: `Bearer ${getToken}` }
    //             }).then((response) => {
    //                 const data = response.data.data
    //                 const dataForm = response.data.data 
    //                 // console.log(response)
    //                 // console.log(dataForm)
    //                 setDataForm(dataForm.map((d: any, index: number) => {
    //                     return {
    //                         stt: index + 1,
    //                         ...d
    //                     }

    //                 }))
    //             })
    //             getData(time)


    //         }else {
                

    //             const getToken = localStorage.getItem('token')
    //             const data = await axios.get("http://localhost:8000/api/v1/WaitForm" , {
    //                 headers: { Authorization: `Bearer ${getToken}` }
    //             }).then((response) => {
    //                 const data = response.data.data
    //                 const dataForm = response.data.data 
    //                 // console.log(response)
    //                 // console.log(dataForm)
    //                 setDataForm(dataForm.map((d: any, index: number) => {
    //                     return {
    //                         stt: index + 1,
    //                         ...d
    //                     }
                        
    //                 }))
    //             })
                
    //             setInterval(async () => {
    //                 await getData(time)
    //             }, 3000)
                
                
    //         }
            
            
    //     }
        
    //     getData(time)

    // }, [time])

    useEffect(() => {
        const getData = async () => {
            const reqData = {
                start: new Date(time[0]).getTime(),
                end: new Date(time[1]).getTime(),

            }
            console.log("reqData: ", reqData)
            console.log("time: ", time)
            const getToken = localStorage.getItem('token')
            const data = await axios.post("http://localhost:8000/api/v1/getListFormWait", reqData, {
                headers: { Authorization: `Bearer ${getToken}` }
            }).then((response) => {
                const data = response.data.data
                const dataForm = response.data.data
                // console.log(response)
                // console.log(dataForm)
                setDataForm(dataForm.map((d: any, index: number) => {
                    return {
                        stt: index + 1,
                        ...d
                    }

                }))
            })


        }


        setInterval(async () => {
            await getData()
        }, 3000)
        getData()

    }, [])


    const [cancelReason, setCancelReason] = useState<any>();


    const CancelForm = async (id: string) => {

        Modal.confirm({
            title: "Are you sure , you want to Cancel this Form",
            okText: "yes",
            okType: "danger",
            onOk: async () => {
                const getToken = localStorage.getItem('token')
                console.log("cancelReason: ", cancelReason)
                const CancelForm = await axios.patch(`http://localhost:8000/api/v1/cancelStatus/${id}`,
                    { reason: cancelReason },
                    { headers: { Authorization: `Bearer ${getToken}` } })

                console.log(CancelForm)

                setRefresh(!refresh)
            },
            content: (
                <Input
                    placeholder="Enter cancel reason"
                    onChange={(e) => {
                        console.log("value: ", e.target.value)
                        setCancelReason(e.target.value)
                    }}

                />
            ),
        })





    }




    const ApproveForm = async (id: string, start_time: DataType, end_time: DataType) => {
        // Modal(Input)

        Modal.confirm({

            title: "Are you sure to Approver this Form",
            okText: "yes",

            okType: "primary",
            onOk: async () => {
                const getToken = localStorage.getItem('token')
                const deleteDriver = await axios.put(`http://localhost:8000/api/v1/approvedStatus/${id}`, {}, {
                    headers: { Authorization: `Bearer ${getToken}` }
                }).then(response => {
                    console.log(response)

                    window.location.reload();

                });



            }


        })

    }
    const [idForm, setIdForm] = useState('')

    const onEstimate = async (id: string) => {
        const getIdForm = id
        setIdForm(getIdForm)
        setOnUpdate(true)

    }

    // const [valueEstimate , setValueEstimate ] = useState< ValueEstimate>({})

    const [valueEstimate, setValueEstimate] = useState<any>({})


    const CaculateDistancesAndTime = async (startLocation: string, endLocation: string) => {
        const getLocation = async () => {
            const id = idForm

            const getToken = localStorage.getItem('token')
            const caculateTimeDistance = await axios.put(`http://localhost:8000/api/v1/updateDistanceForm/${id}`, { start_location: startLocation, end_location: endLocation }, {
                headers: { Authorization: `Bearer ${getToken}` }
            }).then(response => {
                console.log(response.data)
                setValueEstimate(response.data)
            })


        }
        getLocation()

        setOnUpdate(false)

        setOnCaculate(true)

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

    const [onUpdate, setOnUpdate] = useState<boolean>(false)


    const [onCaculate, setOnCaculate] = useState<boolean>(false);

    // const [reason, setReason] = useState<boolean>(false)



    //   const [viewDetail , setViewDetail] = useState(false)

    //   const handleDetail = (stt:number) => {
    //     setViewDetail(true)
    //     console.log(stt)
    //   }
    //   console.log("viewDetail" , viewDetail)
    const [getTime, setGetTime] = useState<any>({})

    return (
        <div style={{ display: 'flex', flexDirection: 'column', margin: "0px 10px 10px 10px", width: '1300px', height: '300px' }}>

            <h2 style={{ marginBottom: '50px' }}>Form Waiting </h2>
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
            <Table style={{ width: "1900px", height: '800px' }} columns={[

                {
                    title: 'STT',
                    dataIndex: 'stt',
                    key: 'stt',


                },
                {
                    title: 'Date of Form ',
                    dataIndex: 'create_at',

                },
                // {
                //     title: 'User book ',
                //     dataIndex: 'create_at',

                // },
                {
                    title: 'id Form',
                    dataIndex: '_id',

                },
                // {
                //     title: 'End Time',
                //     dataIndex: 'end_time',

                // },
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
                    title: 'reason',
                    dataIndex: 'reason',
                    // key: 'Start_Time',


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
                    title: "Calculate",
                    render: (_, record) => {
                        return (
                            <>
                                <button style={{ backgroundColor: '#b37feb' }} onClick={() => { onEstimate(record._id); setGetTime({ start_time: record.start_time, end_time: record.end_time }) }}>Estimate distance & time</button>
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
                                    <Button style={({ color: "green", marginLeft: 12 })} onClick={() => {
                                        ApproveForm(record._id, record.start_time, record.end_time)

                                        setRefresh(!refresh)
                                    }}>
                                        <CheckCircleOutlined />
                                        Approver
                                    </Button>
                                    <Button style={({ color: "red", marginLeft: 12 })} onClick={() => {
                                        CancelForm(record._id)
                                        setRefresh(!refresh)

                                    }}>
                                        <DeleteOutlined />
                                        Cancel
                                    </Button>
                                </div>
                            </>

                        )
                    }
                }


            ]} dataSource={dataForm} />


            <Modal
                title="Calculate Distances & Time Travel "

                open={onUpdate}

                centered

                okText="Caculate"
                onCancel={() => {
                    setOnUpdate(false)

                }}
                onOk={() => {
                    CaculateDistancesAndTime(startLocation, endLocation)
                }}


            >
                <Form >
                    <Input addonBefore="* Start_Location" title='Start_Location' placeholder='type Start_Location ' onChange={handleStartLocationChange} value={startLocation} />
                    <br />
                    <br />

                    <Input addonBefore="* End_Location" title='End_Location' placeholder='type End_Location ' onChange={handleEndLocationChange} value={endLocation} />
                </Form>
            </Modal>



            <Modal
                title="Estimate Distances & Time Travel "
                open={onCaculate}
                cancelText="Cancel"
                okText="Save Form"

                onCancel={() => {
                    setOnCaculate(false)
                }}
                onOk={() => {
                    setOnCaculate(false)


                }}
            >
                <Row gutter={15}>
                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Distances Estimate"
                                value={valueEstimate.calculateDistance}
                                precision={2}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<CalculatorOutlined />}
                                suffix="km"
                            />
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Time Estimate "
                                value={valueEstimate.calculateTime}
                                precision={1}
                                valueStyle={{ color: '#3f8600' }}
                                prefix={<CalculatorOutlined />}
                                suffix="s"
                            />
                        </Card>
                    </Col>
                    <Col span={24}>
                        <Card title="Time Start & Time End Form" bordered={false} >
                            <Card>Time start : {getTime.start_time} </Card>
                            <Card>Time End : {getTime.end_time} </Card>
                        </Card>
                    </Col>
                    {/* <Col span={12}>
                        <Card bordered={false}>

                            <Statistic
                                title="Time according to form "
                                value={0}

                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<FileSearchOutlined />}
                                suffix="h"
                            />
                        </Card>
                    </Col> */}
                    {/* <Col span={12}>
                        <Card bordered={false}>
                            <Statistic
                                title="Time according to form "
                                value={0}
                                precision={2}
                                valueStyle={{ color: '#cf1322' }}
                                prefix={<FileSearchOutlined />}
                                suffix="h"
                            />
                        </Card>
                    </Col> */}
                </Row>


            </Modal>


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