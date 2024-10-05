import React, { Children } from 'react'
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRouteUser = ({children }) => {

    const {user} = useSelector(store =>store.auth);
    const navigate =useNavigate();

    useEffect(() =>{
        if(user === null){
            navigate("/login");
        }
    },[])
  return (
    <div>
      {children }
    </div>
  )
}

export default ProtectedRouteUser
