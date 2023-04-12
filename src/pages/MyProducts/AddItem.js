import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid, TextField, Avatar,InputAdornment, Button} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Alert from '../../component/Alert'
import { useSelector, useDispatch } from 'react-redux';
import { url } from '../../features/user/userSlice';
import { getmyproducts } from '../../features/application/appSlice';
import axios from 'axios';


export default function AddItem(props) {
  const [ list, setList ] = useState([
    (<>
      <Grid item md={2} className='sno' sx={{padding:'5px',display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Typography>1</Typography>
      </Grid>
      <Grid item md={5} sx={{padding:'5px'}}>
        <TextField type='text' className='features'></TextField>          
      </Grid>
      <Grid item md={5}  sx={{padding:'5px'}}>
        <TextField type='text' className='vals'></TextField>
      </Grid>
    </>),
  ])

  const addRow = ()=>{
    setList([...list,(<>
      <Grid item md={2} className='sno' sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Typography>{list.length+1}</Typography>
      </Grid>
      <Grid item md={5} sx={{padding:'5px'}}>
        <TextField  type='text' className='features' ></TextField>          
      </Grid>
      <Grid item md={5} sx={{padding:'5px'}}>
        <TextField type='text' className='vals'></TextField>
      </Grid>
    </>)])
  }
  
  const [image,setImage]=useState({
    file: []
  })
  const [message,setMessage]=useState('')
  const dispatch = useDispatch()
  const user=useSelector(state=>state.user.user)
  const onSubmit = async(event)=>{
    event.preventDefault()
    const title = document.getElementById('title').value
    const desc = document.getElementById('description').value
    const amount = document.getElementById('amount').value
    const domain=document.getElementById('domain').value
    const features = []
    const vals = []
    console.log(title,desc,amount,domain,features,vals)
  
    if(title===''){
      setMessage('Enter the title')
      setTimeout(()=>{setMessage('')},3000)
      return
    }
    if(desc===''){
      setMessage('Enter the description')
      setTimeout(()=>{setMessage('')},3000)
      return
    }
    if(domain===''){
      setMessage('Enter the Domain')
      setTimeout(()=>{setMessage('')},3000)
      return
    }
    if(amount===''){
      setMessage('Enter the amount')
      setTimeout(()=>{setMessage('')},3000)
      return
    }
    if(isNaN(amount)){
      setMessage('Invalid Amount')
      setTimeout(()=>{setMessage('')},3000)
      return
    }
    const f = document.getElementsByClassName('features')
    for(let i=0;i<f.length;i++){
      features[i]=f[i].children[0].children[0].value
    }
    const v = document.getElementsByClassName('vals')
    for(let i=0;i<v.length;i++){
      vals[i]=v[i].children[0].children[0].value
    }
    
    const res=await fetch(url+'/myproducts/add',{
      method:'POST',
      headers:{
        'x-access-token':localStorage.getItem('token'),
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
          title:title,
          sellerid:user.seller,
          description:desc,
          attribute:features,
          val:vals,
          price:amount,
          domain:domain,
          addressid:user.addressId
      })
    })
    const data = await res.json()
    console.log(data)
    if(data.status==='ok'){
      const config={
        headers:{
          'x-access-token':localStorage.getItem('token'),
          'Content-Type':'multipart/form-data'
        }
      }
      let form = new FormData()
      form.append('productid',data.newItem._id)
      console.log(image.file)
      for (let i = 0; i < image.file.length; i++) {
        form.append('product',image.file[i])
      }
      axios.post(url+'/upload/newproduct',form,config)
      .then(response=>{
        if(response.data.status==='ok')
          dispatch(getmyproducts())
          props.changeMode('display')
      })
    }
  }
  return (
    
    <div style={{height:'100%'}}>
      <Alert type='warning' msg={message}/>
      <Box sx={{ display:'flex',flexDirection:'row',width:'100%' }}>
        <AppBar position="static" sx={{ width:'100%'}}>
          <Toolbar sx={{ width:'100%'}}>
            <Grid container sx={{ width:'100%'}}>
              <Grid item md={2}>
                <Box
                  component={ArrowBackIcon}
                  sx={{backgroundColor:'black',
                      borderRadius:'50%',
                      height:'35px',
                      width:'35px',
                      padding:'8px'
                }}
                onClick={()=>{props.changeMode('display')}}
                />
              </Grid>
              <Grid item md={8}
                sx={{ display:'flex',justifyContent:'center',alignItems:'center' }}
              >
                <Typography
                  variant="h6"
                >
                  Product Details
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid container
      sx={{padding:'20px',height:'90%'}}
      >
            <Grid item
            md={4}
            sx={{
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center',
            }}
            >
              <img id='product-display' alt='product-display' style={{width:'256px',height:'256px',borderRadius:'8px'}} 
              src='data:image/png;base64,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'
              ></img>
                <Box
                  sx={{
                    width:'100%',
                    paddingTop:'20px',
                    display:'flex',
                    justifyContent:'center'
                  }}
                > 
                    
                    <Avatar sx={{
                        mx:'8px',
                        width:'54px',
                        height:'54px',
                        backgroundColor: '#1976d2',
                        cursor:'pointer'
                      }} onClick={()=>{
                        document.getElementById('product-img').click()
                      }}>
                        <UploadIcon />
                      </Avatar>
                </Box>
                <form method='POST' encType='multipart/form-data'>
                <input type='file' multiple name='product' id='product-img' style={{ 
                  display: 'none',
                  }} onChange={(e)=>{
                    const url = URL.createObjectURL(e.target.files[0])
                    document.getElementById('product-display').src = url
                    if(e.currentTarget.value!==null){
                      setImage({'file':e.target.files})
                    }
                  }} />
                  <input type="submit" style={{display: 'none'}} />
                </form>
                    {/* <Avatar sx={{
                        mx:'8px',
                        width:'54px',
                        height:'54px',
                        backgroundColor: upicon,
                        cursor:'pointer'
                      }} onClick={()=>{
                        const config={
                          headers:{
                            'x-access-token':localStorage.getItem('token'),
                            'Content-Type':'multipart/form-data'
                          }
                        }
                        let form = new FormData()
                        form.append('product',image.file)                        
                      }}>
                      </Avatar> */}
                <Box sx={{margin:'10px'}}>
                      {image.file.length} images selected
                </Box>
            </Grid>
            <Grid item
            md={8}
            sx={{paddingLeft:'20px',paddingRight:'20px'}}
            >
              <Box component="form" sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                width:'100%'
              }}>
                <TextField required id='title' label="Product Title"  
                sx={{
                  width:'50%',
                  marginTop: '15px'
                }}
                />
                <TextField required id='description' label="Product Description"  multiline maxRows={2} 
                sx={{
                  width:'50%',
                  marginTop: '15px'
                }}
                 />
                 <TextField required id='domain' label="Domain"  
                 sx={{
                   width:'50%',
                   marginTop: '15px'
                 }}
                  />
                <TextField type='currency' id='amount'  required label='Amount' variant='outlined' 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  width:'50%',
                  marginTop: '15px'
                }}/>
              <Grid container sx={{width:'50%',textAlign:'center',paddingTop:'20px'}}>
                <Grid item md={2}>
                  <Typography>S.No.</Typography>
                </Grid>
                <Grid item md={5}>
                  <Typography>Features</Typography>
                </Grid>
                <Grid item md={5}>
                  <Typography>Details</Typography>
                </Grid>
              </Grid>
              <Grid container sx={{width:'50%',marginTop:'5px',overflowY:'scroll',maxHeight:'140px'}}>
                {list.map(e=>e)}
              </Grid>
              <Button variant='outlined' sx={{marginTop:'5px'}} onClick={addRow}>Add row</Button>
          </Box>
        </Grid>
        <Grid item md={5}>
        </Grid>
        <Grid item md={2}>
          <Button variant='outlined' type='submit' sx={{width:'100%', alignItems:'center'}} onClick={onSubmit}>Submit</Button>
        </Grid>
        <Grid item md={5}>
        </Grid>
      </Grid>
      <Box>
        
      </Box>
    </div>
  )
}