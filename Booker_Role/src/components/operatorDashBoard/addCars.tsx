
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, DatePickerProps, Form, Input, Select } from 'antd';
import { tokenToString } from "typescript";
import { verify } from "crypto";
import { config } from "process";

import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  key: React.Key;
  stt: number;
  Name_of_driver: string;
  name_of_Cars: string;
  type_of_cars: number;
  phone: string;

}



const AddCars: React.FC = () => {


  const columns: ColumnsType<DataType> = [
    {
      title: 'stt',
      dataIndex: 'stt',
    },
    {
      title: 'Name_of_driver',
      dataIndex: 'Name_of_driver',
    },
    {
      title: 'name_of_car',
      dataIndex: 'name_of_Cars',
      // sorter: {
      //   compare: (a, b) => a.chinese - b.chinese,
      //   multiple: 3,
      // },
    },
    {
      title: 'type_of_cars',
      dataIndex: 'type_of_cars',
      sorter: {
        compare: (a, b) => a.type_of_cars - b.type_of_cars,
        multiple: 2,
      },
    },
    {
      title: 'cars_template',
      dataIndex: 'cars_template',
      // sorter: {
      //   compare: (a, b) => a.english - b.english,
      //   multiple: 1,
      // },
    },
    {
      title: 'phone_number',
      dataIndex: 'phone',

    },
  ];



  const data: DataType[] = [
    // {
    //   key: '1',
    //   Name_of_driver: 'John Brown',
    //   name_of_Cars: 'asdsd',
    //   type_of_cars: 60,
    //   english: 70,
    // },
    // {
    //   key: '2',
    //   Name_of_driver: 'Jim Green',
    //   name_of_Cars: 'asdsd',
    //   type_of_cars: 66,
    //   english: 89,
    // },
    // {
    //   key: '3',
    //   Name_of_driver: 'Joe Black',
    //   name_of_Cars: 'asdsd',
    //   type_of_cars: 90,
    //   english: 70,
    // },
    // {
    //   key: '4',
    //   Name_of_driver: 'Jim Red',
    //   name_of_Cars: 'asdsd',
    //   type_of_cars: 99,
    //   english: 89,
    // },
  ];

  const onChangee: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };








  const onFinish = async (values: any) => {
    console.log("values", values)
    const dataa = {
      Name_of_driver: values.Name_of_driver,
      date_of_birth: new Date(values.date_of_birth),
      name_of_Cars: values.name_of_Cars,
      email: values.email,
      type_of_cars: values.type_of_cars,
      cars_template: values.cars_template,
      phone: values.phone
    }
    const getToken = localStorage.getItem('token')
    console.log(getToken)

    const { data } = await axios.post("http://localhost:8000/api/v1/createDrivers ", dataa, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    console.log(data)
    setRefresh(!refresh)



  };

  const [driver, setDriver] = useState([])
  const [refresh, setRefresh] = useState<boolean>(false)
  useEffect(() => {
    const getListDriver = async () => {

      const getToken = localStorage.getItem('token')
      const data = await axios.get("http://localhost:8000/api/v1/getListDriver", {
        headers: { Authorization: `Bearer ${getToken}` }
      }).then((response) => {
        const ListDriver = response.data.data
        console.log("ListDriver", ListDriver)
        setDriver(ListDriver.map((d: any, index: number) => {
          return {
            stt: index + 1,
            ...d
          }
        }))


      })

    }
    getListDriver()
  }, [refresh])

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "1200px" }}>
      <div style={{ marginLeft: "40px" }}>
        <h1 style={{ display: "flex", justifyContent: "center", alignContent: 'center', marginTop: '20px', marginBottom: "70px" }}>Add Driver & Cars Information </h1>
        <Form
          name="form-booking"
          className="form-booking"
          initialValues={{ remember: true }}
          onFinish={onFinish}

        >


          <Form.Item
            style={{ width: "520px" }}
            name="Name_of_driver"
            label="Name_of_driver"
            // tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your Name_of_driver!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "520px" }}
            name="name_of_Cars"
            label="Name_of_Cars"
            // tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your name_of_Cars!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "520px", }}
            name="email"
            label="Email"
            // tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input email!', whitespace: true }]}
          >
            <Input style={{ width: "410px", marginLeft: "53px" }} />
          </Form.Item>




          <Form.Item
            style={{ width: "520px", marginLeft: '0px' }}
            name="date_of_birth"
            label="Date_of_birth"
          // tooltip="What do you want others to call you?"
          // rules={[{ required:false , message: 'Please input your start_location!', whitespace: false }]}
          >
            <DatePicker style={{ width: '410px', marginLeft: "15px" }} onChange={onChange} />
          </Form.Item>


          <Form.Item
            style={{ width: "520px" }}
            name="type_of_cars"
            label="Type_of_cars"
            // tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your type_of_cars!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "520px" }}
            name="cars_template"
            label="Cars_template"
            // tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your cars_template!', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{ width: "520px" }}
            name="phone"
            label="Phone_driver"
            // tooltip="What do you want others to call you?"
            rules={[{ required: true, message: 'Please input your phone_driver!', whitespace: true }]}
          >
            <Input />
          </Form.Item>



          <Form.Item style={{ display: "flex", justifyContent: "center" }} >
            <Button type="primary" htmlType="submit" style={{ marginTop: "35px" }}>
              Add Driver
            </Button>
          </Form.Item>

        </Form>


      </div>

      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}> <h1 style={{ display: 'flex', marginLeft: '380px', alignItems: "center", marginBottom: '25px' }}>List Info Drivers </h1> <Table style={{ width: "750px", height: '200px', position: "relative", left: '120px', }} columns={columns} dataSource={driver} onChange={onChangee} /> </div>


    </div>
  );
};

export default AddCars












