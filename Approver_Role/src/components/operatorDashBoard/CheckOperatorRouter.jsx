// import { verify } from "crypto";
import React ,{ useEffect , useState} from 'react'
import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios';


const CheckOperatorRouter = (props) => {
  // const UserLoggedIn = () => {
    const [dataUser , setDataUser] = useState(null)


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
    console.log('dataUser' , dataUser)
    
    
    useEffect(() => {
      if(dataUser && dataUser.role !== "PERMISSION_MANAGER") {
        alert('User can not accees ' );
        return <Navigate to={"login"} replace />;
      }
    }, [dataUser])    
  
  // };

  

  return (
    <>
      <Outlet />
    </>
  );
};

export default CheckOperatorRouter;