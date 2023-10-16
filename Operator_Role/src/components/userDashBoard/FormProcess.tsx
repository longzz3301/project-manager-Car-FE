import React, { useState } from 'react';
import { Avatar, Steps } from 'antd';
import { error } from 'console';
import { Card } from 'antd';
import AvatarContext from 'antd/es/avatar/AvatarContext';

const FormProcess: React.FC = () => {







  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Steps
        style={{ width: '1200px', marginLeft: "50px", display: "flex", alignItems: 'center', justifyContent: 'center' }}
        type="navigation"
        size="small"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={[
          {
            status: 'wait',
            title: 'Waiting For Approved',
            disabled: true,
          },
          {
            status: 'error',
            title: 'Cancel Form',
          },
          {
            status: 'process',
            title: 'Booked Driver & Car',
          },
          {
            status: 'finish',
            title: 'complete form',

          },
        ]}
      />


      <div title="Card title" style={{ width: "1350px", height: '650px', display: 'flex', marginTop: '50px', justifyContent: 'center' }}>
        <div style={{ width: '550px', border: '10px solid', display: 'flex', }}>
          <Avatar style={{ width: "100px", height: "100px", margin: '25px' }} />
            <h1>Id Form :</h1>
          <div style={{position:"absolute" , height:'350px'  , bottom:'20px', marginLeft:"40px" , display:'flex' , justifyContent:"space-between" , flexDirection:'column'}}>
            <h2>Booker Name:</h2>
            <h3>Start_time</h3> <h3>End_time</h3>

            <h3>Start_Location</h3>  <h3>End_location</h3>
            <h3>Number People</h3>
            <h3>reason : </h3>


            <h3>Status</h3>
            <br />
            <h2 style={{display:'flex' , justifyContent:"flex-end" }}>Create At : </h2>
            
          </div>
          



        </div>
      </div>
    </div>
  );
};

export default FormProcess;