import {createContext, useContext, useEffect, useState} from "react";
import axiosClient from "../services/axios-client";

const StateContext = createContext({
  currentUser: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  setIsAdmin: () => {},
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({name: ''});
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUser = async() => {
    const status = await axiosClient.get('/user');
    if(status.data == '') setIsAdmin(false);
    if(status.data == 1) setIsAdmin(true);
  }

  useEffect(()=>{
    fetchUser();
  },[])

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      token,
      setToken,
      isAdmin
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);