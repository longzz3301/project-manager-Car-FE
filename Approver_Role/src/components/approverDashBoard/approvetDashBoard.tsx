// import "antd/dist/antd.css"

import { Menu } from "antd"


import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

import { FileExcelOutlined,BarChartOutlined,UserAddOutlined ,BellOutlined , FieldTimeOutlined,UserOutlined, HomeOutlined, PoweroffOutlined, HistoryOutlined , CarFilled, CarOutlined ,CarTwoTone , CreditCardFilled , FileAddFilled, DashboardOutlined } from '@ant-design/icons';
import Login from "login_register/login";


import { Content, Footer, Header } from "antd/es/layout/layout";


import axios from "axios";
import ListForm from "./ListForm";
import CaculateTimeDistance from "./caculateTimeDistance";
import Notice from "./notice";
import CancelForm from "./cancelForm";
import ApproveForm from "./approvedForm";
// import FormApproved from "./FormUser";
// import FormUser from "./FormUser";
// import StaticsDriver from "./staticsDriver";
// import { faker } from '@faker-js/faker';
// import AddCars from "./addCars";
// import BookedFormOperator from "./BookedFormOperator";

interface SideMenuProps {
  onMenuItemClick: (key: string) => void; // Xác định kiểu dữ liệu của onMenuItemClick
}
interface ContextProps {
  keyProps: string | null; // Khai báo kiểu dữ liệu của keyProp
}





function 
ApproverPage() {

  const [key , setKey] = useState<any>()

  console.log("key" , key)
  const handleMenuItemClick = (key: string) => {
    // console.log("key :" , key)
    setKey(key)
  };

  return (
    <div style={{height:'700px'}} >
      <Header style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", color: "white" }}>Approve Form</Header>


      <div style={{ display: "flex", flexDirection: "row", margin: "50px 0px 10px",  width:'100px' }}>
        <SideMenu  onMenuItemClick={handleMenuItemClick} />

        <div style={{ margin: "10px 20px 0px  " }}> <Context keyProps={key}/></div>


      </div>
     <div  style={{display:"flex" , flexDirection:"column", justifyContent:"flex-end", width:"100wh ", height: "1200px" , marginBottom:"20px"}}> <Footerr  /></div>
    </div>
  )
}

function Footerr() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", width: "100wh ", height: "720px",  }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "darksalmon", height:"80px"  , alignItems:"center"}}>
        <h3> +091273712</h3>
        <h3> Privacy Policy</h3>
        <h3> Term of us </h3>
      </div>
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




function SideMenu({onMenuItemClick}:SideMenuProps) {
  const navigate = useNavigate()

  return (

    <div style={{ display: 'flex', flexDirection: 'row' , width:"220px" }}>
      <Menu mode='inline' onClick={({ key }) => {
        if (key === 'Logout') {
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
        { key: 'ListWaitForm', label: "List Wait Form", icon: <HomeOutlined /> },
        // { key: 'caculate', label: "Caculate Time Distance Form ", icon: <BarChartOutlined /> } ,
        // { key: 'AddDriver&Cars', label: "Add Driver&Cars", icon: <UserAddOutlined /> },
        {
          key: 'History', label: "History", icon: <HistoryOutlined />, children: [
            { key: 'ApproverForm', label: "Approve Form", icon: <CarOutlined  /> },
            { key: 'CancelForm', label: "Cancel Form", icon: <FileAddFilled  /> },
            
            
            
          ]
        },

        // { key: 'Notice', label: "Notice", icon: <BellOutlined />  },
        { key: 'Logout', label: "Logout", icon: <PoweroffOutlined /> },
        // { key: 'Profile', label: "Profile Driver", icon: <CarFilled    /> },
        // { key: 'SignOut', label: "SignOut", icon: <PoweroffOutlined />, danger: true },


      ]}>

      </Menu>




    </div>
  )
}

function Context({keyProps}:ContextProps) {

  const listComponent = [
    {
      key: 'ListWaitForm',
      component: <ListForm />
  
    },
    {
      key: "ApproverForm",
      component: <ApproveForm />
  
    },
    {
      key: "CancelForm",
      component: <CancelForm />
  
    },

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
      {listComponent.find((item) => { return item.key === component })?.component|| <ListForm />}

    </div>
  )


}

export default ApproverPage
