import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Pusher from 'pusher-js';
import axiosClient from '../services/axios-client';

const DemoPaper = styled(Paper)(({ theme }) => ({
    width: 350,
    height: 150,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

export const Dashboard = () => {

  const [notification, setNotification] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(()=>{
     fetchDashboard();
  },[])

  var pusher = new Pusher(`${process.env.REACT_APP_PUSHER_API_KEY}`, {
    cluster: `${process.env.REACT_APP_PUSHER_CLUSTER}`,
  });

  var channel = pusher.subscribe("remaining-stock");
    channel.bind("App\\Events\\StockLeftNotification", (data) => {
      setNotification(true)
      setMessage(data.message)
  });

  const fetchDashboard = ev => {
    axiosClient.get('/dashboard/status')
      .then(() => {})
  }

  return (
    <Stack direction="row" spacing={2}>
      <DemoPaper square={false}>
        <h5>Remaining Stock</h5>
        {notification && message}
      </DemoPaper>
      {/* <DemoPaper square={false}>rounded corners</DemoPaper>
      <DemoPaper square={false}>rounded corners</DemoPaper> */}
    </Stack>
  )
}
