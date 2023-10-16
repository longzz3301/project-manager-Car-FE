import { Card, Space, Typography } from 'antd'
import { LockOutlined, UserOutlined, CarOutlined ,RiseOutlined ,ScheduleOutlined } from '@ant-design/icons';
import React from 'react'
import Statistic from 'antd/es/statistic/Statistic';
import { BarChart } from './pieChart';
import {  VerticalBarChart } from './verticalChart';



function StaticsDriver() {
    return (
        <div>
            <Typography.Title level={4}>
                longzz
            </Typography.Title>
            <Space style={{margin:"30px" , width:'1250px'}} >
                <Card style={{border:'2px solid' , width:'200px' ,}} >
                    <CarOutlined style={{color:'green', backgroundColor:'rgba(0,255,0,0.5)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic  title="Driver& Cars" value={123} />
                </Card>
                <Card style={{border:'2px solid' , width:'200px' ,}}>
                    <ScheduleOutlined style={{color:'green', backgroundColor:'rgba(0,255,0,0.5)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic title="Total Complete Form" value={123} />
                </Card>
                <Card style={{border:'2px solid' , width:'200px' ,}}>
                    <RiseOutlined style={{color:'purple', backgroundColor:'rgba(0,255,255,0.25)', borderRadius:15 , fontSize:24 , padding:8 , }} />
                    <Statistic title="Number of kilometer"  value={123}/>
                </Card>
                <Card style={{border:'2px solid' , width:'200px' ,}}>
                    <CarOutlined style={{color:'red', backgroundColor:'rgba(255,0,0,0.5)', borderRadius:15 , fontSize:24 , padding:8 , }}/>
                    <Statistic title="Driver& Cars" value={123} />
                </Card>
            </Space>
            <VerticalBarChart/>
        </div>
    )
}

function DataStatics () {
    return(
        <Space>
        <Card>
            <CarOutlined />
            <Statistic title="Driver& Cars" value={123} />
        </Card>
        <Card>
            <ScheduleOutlined />
            <Statistic title="Total Complete Form" value={123} />
        </Card>
        <Card>
            <RiseOutlined />
            <Statistic title="Number of kilometer"  value={123}/>
        </Card>
        <Card>
            <CarOutlined />
            <Statistic title="Driver& Cars" value={123} />
        </Card>
    </Space>

    )
}

export default StaticsDriver