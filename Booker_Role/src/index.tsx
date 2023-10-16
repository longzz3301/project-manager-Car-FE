import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import TestDashBoard from 'components/userDashBoard/testDashBoard';
import SideMenu from 'components/userDashBoard/testDashBoard';
// import UserPage from 'components/userDashBoard/testDashBoard';
import OperatorPage from 'components/operatorDashBoard/operatorDashBoard';
import UserPage from 'components/userDashBoard/testDashBoard';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App/>

  // <BrowserRouter>

    
  //   <UserPage/>
    

  // </BrowserRouter>
);


{/* <UserPage/> */ }
{/* <OperatorPage/> */ }