import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axiosClient from '../services/axios-client';
import { useStateContext } from '../context/ContextProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Product = () => {

  const {isAdmin} = useStateContext();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [product, setProduct] = useState('');
  const [qua, setQua] = useState(0);
  const [errors, setErrors] = useState(null);
  const [rows, setRows] = useState([]);
  const [message, setMessage] = useState(null);

  async function fethProducts () {
    try{
      const res = await axiosClient.get('/products/all');
      if(res) setRows(res.data.data)
    }catch(err){
      const response = err.response;
      if (response && response.status === 422) {
        setMessage(response.data.message)
      }
    }
  }
  
  useEffect(() => {
    fethProducts();
  }, [])

  const handleDelete = (e,id) => {
    e.preventDefault();

    const payload = {
      id: id
    }
    axiosClient.post('/product/delete', payload)
        .then((res)=> {
            setMessage(res.message);
            fethProducts();
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setMessage(response.data.message)
          }
    })
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'product_name',
      headerName: 'Product',
      width: 150,
      editable: true,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (param) => {
          return(
            isAdmin && <Button variant="contained" size='small' onClick={(e) => handleDelete(e,param.row.id)}>DELETE</Button>
          )
      }
    },
  ];

  const payload = {
     productName: product,
     quantity: qua
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient.post('/products/create', payload)
                .then(()=>{
                  handleClose(true)
                  fethProducts();
                })
                .catch(err=>{
                    const response = err.response;
                    if (response && response.status === 422) {
                      setErrors(response.data.errors)
                    }
                })
  }

  return (
    <div style={{ height: 300, width: '100%' }}>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h4>
          {errors &&
              <div className="alert">
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
          }
          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
        </h4>
        {isAdmin && <Link className="btn-add" onClick={handleOpen}>Add new</Link>}
      </div>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row)=>row.id}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ADD NEW PRODUCTS
          </Typography>
          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Product Name"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '25ch' }}
                onChange={(e)=> setProduct(e.target.value)}
                required
              />
              <TextField
                label="Qunatity"
                id="outlined-start-adornment"
                sx={{ m: 1, width: '15ch' }}
                type='number'
                onChange={(e)=> setQua(e.target.value)}
                required
              />
              <Button type='submit' variant="contained" size='large' sx={{ m: 1, width: '10ch', height: '6ch' }}>ADD</Button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
