// import "antd/dist/antd.css"

import { Menu } from "antd"

import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useNavigate } from "react-router-dom"

import { FileExcelOutlined, FileDoneOutlined, BarChartOutlined, CalendarOutlined, CloudSyncOutlined, FieldTimeOutlined, UserOutlined, HomeOutlined, DashboardOutlined, PoweroffOutlined, HistoryOutlined, } from '@ant-design/icons';
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
import Caalennder from "./Calender";

export interface Notification {
  title: any,
  body: any
}

interface SideMenuProps {
  onMenuItemClick: (key: string) => void; // Xác định kiểu dữ liệu của onMenuItemClick
}
interface ContextProps {
  keyProps: string | null; // Khai báo kiểu dữ liệu của keyProp
}

function UserPage() {
  const [dataNotify, setDataNotify] = useState<Notification>({ title: '', body: '' });


  const [key, setKey] = useState<any>()

  console.log("key", key)
  const handleMenuItemClick = (key: string) => {
    // console.log("key :" , key)
    setKey(key)
  };

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




  return (
    <div className="UserPage" >
      <Header style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px", color: "white" }}>Booking Car User</Header>


      <div style={{ display: "flex", flexDirection: "row", margin: "20px 0px 50px", height: "100vh" }}>
        <SideMenu onMenuItemClick={handleMenuItemClick} />

        <div style={{ margin: "25px 50px 0px  " }}>
          <Context keyProps={key} />
          
        </div>


      </div>

      <div  style={{display:"flex" , flexDirection:"column", justifyContent:"flex-end", width:"100wh ", height: "600px" , marginBottom:"20px"}}> <Footerr  /></div>
      
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

function SideMenu({ onMenuItemClick }: SideMenuProps) {
  const navigate = useNavigate()
  // const [pages , seetPag]
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Menu mode='inline' onClick={({ key }) => {
        if (key === 'SignOut') {
          const logout = () => {
            localStorage.removeItem('token');
            navigate('login')
          }
          logout()


        }

        if(!key ) {
          <BookingForm />


        }
        else {
          onMenuItemClick(key)
        }


      }} items={[
        { key: 'Home', label: "Home", icon: <HomeOutlined /> },
        // { key: 'FormProcess', label: "FormProcess", icon: <CloudSyncOutlined /> } ,
        { key: 'calender', label: "Calender", icon: <CalendarOutlined /> },
        {
          key: 'History', label: "ListForm", icon: <HistoryOutlined />, children: [
            { key: 'Wait', label: "Wait Form", icon: <FieldTimeOutlined /> },
            { key: 'Booked', label: "Booked Form", icon: <FileExcelOutlined /> },
            { key: 'CompleteForm', label: "Complete Form", icon: <FileDoneOutlined /> },
            { key: 'CancelForm', label: "Cancel Form", icon: <FileExcelOutlined /> },
            // { key: 'Booked', label: "Booked Form", icon: <FieldTimeOutlined />  }
          ]
        },
        { key: 'statics', label: "business trip statistics", icon: <BarChartOutlined /> },
        { key: 'SignOut', label: "SignOut", icon: <PoweroffOutlined />, danger: true },


      ]}>

      </Menu>

    </div>
  )
}
function Context({ keyProps }: ContextProps) {
  const getData = async (value: any) => {
    const data = await axios.get("http://localhost:8000/api/v1/getProfile ", value)
    const dataUser = data
    console.log(data)
  }

  const listComponent = [
    {
      key: 'Home',
      component: <BookingForm />

    },
    {
      key: "calender",
      component: <Caalennder />

    },
    {
      key: "Wait",
      component: <WaitForm />

    },
    {
      key: "CompleteForm",
      component: <CompleteForm />

    }, {
      key: "CancelForm",
      component: <CancelForm />

    },
    {
      key: "Booked",
      component: <BookedForm />

    },
    {
      key: "statics",
      component: <StaticsForm />

    }
  ]

  useEffect(() => {
    if (keyProps !== null){
      setComponent(keyProps)
    } else {
      setComponent('Home')
    }
    
  },[keyProps])

  const [component, setComponent] = useState(listComponent[0].key)
  console.log("component", component)

  const [page, setPage] = useState()
  return (



    <div>
      
      {listComponent.find((item) => { return item.key === component })?.component|| <BookingForm />}




    </div>
  )


}

export default UserPage

{/* <Routes >
        <Route path="/Home" element={<BookingForm />}> </Route>
        <Route path="*FormProcess" element={<FormProcess />}></Route>
        <Route path="/calender" element={<Caalennder />}></Route>
        <Route path="/History" element={<div>History</div>}></Route>
        <Route path="/CompleteForm" element={<CompleteForm />}></Route>
        <Route path="/Booked" element={<BookedForm />}></Route>
        <Route path="/CancelForm" element={<CancelForm />}></Route>
        <Route path="/Wait" element={<WaitForm />}></Route>


        <Route path="/statics" element={<StaticsForm />}></Route>

        <Route path="/SignOut" element={<div>SignOut</div>}></Route> 

      </Routes> */}



