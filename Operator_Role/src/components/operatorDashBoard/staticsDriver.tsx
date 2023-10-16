import { Card, Space, Typography } from 'antd'
import { LockOutlined, UserOutlined, CarOutlined ,RiseOutlined ,ScheduleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import Statistic from 'antd/es/statistic/Statistic';
import { BarChart } from './pieChart';
import {  VerticalBarChart } from './verticalChart';
import axios from 'axios';



function StaticsDriver() {
    const [totalForm , setTotalForm] = useState<any>([])
    const [totalDriver , setTotalDriver] = useState<any>([]) 
    const [bestDriver , setBestDriver] = useState<any>([])

    useEffect(()=> {
        const getDataDriver = async () => {
            const getToken = localStorage.getItem('token')
            const data = await axios.get("http://localhost:8000/api/v1/getTotalCar" , {
                headers: { Authorization:`Bearer ${getToken}`}
            }).then((response)=> {
                const dataa = response.data.total
                setTotalDriver(dataa)
                console.log("data" ,dataa)
            })
        }
        
        getDataDriver()

    },[setTotalDriver])

    console.log(totalDriver)

    useEffect(()=> {
        const getTotalFormComplete = async () => {
            const getToken = localStorage.getItem('token')
            const data = await axios.get("http://localhost:8000/api/v1/getTotalFormComplete" , {
                headers: { Authorization:`Bearer ${getToken}`}
            }).then((response)=> {
                const dataa = response.data.total
                const totalKilometers = response.data.totalKilometers
                const value = {
                    totalFOrm : dataa , 
                    totalKilometers : totalKilometers
                }
                setTotalForm(value)
                
            })
        }
        
        getTotalFormComplete()

    },[setTotalForm])


    useEffect (() => {
        const getBestDriver = async () => {
            const getToken = localStorage.getItem('token')
            const data = await axios.get("http://localhost:8000/api/v1/getBestDriver" , {
                headers: { Authorization:`Bearer ${getToken}`}
            }).then((response)=> {
                const dataa = response.data
                setBestDriver(dataa)
                console.log("data" ,dataa)
            })
        }
        
        getBestDriver()
    } , [])

    console.log("totalDriver :" , totalDriver )
    console.log("totalForm : " , totalForm )
    console.log("bestDriver : " , bestDriver)

    return (
        <div >
            <Typography.Title level={4} style={{width:"1000px"}}>
                
            </Typography.Title>
            <Space style={{margin:"30px" , width:'1380px'}} >
                <Card style={{border:'2px solid' , width:'210px' ,}} >
                    <CarOutlined style={{color:'green', backgroundColor:'rgba(0,255,0,0.5)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic  title="Total Driver& Cars" value={totalDriver} />
                </Card>
                <Card style={{border:'2px solid' , width:'210px' ,}}>
                    <RiseOutlined style={{color:'purple', backgroundColor:'rgba(0,255,255,0.25)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic title="Total Kilometer"  value={`${totalForm.totalKilometers   } km`}/>
                </Card>
                <Card style={{border:'2px solid' , width:'210px' ,}}>
                    <ScheduleOutlined style={{color:'green', backgroundColor:'rgba(0,255,0,0.5)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic title="Total Complete Form " value={totalForm.totalFOrm} />
                </Card>
                <Card style={{border:'2px solid' , width:'210px' , marginLeft:"100px" }}>
                    <CarOutlined style={{color:'red', backgroundColor:'rgba(255,0,0,0.5)', borderRadius:15 , fontSize:24 , padding:8 , }}/>
                    <Statistic title="Driver of the Year" value={bestDriver.bestDriver} />
                </Card>
                <Card style={{border:'2px solid' , width:'210px' ,}} >
                <RiseOutlined style={{color:'purple', backgroundColor:'rgba(0,255,255,0.25)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic  title="Kilomters Complete"  value={`${bestDriver.totalKM} km`}/>
                </Card>
                <Card style={{border:'2px solid' , width:'210px' ,}} >
                <ScheduleOutlined style={{color:'green', backgroundColor:'rgba(0,255,0,0.5)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic  title="Form Complete" value={bestDriver.countForm} />
                </Card>
            </Space>    
            <VerticalBarChart/>
        </div>
    )
}

// function DataStatics () {

    




//     return(
//         <Space>
//         <Card>
//             <CarOutlined />
//             <Statistic title="Driver& Cars" value={123} />
//         </Card>
//         <Card>
//             <ScheduleOutlined />
//             <Statistic title="Total Complete Form" value={123} />
//         </Card>
//         <Card>
//             <RiseOutlined />
//             <Statistic title="Number of kilometer"  value={123}/>
//         </Card>
//         <Card>
//             <CarOutlined />
//             <Statistic title="Driver of the Year " value={123} />
//         </Card>
//     </Space>

//     )
// }

export default StaticsDriver