
import "./Formbooking.css"
import axios from 'axios';

import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import { tokenToString } from "typescript";
import { verify } from "crypto";
import { config } from "process";



const BookingForm: React.FC = () => {
    const onFinish = async (values: any) => {
        console.log(values)
        const dataa = {
            start_time: new Date(values.time_schedule[0]).getTime(),
            end_time: new Date(values.time_schedule[1]).getTime(),
            start_location: values.start_location,
            end_location: values.end_location,
            number_people: values.number_people,
            reason: values.reason

        }
        console.log(dataa)
        const getToken = localStorage.getItem('token')
        console.log(getToken)
        // const check= verify(getToken)
        const { data } = await axios.post("http://localhost:8000/api/v1/bookingCar ", dataa, {
            headers: { Authorization: `Bearer ${getToken}` }
        });
        console.log(data)


    };
    // useEffect(() => {

    // }, [])

    const { RangePicker } = DatePicker;

    return (
        <div style={{display:"flex" , flexDirection:"row"}}>
            <div style={{}}>
            
                <h1 style={{display:"flex" , justifyContent:"center" , alignContent:'center', marginBottom:"60px"}}>Form Booking </h1>
                <Form
                    name="form-booking"
                    className="form-booking"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}

                >

                    <Form.Item
                        style={{ width: "540px"  }}
                        name="time_schedule"
                        label="time_schedule"
                    // tooltip="What do you want others to call you?"
                    // rules={[{ required:false , message: 'Please input your start_location!', whitespace: false }]}
                    >
                        <RangePicker showTime />
                    </Form.Item>



                    <Form.Item
                        style={{ width: "540px" }}
                        name="start_location"
                        label="start_location"
                        // tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your start_location!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ width: "540px" }}
                        name="end_location"
                        label="end_location"
                        // tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your end_location!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ width: "540px" }}
                        name="number_people"
                        label="number_people"
                        // tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input number_people!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>






                    <Form.Item
                        style={{ width: "540px" }}
                        name="reason"
                        label="reason"
                        // tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your reason!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item  style={{ display: "flex", justifyContent:"center" }} >
                        <Button type="primary" htmlType="submit" style={{ marginTop: "35px"}}>
                            Submit
                        </Button>
                        
                    </Form.Item>

                </Form>


            </div>
            <div style={{marginLeft:"50px" }}> 
            <h2 style={{display:"flex" , alignItems:"center" , justifyContent:"center" , margin:'10px'}}> car office headquarters </h2>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.847239344113!2d105.83605091100569!3d21.038797487352607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba492644da7%3A0xea459e5547b2dc57!2zMmIgUC4gSG_DoG5nIFbEg24gVGjhu6UsIFF1w6FuIFRow6FuaCwgSG_DoG4gS2nhur9tLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1692434186670!5m2!1svi!2s"  style={{width: "550px", height: "400px" , marginLeft:"90px"   }}></iframe></div>
        </div>
    );
};

export default BookingForm
    ;
