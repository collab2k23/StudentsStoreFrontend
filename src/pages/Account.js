import { Avatar , Box , Grid , TextField , SpeedDial , SpeedDialAction } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';


const actions = [
  { icon: <UploadIcon />, name: 'Upload Image' },
  { icon: <DeleteIcon />, name: 'Remove Image' }
];


export default function Account() {
  const user=useSelector(state=>state.user.user)
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
                <Avatar sx={{width:'256px',height:'256px'}}></Avatar> 
                <Box
                  sx={{
                    width:'100%',
                    paddingTop:'20px',
                  //   display:'flex',
                  //   justifyContent:'left'
                  }}
                >
                  <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    icon={<ImageIcon/>}
                    direction='down'
                  >
                    
                      <SpeedDialAction
                        key={actions[0].name}
                        icon={actions[0].icon}
                        tooltipTitle={actions[0].name}
                        onClick={actions[0].onClick}
                      />
                  </SpeedDial>
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
