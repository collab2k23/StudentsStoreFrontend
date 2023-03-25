import React from 'react'
import { Box, Paper, Typography, Grid, TextField } from '@mui/material'
import './component.css'
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SearchIcon from '@mui/icons-material/Search';

export default function Menu() {
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
          <Grid item md={2} sx={{
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
      <Box className='menuOptions'>
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Chats</Typography>
          </Grid>
          <Grid item md={3}>
            <ChatBubbleRoundedIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'>
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Cart</Typography>
          </Grid>
          <Grid item md={3}>
            <ShoppingCartIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'>
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Orders</Typography>
          </Grid>
          <Grid item md={3}>
            <LocalOfferSharpIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'>
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>Filter</Typography>
          </Grid>
          <Grid item md={3}>
            <FilterAltSharpIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>
      <Box className='menuOptions'> 
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
