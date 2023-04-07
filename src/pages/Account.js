import { Avatar , Box , Grid , TextField , SpeedDial , SpeedDialAction } from '@mui/material'
import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import DoneIcon from '@mui/icons-material/Done';
import axios from 'axios';
import { url } from '../features/user/userSlice';
import { updateAvatar } from '../features/user/userSlice';


const actions = [
  { icon: <UploadIcon />, name: 'Upload Image', onClick: ()=>{
    document.getElementById('profile-pic').click()
  } },
  { icon: <DeleteIcon />, name: 'Remove Image' }
];


export default function Account() {
  const user=useSelector(state=>state.user.user)
  const [upicon,setUpicon] = useState('gray') 
  const dispatch=useDispatch()
  const [image,setImage]=useState({
    file:null
  })
  return (
    <>
        <Grid container 
        sx={{paddingTop:'20px'}}>
            <Grid item md={4}
                sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
            }}
            >
                <Avatar sx={{width:'256px',height:'256px'}} src={user ? url+'/'+user.avatar:''} ></Avatar>
                <Box
                  sx={{
                    width:'100%',
                    paddingTop:'20px',
                    display:'flex',
                    justifyContent:'center'
                  }}
                > 

                    <input type='file' name='profile' id='profile-pic' style={{ display:'none' }} onChange={(e)=>{
                      if(e.currentTarget.value!==null){
                        setUpicon('#1976d2')
                        setImage({'file':e.target.files[0]})
                      }else     
                        setUpicon('grey')
                    }} />
                    <SpeedDial
                      ariaLabel="SpeedDial basic example"
                      icon={<ImageIcon/>}
                      direction='down'
                    >
                      {actions.map(action=>
                        <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.onClick}
                        />
                      )}
                    </SpeedDial>
                    <Avatar sx={{
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
                        form.append('profile',image.file)
                        axios.post(url+'/upload/profile',form,config)
                        .then(response=>{
                          if(response.data.status==='ok')
                            dispatch(updateAvatar(response.data.avatarUrl))
                        })
                        
                      }}>
                        <DoneIcon />
                      </Avatar>
                  </Box>
            </Grid>
            <Grid item md={7}
            sx={{display:'flex',
            justifyContent:'center',
            alignItems:'center',
            flexDirection:'column',
            }}>
              <TextField 
              variant='standard'
              value={user===null?'':user.firstName+' '+user.lastName}
              label='Name'
              sx={{
                height:'50%',
                width:'100%',
                border:'none',
              }}
              />
              <TextField
              variant='standard'
              value={user===null?'':user.username}
              label='Username'
              sx={{
                height:'50%',
                width:'100%',
                border:'none'
              }}
              />
              <TextField
              variant='standard'
              value={user===null?'':user.phoneno}
              label='Phone Number'
              sx={{
                height:'50%',
                width:'100%',
                border:'none'
              }}
              />
              <TextField
              variant='standard'
              value={user===null?'':user.email}
              label='Email Address'
              sx={{
                height:'50%',
                width:'100%',
                border:'none'
              }}
              />
        
            <TextField
                variant='standard'
                value={user===null?'Fillup Your Address':user.address}
                label='Address'
                sx={{
                  height:'50%',
                  width:'100%',
                  border:'none'
                }}/>
                <TextField
                variant='standard'
                value={user===null?'':user.city}
                label='City'
                sx={{
                  height:'50%',
                  width:'100%',
                  border:'none'
                }}
                />
                <TextField
                variant='standard'
                value={user===null?'':user.district}
                label='District'
                sx={{
                  height:'50%',
                  width:'100%',
                  border:'none'
                }}
                />
                <TextField
                variant='standard'
                value={user===null?'':user.state}
                label='State'
                sx={{
                  height:'50%',
                  width:'100%',
                  border:'none'
                }}
                />
                </Grid>
                  <Grid item 
                  md={1}
                  sx={{display:'flex',
                  justifyContent:'center',
                  alignItems:'end'
                  }}>
                    <Avatar sx={{
                      backgroundColor:'#1976D2'
                    }}>
                      <EditIcon/>
                    </Avatar>
                  </Grid>
          
                  </Grid>
    </>
  )
}
