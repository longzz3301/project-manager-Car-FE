// import "antd/dist/antd.css"

import { Menu } from "antd"

import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom"

import { FileExcelOutlined, FileDoneOutlined, BarChartOutlined, CloudSyncOutlined, FieldTimeOutlined, UserOutlined, HomeOutlined, DashboardOutlined, PoweroffOutlined, HistoryOutlined, } from '@ant-design/icons';
import Login from "login_register/login";

import BookingForm from "./FormBooking";
import { Content, Footer, Header } from "antd/es/layout/layout";
import "./UserPage.css"
import ProfileUser from "./ProfileUser";
import axios from "axios";

import CompleteForm from "./CompleteForm";
import CancelForm from "./CancelForm";
import FormProcess from "./FormProcess";
import WaitForm from "./WaitForm";
import BookedForm from "./BookedForm";
import { StaticsForm } from "./staticsForm";
import firebase, { message } from '../../firebase'

export interface Notification {
  title: any,
  body: any
}

function UserPage() {
  const [dataNotify, setDataNotify] = useState<Notification>({ title: '', body: '' });

  //   useEffect(() => {
  //     getMessagingToken();
  //     const channel = new BroadcastChannel("notifications");
  //     channel.addEventListener("message", (event) => {
  //       console.log("Receive background: ", event.data);
  //     });
  //   },[])
  //  useEffect(() => {
  //   firebaseMessage.onMessageListener().then(data => {
  //       console.log("Receive foreground: ",data)
  //    })
  // })

  // receive notification server trả về 
  message.onMessage((payload) => {
    console.log(`[message.onMessage]: `, payload)
    if (!payload?.notification) {
      console.log("!payload?.notification")
      // setStateData({ ...stateData, open: true, severity: 'error' })
      return;
    }

    const { notification } = payload

    // setStateData({ ...stateData, open: true, severity: 'success' })
    setDataNotify({ title: notification.title, body: notification.body })
  });

  // getToken và push tokenID lên server 
  useEffect(() => {
    const messaging = firebase.messaging()
    messaging.requestPermission()
      .then(() => {
        return messaging.getToken()
      })
      .then(token => {
        console.log("TOKEN: ", token)
      })
  }, [])


  const getProfile = async () => {
    const getToken = localStorage.getItem('token')
    const ProfileUser = await axios.get("http://localhost:8000/api/v1/getProfile")

  }

  return (
    <div className="UserPage" >
      <Header style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", color: "white" }}>Booking Car User</Header>


      <div style={{ display: "flex", flexDirection: "row", margin: "20px 0px 50px", height: "100vh" }}>
        <SideMenu />

        <div style={{ margin: "25px 50px 0px  " }}> <Context /></div>


      </div>
      <Footer style={{ display: "flex", justifyContent: "center", height: "200px" }}>footer</Footer>
    </div>
  )
}

function SideMenu() {
  const navigate = useNavigate()
  // const [pages , seetPag]
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Menu mode='inline' onClick={({ key }) => {
        if (key === 'SignOut') {
          const deleteTOken = localStorage.clear()
          console.log(deleteTOken)
          return <Navigate to={"/login"} replace />;

        }
        else {
          navigate(key)

        }

      }} items={[
        { key: '/Home', label: "Home", icon: <HomeOutlined /> },
        // { key: 'FormProcess', label: "FormProcess", icon: <CloudSyncOutlined /> } ,
        { key: 'Profile', label: "Profile User", icon: <UserOutlined /> },
        {
          key: '/History', label: "History", icon: <HistoryOutlined />, children: [
            { key: '/Wait', label: "Wait Form", icon: <FieldTimeOutlined /> },
            { key: '/Booked', label: "Booked Form", icon: <FileExcelOutlined /> },
            { key: '/CompleteForm', label: "Complete Form", icon: <FileDoneOutlined /> },
            { key: '/CancelForm', label: "Cancel Form", icon: <FileExcelOutlined /> },
            // { key: 'Booked', label: "Booked Form", icon: <FieldTimeOutlined />  }
          ]
        },
        { key: 'statics', label: "business trip statistics", icon: <BarChartOutlined /> },
        { key: 'Logout', label: "SignOut", icon: <PoweroffOutlined />, danger: true },


      ]}>

      </Menu>

    </div>
  )
}
function Context() {
  const getData = async (value: any) => {
    const data = await axios.get("http://localhost:8000/api/v1/getProfile ", value)
    const dataUser = data
    console.log(data)
  }

  const [page, setPage] = useState()
  return (



    <div>






      <Routes>
        <Route path="/Home" element={<BookingForm />}> </Route>
        <Route path="*FormProcess" element={<FormProcess />}></Route>
        <Route path="/Profile" element={<ProfileUser />}></Route>
        <Route path="/History" element={<div>History</div>}></Route>
        <Route path="/CompleteForm" element={<CompleteForm />}></Route>
        <Route path="/Booked" element={<BookedForm />}></Route>
        <Route path="/CancelForm" element={<CancelForm />}></Route>
        <Route path="/Wait" element={<WaitForm />}></Route>


        <Route path="/statics" element={<StaticsForm />}></Route>

        <Route path="/Logout" element={<div>SignOut</div>}></Route>

      </Routes>





      {/* <Link to ="/User" > <BookingForm /></Link>
        <Link to ="/FormProcess" > <FormProcess/> </Link>
        <Link to ="Profile" ><ProfileUser /></Link>
        <Link to="/History" ><div>History</div></Link>
        <Link to="/CompleteForm" ><CompleteForm/></Link>
        <Link to="/Booked" ><BookedForm/></Link>
        <Link to="/CancelForm" ><CancelForm/></Link>
        <Link to="/Wait" ><WaitForm/></Link>


        <Link to="/statics" ><StaticsForm/></Link>

        <Link to="/Logout" ><div>SignOut</div></Link>  */}



    </div>
  )


}

export default UserPage


