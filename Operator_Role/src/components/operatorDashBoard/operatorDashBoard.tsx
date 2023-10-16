// import "antd/dist/antd.css"

import { Button, Drawer, Menu } from "antd"


import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

import { FileExcelOutlined, BarChartOutlined, MessageOutlined, UserAddOutlined, FieldTimeOutlined, UserOutlined, HomeOutlined, PoweroffOutlined, HistoryOutlined, CarFilled, CarOutlined, CarTwoTone, CreditCardFilled, FileAddFilled, DashboardOutlined } from '@ant-design/icons';
import Login from "login_register/login";


import { Content, Footer, Header } from "antd/es/layout/layout";



import axios from "axios";
import FormApproved from "./Home";
import FormUser from "./Home";
import StaticsDriver from "./staticsDriver";
import { faker } from '@faker-js/faker';
import AddCars from "./addCars";
import BookedFormOperator from "./BookedFormOperator";
import CancelForm from "./CancelForm";
import CompleteForm from "./CompleteForm";
import ListBooked from "./ListBooked";
import Noti from "./notification";
import TestUpload from "./test";

interface SideMenuProps {
  onMenuItemClick: (key: string) => void; // Xác định kiểu dữ liệu của onMenuItemClick
}
interface ContextProps {
  keyProps: string | null; // Khai báo kiểu dữ liệu của keyProp
}




function OperatorPage() {

  const [key , setKey] =useState<any>()

  console.log("key" , key)
  const handleMenuItemClick = (key: string) => {
    // console.log("key :" , key)
    setKey(key)
  };


  return (
    <div style={{ height: "300px" }} >
      <Header style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", color: "white", width: "100wh" }}>Management Page</Header>


      <div style={{ display: "flex", flexDirection: "row", margin: "20px 0px 50px ", width: "100wh" }}>
        <SideMenu onMenuItemClick={handleMenuItemClick} />

        <div style={{ margin: "25px 30px 10px 20px  ", width: "100wh" }}> <Context keyProps={key}/></div>


      </div>
      <Footerr />
    </div>
  )
}



function SideMenu({onMenuItemClick}:SideMenuProps) {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // const [logout , setLogout] = useState(false)

  // useEffect(() => {
  //   if(!logout) return
  //   setLogout(false);
  // },[logout])
  


  return (

    <div style={{ display: 'flex', flexDirection: 'column', height: "500px" }}>


      <Menu mode='inline' onClick={({ key }) => {
        if (key === 'SignOut') {
          const logout = () => {
            localStorage.removeItem('token');
            navigate('login')
          }
          logout()


        }
        else {
          onMenuItemClick(key)
        }


      }} items={[

        { key: 'Home', label: "Home", icon: <HomeOutlined /> },
        { key: 'StaticsDriver', label: "Statics Driver", icon: <BarChartOutlined /> },
        { key: 'AddDriver&Cars', label: "Add Driver&Cars", icon: <UserAddOutlined /> },
        { key: 'test', label: "test", icon: <MessageOutlined /> },
        {
          key: 'History', label: "History", icon: <HistoryOutlined />, children: [
            { key: 'CompleteForm', label: "Complete Form", icon: <CarOutlined /> },
            { key: 'CancelForm', label: "Cancel Form", icon: <FileAddFilled /> },
            // { key: 'BookedForm', label: "Booked Form", icon: <CreditCardFilled /> }


          ]
        },
        { key: 'ListBooked', label: "List Booked Form", icon: <CarFilled /> },
        { key: 'SignOut', label: "SignOut", icon: <PoweroffOutlined />, danger: true },


      ]}>






      </Menu>
      <>
        <Button type="primary" onClick={showDrawer}>
          notification
        </Button>
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>






    </div>
  )
}

function Context({keyProps}:ContextProps) {
  
const listComponent = [
  {
    key: 'Home',
    component: <FormUser />

  },
  {
    key: "StaticsDriver",
    component: <StaticsDriver />

  },
  {
    key: "AddDriver&Cars",
    component: <AddCars />

  },
  {
    key: "CompleteForm",
    component: <CompleteForm />

  },{
    key: "CancelForm",
    component: <CancelForm />

  },
  {
    key: "ListBooked",
    component: <ListBooked />

  },
  {
    key: "test",
    component: <TestUpload />

  }
]


  const [component, setComponent] = useState(listComponent[0].key)
  console.log("component" ,component)

  // const CheckupClick = (idx: string) => {
  //   setComponent(idx)
  // }

  useEffect(() => {
    if(keyProps !==null)
    setComponent(keyProps)
  })


  return (

    <div>



      {listComponent.find((item) => { return item.key === component })?.component || <FormUser />}



    </div>
  )


}

function Footerr() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100wh ", height: "500px", marginBottom: "20px" }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "darksalmon", height:"70px" , alignItems:"center" }}>
        <h3> +091273712</h3>
        <h3> Privacy Policy</h3>
        <h3> Term of us </h3>
      </div>
    </div>
  )

}

export default OperatorPage

{/* <Routes>
        <Route path="/Home" element={<FormUser />}> </Route>
        <Route path="FormProcess" element={<div>home</div>}></Route>
        <Route path="/staticsDriver" element={<StaticsDriver />}></Route>
        <Route path="/AddDriver&Cars" element={<AddCars />}></Route>


        <Route path="/History" element={<div>History</div>}></Route>
        <Route path="/CompleteForm" element={<CompleteForm />}></Route>
        <Route path="/CancelForm" element={<CancelForm />}></Route>
        <Route path="FormProcess" element={<BookedFormOperator />}></Route>

        <Route path="ListBooked" element={<ListBooked />}></Route>


      </Routes> */}


      