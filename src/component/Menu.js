import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Paper, Typography, Grid, TextField } from '@mui/material'
import './component.css'
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SearchIcon from '@mui/icons-material/Search';
import { changeMenu } from '../features/application/appSlice';

export default function Menu() {
  const dispatch = useDispatch()
  const currentMenu = useSelector(state => state.app.currentMenu)
  return (
  <Box
  sx={{
    backgroundColor:'#2e2e2e',
    height:'100%',
    borderRight: '1px solid white',
    display: 'flex',
    flexDirection:'column',
    alignItems: 'center',
    paddingTop: '10px',
  }}
  >
    <Box sx={{
        px: '8px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Grid container>
          <Grid item md={10} sx={{paddingRight:'10px'}}>
          <TextField id="outlined-basic" label="Search" variant="filled" 
          sx={{
            height: '90%',
            bgcolor: '#aeb0b1',
            borderRadius:'12px',
          }}
          />
          </Grid>
          <Grid className='searchButton' item md={2} sx={{
            display: 'flex',
            alignItems:'center',
            justifyContent:'center'
          }}>
            <SearchIcon className='searchIcon' fontSize='large' />
          </Grid>
        </Grid>
      </Box>
    <Box component={ Paper }
    className='menuParent'
    sx={{
      backgroundColor:'#2e2e2e',
      height:'100%',
      width:'100%',
      display: 'flex',
      flexDirection:'column',
      alignItems: 'center',
    }}
    >
      <Box className='menuOptions'
       onClick={()=>dispatch(changeMenu('chats'))}
       sx={{ 
        borderLeft: currentMenu==='chats'?'3px solid white':'none',
        backgroundColor: currentMenu==='chats'?'#7a7a7a':'none'
      }}
       >
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Chats</Typography>
          </Grid>
          <Grid item md={3}>
            <ChatBubbleRoundedIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'
       onClick={()=>dispatch(changeMenu('cart'))}
       sx={{ 
        borderLeft: currentMenu==='cart'?'3px solid white':'none',
        backgroundColor: currentMenu==='cart'?'#7a7a7a':'none'
      }}
       >
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Cart</Typography>
          </Grid>
          <Grid item md={3}>
            <ShoppingCartIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'
       onClick={()=>dispatch(changeMenu('orders'))}
       sx={{ 
        borderLeft: currentMenu==='orders'?'3px solid white':'none',
        backgroundColor: currentMenu==='orders'?'#7a7a7a':'none'
      }}
       >
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Orders</Typography>
          </Grid>
          <Grid item md={3}>
            <LocalOfferSharpIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'
       onClick={()=>dispatch(changeMenu('filter'))}
       sx={{ 
        borderLeft: currentMenu==='filter'?'3px solid white':'none',
        backgroundColor: currentMenu==='filter'?'#7a7a7a':'none'
      }}
       >
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Filter</Typography>
          </Grid>
          <Grid item md={3}>
            <FilterAltSharpIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'
       onClick={()=>dispatch(changeMenu('account'))}
       sx={{ 
        borderLeft: currentMenu==='account'?'3px solid white':'none',
        backgroundColor: currentMenu==='account'?'#7a7a7a':'none'
      }}
       > 
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Account</Typography>
          </Grid>
          <Grid item md={3}>
            <SettingsIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Box>
  )
}
