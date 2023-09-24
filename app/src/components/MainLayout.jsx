import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import axiosClient from '../services/axios-client';

export const MainLayout = () => {

  const {user, isAdmin, token, setUser, setToken} = useStateContext();
  //const location = useLocation();

  if(!token){
    return <Navigate to='/login' />
  }

  const handleLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  return (
    <div className='mainLayout'>
      <aside>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/products'>Products</Link>
      </aside>
      <div className='content'>
        <header>
          <div>
            <h3>Welcome back {isAdmin ? 'Admin' : 'User'}</h3>
            {/* {location.pathname == '/dashboard' ? 'Dashboard' : 'Products'} */}
          </div>
          <div>
            {user.name}
            <a href='#' style={{padding: '5px'}} onClick={handleLogout}>Logout</a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
