// import { verify } from "crypto";
import React ,{ useEffect , useState} from 'react'
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';


const CheckUserRouter = (props) => {
  // const UserLoggedIn = () => {
    const [dataUser , setDataUser] = useState(null)


    useEffect(() => {
      const GetDataInfo = async () => {
        const getToken = localStorage.getItem('token')
        const data = await axios.get("http://localhost:8000/api/v1/getProfile" ,{
          headers: { Authorization: `Bearer ${getToken}` }

        }).then((response) => {
          const ddataUser = response.data.data
          console.log(ddataUser)
          setDataUser(ddataUser)
        })
      }
      
    
      GetDataInfo()
      console.log('dataUser' , dataUser)
      // console.log('dataUser2' ,  setDataUser)
      
      
      
    },[])
    const navigate = useNavigate()
    
    useEffect(() => {
      
      
    
      if(dataUser && dataUser.role === "PERMISSION_BOOK") {
        // alert('User can not accees ' );
        //  <Navigate to={""} replace />;
          navigate("/User")
      } else if(dataUser && dataUser.role === "PERMISSION_MANAGER") {
        // alert('User can not accees ' );
        //  <Navigate to={"operator"} replace />;
         navigate("/operator")
      } else {
        alert('Error can not accees ' );
        //  <Navigate to={"/login"} replace />;
         navigate("/login")
      }
    }, [dataUser])    
  
  // };

  

  return (
    <>
      <Outlet />
    </>
  );
};

export default CheckUserRouter;