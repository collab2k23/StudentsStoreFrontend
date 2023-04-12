import React, { useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid, TextField ,InputAdornment , Button} from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Alert from '../../component/Alert'
import { url } from '../../features/user/userSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { getmyproducts } from '../../features/application/appSlice';
import axios from 'axios';


export default function EditItem(props) {
    const contents = useSelector(st=>st.app.drawer)
    const [ newDetails, setNewDetails ] = useState(contents)
    const [ message, setMessage ] = useState('')
    const [ productimgs, setProductimgs ] = useState([])
    const dispatch = useDispatch()
    const user=useSelector(state=>state.user.user)
    const saveChanges=async(event)=>{
            event.preventDefault()
        
          
            if(newDetails.title===''){
              setMessage('Enter the title')
              setTimeout(()=>{setMessage('')},3000)
              return
            }
            if(newDetails.description===''){
              setMessage('Enter the description')
              setTimeout(()=>{setMessage('')},3000)
              return
            }
            if(newDetails.domain===''){
              setMessage('Enter the Domain')
              setTimeout(()=>{setMessage('')},3000)
              return
            }
            if(newDetails.price===''){
              setMessage('Enter the amount')
              setTimeout(()=>{setMessage('')},3000)
              return
            }
            if(isNaN(newDetails.price)){
              setMessage('Invalid Amount')
              setTimeout(()=>{setMessage('')},3000)
              return
            }
            
            const res=await fetch(url+'/myproducts/edit',{
              method:'POST',
              headers:{
                'x-access-token':localStorage.getItem('token'),
                "Content-Type":"application/json"
              },
              body:JSON.stringify({
                    title:newDetails.title,
                    sellerid:user.seller,
                    description:newDetails.description,
                    attribute:newDetails.attribute,
                    val:newDetails.val,
                    price:newDetails.price,
                    domain:newDetails.domain,
                    img:newDetails.img,
                    id:newDetails._id,
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
              form.append('productid',newDetails._id)
              const files = document.getElementById('product-imgs').files
              for (let i = 0; i < files.length; i++) {
                form.append('product',files[i])
              }
              axios.post(url+'/upload/newproduct',form,config)
              .then(response=>{
                if(response.data.status==='ok')
                  dispatch(getmyproducts())
                  props.changeMode('display')
              })
            }
          
    }
    
  return(
    <>
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
                        Edit Product
                        </Typography>
                    </Grid>
                    </Grid>
                </Toolbar>
                </AppBar>
            </Box>
            
            <Grid container sx={{padding:'20px',height:'80%',marginBottom:'15px',overflowY:'scroll'}}>
                <Grid item
                md={5}
                >
                    <Grid container>
                        {newDetails&&newDetails.img&&newDetails.img.map((img,index)=><>
                            <Grid item md={5}
                                onClick={()=>{
                                    console.log(newDetails)
                                    setNewDetails({
                                        ...newDetails,
                                        img: newDetails.img.filter((e,i)=>i!==index)
                                    })
                                }}
                                sx={{ 
                                    backgroundImage: `url(${url+img})`, 
                                    height: '128px', 
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    margin:'4px',
                                    border: '1px solid black',
                                    borderRadius: '8px',
                                    display:'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                              <DeleteIcon sx={{
                                ":hover":{
                                    opacity:'0.7',
                                    cursor: 'pointer'
                                }
                              }}
                              />  
                            </Grid>
                        </>)}
                        {productimgs&&productimgs.map(img=><>
                            <Grid item md={5}
                            onClick={()=>{
                            }}
                            sx={{ 
                                backgroundImage: `url(${img})`, 
                                height: '128px', 
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                margin:'4px',
                                border: '1px solid black',
                                borderRadius: '8px',
                                display:'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >
                              <DeleteIcon sx={{
                                ":hover":{
                                    opacity:'0.7',
                                    cursor: 'pointer'
                                }
                              }}
                              />  
                            </Grid>
                        </>)}
                        <input type="file" id='product-imgs' multiple style={{ display:'none' }} 
                            onChange={()=>{
                                let f = document.getElementById('product-imgs')
                                f.click()
                                let newF = []
                                for(let i = 0; i <f.files.length; i++){
                                    newF.push(URL.createObjectURL(f.files[i]))
                                }
                                console.log(newF)
                                setProductimgs([...productimgs,...newF]);
                            }}/>
                        <Grid item md={5}
                            onClick={()=>{document.getElementById('product-imgs').click()}}
                            sx={{  
                                height: '128px', 
                                margin:'4px',
                                border: '1px solid black',
                                borderRadius: '8px',
                                display:'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >
                              <AddIcon sx={{
                                ":hover":{
                                    opacity:'0.7',
                                    cursor: 'pointer'
                                }
                              }}
                              />  
                            </Grid>
                    </Grid>
                </Grid>
                <Grid item
                md={7}
                sx={{paddingLeft:'20px',paddingRight:'20px'}}>
                    {newDetails &&  <Box component="form" sx={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        width:'100%'
                    }}>
                        <TextField required id='title' label="Product Title"  value={newDetails.title}
                        sx={{
                        width:'50%',
                        marginTop: '15px'
                        }}
                        onChange={(event)=>{
                            setNewDetails({
                                ...newDetails,
                                title:event.target.value})
                        }}
                        />
                        <TextField required id='description' label="Product Description"  multiline maxRows={2} value={newDetails.description} 
                        sx={{
                        width:'50%',
                        marginTop: '15px'
                        }}
                        onChange={(event)=>{
                            setNewDetails({
                                ...newDetails,
                                description:event.target.value})
                        }}
                        />
                        <TextField required id='domain' label="Domain"  value={newDetails.domain}
                        sx={{
                        width:'50%',
                        marginTop: '15px'
                        }}
                        onChange={(event)=>{
                            setNewDetails({
                                ...newDetails,
                                domain:event.target.value})
                        }}
                        />
                        <TextField type='currency' id='amount'  required label='Amount' variant='outlined' value={newDetails.price}
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
                        }}
                        onChange={(event)=>{
                            setNewDetails({
                                ...newDetails,
                                price:event.target.value})
                        }}
                        />
                        <Grid container sx={{width:'50%',textAlign:'center',paddingTop:'20px'}}>
                            <Grid item md={3} >
                            <Typography >S.No.</Typography>
                            </Grid>
                            <Grid item md={4} >
                            <Typography>Features</Typography>
                            </Grid>
                            <Grid item md={4} >
                            <Typography>Details</Typography>
                            </Grid>
                            <Grid item md={2} >
                            
                            </Grid>
                            <Grid container sx={{textAlign:'center',paddingTop:'20px' }}>
                                {newDetails.attribute[0]!=="" && newDetails.attribute.map((feature,index)=>{
                                    return <>
                                    <Grid item md={3} sx={{paddingTop:'10px'}}>
                                        <Typography>{index+1}</Typography>
                                    </Grid>
                                    <Grid item md={4} sx={{paddingTop:'10px'}}>
                                        <Typography>{feature}</Typography>
                                    </Grid>
                                    <Grid item md={4} sx={{paddingTop:'10px'}}>
                                        <Typography>{newDetails.val[index]}</Typography>
                                    </Grid>
                                    <Grid item md={1} sx={{paddingTop:'10px'}}>
                                    <DeleteIcon sx={{
                                        ":hover":{
                                            opacity:'0.7',
                                            cursor: 'pointer'
                                        }
                                    }}
                                    onClick={()=>{
                                        setNewDetails({
                                            ...newDetails,
                                            attribute: newDetails.attribute.filter((e,i)=>i!==index),
                                            val: newDetails.val.filter((e,i)=>i!==index)
                                        })
                                    }}
                                    /> 
                                    </Grid>
                                </>
                                })}
                                {newDetails.attribute[0]==="" && <Typography sx={{textAlign:'center',width:'100%',paddingRight:'30px'}}>No Information Available</Typography>}
                               {newDetails && 
                               <><Grid item md={3} className='sno' sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    <Typography sx={{padding:'1px'}}>{newDetails.attribute.length+1}</Typography>
                                </Grid>
                                <Grid item md={4} sx={{padding:'5px'}}>
                                    <TextField sx={{padding:'1px'}} variant='standard' id='newattribute'></TextField>          
                                </Grid>
                                <Grid item md={4} sx={{padding:'5px'}}>
                                    <TextField sx={{padding:'1px'}} variant='standard' id='newval' ></TextField>
                                </Grid>
                                <Grid item sx={{display:'flex',justifyContent:'center',alignItems:'center'}} md={1}>
                                    <AddIcon sx={{
                                        border:'2px solid black',
                                        ':hover':{opacity:'0.7'},
                                        cursor:'pointer'
                                    }} onClick={()=>{
                                        let newatt = document.getElementById('newattribute')
                                        let newval = document.getElementById('newval')
                                        setNewDetails({
                                            ...newDetails,
                                            attribute:  [ ...newDetails.attribute,
                                            newatt.value ],
                                            val:  [ ...newDetails.val,
                                                newval.value ]
                                        })
                                        newatt.value=''
                                        newval.value = ''
                                    }} />
                                </Grid>
                                </>}
                            </Grid>
                        </Grid>
                    </Box>}
                </Grid>
            </Grid>
            <Grid container>
                <Grid item md={5}></Grid>
                <Grid item md={2}> <Button onClick={saveChanges}>Save Changes</Button></Grid>
                <Grid item md={5}></Grid>
            </Grid>
        </div>
    </>
  )
}