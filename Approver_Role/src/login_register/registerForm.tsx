import React, { useState } from 'react';
import type { CascaderProps, UploadProps } from 'antd';
import { LockOutlined, UserOutlined ,UploadOutlined} from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
  
} from 'antd';
import axios from 'axios';

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const { RangePicker } = DatePicker;

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    // try {

    //   const response = await axios.post("http://localhost:8000/api/v1/createAccount", values);
    //   console.log(response.data); // Log the response data
    //   // Handle success or show appropriate messages to the user
    // } catch (error) {
    //   console.error('Error creating account:', error);
    //   // Handle error or show error messages to the user
    // }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );



  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);


  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }} > Register </h1>

      <Form
        onFinish={onFinish}

      >
        <Form.Item
          name="username"
          label="username"
          // tooltip="What do you want others to call you?"
          rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input style={{ width: "306px", marginLeft: "20px" }} />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The new password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>




        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please input your phone number!' }]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>



        <Form.Item name="Date" label="Date of birth" rules={[{ required: true, message: 'Please input your phone number!' }]}  >
          <DatePicker style={{ width: "282px", marginLeft: "5px" }} />
        </Form.Item>







        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select placeholder="select your gender" style={{ width: "300px", marginLeft: "20px" }}>
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="office code"
          label="office code"

          rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
        >
          <Input />
        </Form.Item>






        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
        <Upload style={{}} {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <br/>
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: "35px" }}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;