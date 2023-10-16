// import "antd/dist/antd.css"

import { Menu } from "antd"


import React from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

import { FileExcelOutlined,BarChartOutlined,UserAddOutlined , FieldTimeOutlined,UserOutlined, HomeOutlined, PoweroffOutlined, HistoryOutlined , CarFilled, CarOutlined ,CarTwoTone , CreditCardFilled , FileAddFilled, DashboardOutlined } from '@ant-design/icons';
import Login from "login_register/login";


import { Content, Footer, Header } from "antd/es/layout/layout";


import axios from "axios";
// import FormApproved from "./FormUser";
// import FormUser from "./FormUser";
// import StaticsDriver from "./staticsDriver";
// import { faker } from '@faker-js/faker';
// import AddCars from "./addCars";
// import BookedFormOperator from "./BookedFormOperator";







function OperatorPage() {

  return (
    <div style={{height:'100vw'}} >
      <Header style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", color: "white" }}>Booking Car User</Header>


      <div style={{ display: "flex", flexDirection: "row", margin: "20px 0px 50px", height: "100vh" }}>
        <SideMenu />

        <div style={{ margin: "25px 50px 0px  " }}> <Context /></div>


      </div>
      <Footerr />
    </div>
  )
}

function Footerr () {
  return(
    <div style={{display:'flex' , flexDirection :'row' , justifyContent:'space-around'  , backgroundColor:"darksalmon"}}> 
      <h3> +091273712</h3> 
      <h3> Privacy Policy</h3>
      <h3> Term of us </h3>
    </div>
  )

}


//  function Header () {
//     return(
//        <div style={{backgroundColor:"blue"}}>
//          <h1>Header</h1>

//        </div>
//     )
//  }




function SideMenu() {
  const navigate = useNavigate()

  return (

    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Menu mode='inline' onClick={({ key }) => {
        if (key === 'SignOut') {

        }
        else {
          navigate(key)
        }


      }} items={[
        { key: 'Home', label: "Home", icon: <HomeOutlined /> },
        // { key: 'StaticsDriver', label: "Statics Driver", icon: <BarChartOutlined /> } ,
        // { key: 'AddDriver&Cars', label: "Add Driver&Cars", icon: <UserAddOutlined /> },
        // { key: 'AddDriver&Cars', label: "Add Driver&Cars", icon: <UserAddOutlined /> },
        // {
        //   key: 'History', label: "History", icon: <HistoryOutlined />, children: [
        //     { key: 'CompleteForm', label: "Complete Form", icon: <CarOutlined  /> },
        //     { key: 'CancelForm', label: "Cancel Form", icon: <FileAddFilled  /> },
        //     { key: 'BookedForm', label: "Booked Form", icon: <CreditCardFilled />  }


        //   ]
        // },
        // { key: 'Profile', label: "Profile Driver", icon: <CarFilled    /> },
        // { key: 'SignOut', label: "SignOut", icon: <PoweroffOutlined />, danger: true },


      ]}>

      </Menu>




    </div>
  )
}

function Context() {
  
  return (




    <div>
      <Routes>
        <Route path="/Home" element={<div>home</div>}> </Route>
        <Route path="FormProcess" element={<div>home</div>}></Route>
        <Route path="/staticsDriver" element={<div>home</div>}></Route>
        
      </Routes>

    </div>
  )


}

export default OperatorPage 
