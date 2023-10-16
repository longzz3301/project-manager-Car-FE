
import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { LockOutlined, UserOutlined, EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, DatePickerProps, Form, Input, Modal, Select, Upload, UploadFile, UploadProps } from 'antd';
import { tokenToString } from "typescript";
import { verify } from "crypto";
import { config } from "process";

import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { RcFile } from 'antd/es/upload';

interface DataType {
  key: React.Key;
  stt: number;
  Name_of_driver: string;

  name_of_Cars: string;
  type_of_cars: string;
  phone: string;
  cars_template: string

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
      filterDropdown: () => {
        return <Input autoFocus placeholder='Search' onPressEnter={() => {

        }}
          onBlur={() => { }}></Input>


      },
      filterIcon: () => {
        return <SearchOutlined />
      }
    },
    {
      title: 'name_of_Cars',
      dataIndex: 'name_of_Cars',
      // sorter: {
      //   compare: (a, b) => a.chinese - b.chinese,
      //   multiple: 3,
      // },
    },
    {
      title: 'type_of_cars',
      dataIndex: 'type_of_cars',
      // sorter: {
      //   compare: (a, b) => a.type_of_cars - b.type_of_cars,
      //   multiple: 2,
      // },
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
    {
      title: 'Date_of_birth',
      dataIndex: 'date_of_birth',

    },
    // {
    //   title: "Actions",
    //   render: (_, record) => {
    //     return (
    //       <>
    //         <button onClick={Onclickk} style={{ color: 'red' }}>edit </button>
    //       </>
    //     )
    //   }
    // } ,
    {
      title: "Action",
      render: (_, record) => {
        return (
          <>
            <EditOutlined onClick={() => {
              onEditting(record.Name_of_driver, record.name_of_Cars, record.type_of_cars, record.cars_template, record.phone)
              // onEditting(record)
            }} />
            <DeleteOutlined onClick={() => {
              onDeleteDriver(record.Name_of_driver)
            }} style={({ color: "red", marginLeft: 12 })} />
          </>
        )
      }
    }

  ];

  const Onclickk = () => {
    console.log(123)
  }



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
      phone: values.phone,
      image: values.image
    }
    const getToken = localStorage.getItem('token')
    console.log(getToken)

    const { data } = await axios.post("http://localhost:8000/api/v1/createDrivers ", dataa, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    console.log(data)
    setRefresh(!refresh)



  };

  // const [newDriver, setNewDriver] = useState<boolean>(false)

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

  console.log("driver", driver)
  const dataDriver = driver




  const onDeleteDriver = async (Name_of_driver: string) => {

    Modal.confirm({
      title: "Are you sure , you want to delete this Driver",
      okText: "yes",
      okType: "danger",
      onOk: async () => {
        const getToken = localStorage.getItem('token')

        const deleteDriver = await axios.delete("http://localhost:8000/api/v1/deleteDriver ", {
          headers: { Authorization: `Bearer ${getToken}` }, data: {
            Name_of_driver: Name_of_driver
          }
        });
        setRefresh(!refresh)
      }
    })




  }



  const [editDriver, setEditDriver] = useState<Partial<DataType>>({});
  const [newDriver, setNewDriver] = useState<boolean>(false);






  const onEditting = async (Name_of_driver: string, name_of_Cars: string, type_of_cars: string, cars_template: string, phone: string) => {
    const data = {
      Name_of_driver: Name_of_driver,
      name_of_Cars: name_of_Cars,
      type_of_cars: type_of_cars,
      cars_template: cars_template,
      phone: phone,


    }
    setEditDriver(
      //   Name_of_driver ,
      // phone,
      // cars_template,
      // type_of_cars ,
      // name_of_car


      data)
    // console.log(editDriver)
    setNewDriver(true)



  }

  const handleUpdate = async () => {
    const getToken = localStorage.getItem('token')

    const UpdateDriver = await axios.put("http://localhost:8000/api/v1/updateDrivers ", {
      Name_of_driver: editDriver.Name_of_driver,
      name_of_Cars: editDriver.name_of_Cars,
      type_of_cars: editDriver.type_of_cars,
      cars_template: editDriver.cars_template,
      phone: editDriver.phone,

    }, {
      headers: { Authorization: `Bearer ${getToken}` }
    });
    const valuee = UpdateDriver.data.token
    console.log("valuee :", valuee)

    setNewDriver(false)
    setRefresh(!refresh)

  }


  console.log("editDriver", editDriver)

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };


  // setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );



  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", width: "1300px" }}>
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

          {/* <Form.Item
          style={{ width: "520px" , }}>
            <Upload style={{display:'flex' , justifyContent:'space-between'}} >
              {uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item> */}



          <Form.Item style={{ display: "flex", justifyContent: "center" }} >
            <Button type="primary" htmlType="submit" style={{ marginTop: "35px" }}>
              Add Driver
            </Button>
          </Form.Item>

          

        </Form>


      </div>



      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <h1 style={{ display: 'flex', marginLeft: '380px', alignItems: "center", marginBottom: '15px' }}>List Info Drivers </h1>
        <Table style={{ width: "800px", height: '120px', marginLeft: "50px" }} columns={columns} dataSource={driver} onChange={onChangee} />
        <Modal
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
        </Modal>
      </div>


    </div>
  );
};

export default AddCars












