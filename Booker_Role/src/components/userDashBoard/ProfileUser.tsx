import { Table } from 'antd'
import React ,{ useEffect , useState} from 'react'
import { EditFilled, EditOutlined } from '@ant-design/icons';
import axios from 'axios';


interface userType {
  email:string ,
  username:string ,
  
  phone:number ,

  
  date_of_birth:Date,
  sex: string



}

function ProfileUser ()  {
 

 
    useEffect(() => {
      const GetDataInfo = async () => {
        const getToken = localStorage.getItem('token')
        const data = await axios.get("http://localhost:8000/api/v1/getProfile" ,{
          headers: { Authorization: `Bearer ${getToken}` }

        }).then((response) => {
          const ddataUser = response.data
          console.log(ddataUser)
          setDataUser(ddataUser)
        })
      }
      
    
      GetDataInfo()
      
      
    },[])

    const [dataUser , setDataUser] = useState<any>({})
    console.log('dataUser' , dataUser)
    
  

    

    
  
  

  
 

 


  


  




  return (
    <div style={{ display: "flex", flexDirection: "row", height: "300px", width: "1000px" }}>
      <div > <img style={{ width: "300px", height: "300px", marginRight: "100px" }} src="./https://www.google.com/imgres?imgurl=https%3A%2F%2Fsm.ign.com%2Fign_nordic%2Fcover%2Fa%2Favatar-gen%2Favatar-generations_prsz.jpg&tbnid=iK0aSJqa8CD5XM&vet=12ahUKEwiyityrvOiAAxWEmFYBHaPGCq8QMygGegUIARCCAQ..i&imgrefurl=https%3A%2F%2Fnordic.ign.com%2Favatar-generations&docid=wjdb3XJbc0CZ8M&w=1024&h=1024&q=avatar&ved=2ahUKEwiyityrvOiAAxWEmFYBHaPGCq8QMygGegUIARCCAQ" alt="imga error" /></div>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center', }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "150px", marginRight: "100px" }}>
          <div style={{ display: 'flex' }}> <td style={{ border: '1px sollid', borderStyle: "solid", width: "220px", height: "30px" }}>User Name : {dataUser.username} </td> &ensp; </div>
          <div style={{ display: 'flex' }}>  <div style={{ border: '0px sollid', borderStyle: "solid", width: "220px", height: "30px" }}>Chuc Vu : {}</div> </div>
         
          <div style={{ display: 'flex' }}> <td style={{ border: '0px sollid', borderStyle: "solid", width: "220px", height: "30px" }}> Sex : { }</td> </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", marginLeft: "100px", marginRight: "50px" }}>
          <div style={{ display: 'flex' }}> <div style={{ border: '0px sollid', borderStyle: "solid", width: "220px", height: "30px" }}>Date Of Birth : {}</div> &ensp; <button style={{ width: '50px' }}> <EditOutlined /></button></div>
          <div style={{ display: 'flex' }}> <div style={{ border: '0px sollid', borderStyle: "solid", width: "220px", height: "30px" }}>phone : {dataUser.phone}</div>&ensp; <button style={{ width: '50px' }}> <EditOutlined /></button></div>
          <div style={{ display: 'flex' }}> <td style={{ border: '1px sollid', borderStyle: "solid", width: "220px", height: "30px" }}>Email: {dataUser.email}</td>&ensp; <button style={{ width: '50px' }}> <EditOutlined /></button></div>
          


        </div>


      </div>
    </div>
  )
}

export default ProfileUser


