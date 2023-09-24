import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';

export const AppLayout = () => {
  const {token} = useStateContext();

  if(token){
    return <Navigate to='/dashboard' />
  }

  return (
    <div className='appLayout'>
      <Outlet/>
    </div>
  )
}
