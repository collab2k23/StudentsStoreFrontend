import React,{useState} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Box, Paper, Typography, Grid, TextField } from '@mui/material'
import './component.css'
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferSharpIcon from '@mui/icons-material/LocalOfferSharp';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SearchIcon from '@mui/icons-material/Search';
import InventoryIcon from '@mui/icons-material/Inventory';
import { changeMenu, searchedproducts } from '../features/application/appSlice';

export default function Menu() {
  const dispatch = useDispatch()
  const currentMenu = useSelector(state => state.app.currentMenu)
  const userMode=useSelector(state=>state.user.userMode)
  const [searchKey,setSearchkey] = useState("")
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
    {userMode==='BUY' &&<Box sx={{
        px: '8px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
         <Grid container>
          <Grid item md={10} sx={{paddingRight:'10px'}}>
          <TextField id="outlined-basic" label="Search" variant="filled" value={searchKey} onChange={e=>setSearchkey(e.target.value)}
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
            <SearchIcon onClick={()=>{
              dispatch(changeMenu('search'))
              dispatch(searchedproducts(searchKey))
              
            }} className='searchIcon' fontSize='large' />
          </Grid>
        </Grid>
      </Box>}
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
      {userMode==='BUY' && <Box className='menuOptions'
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
      </Box>}
      {userMode==='SELL' && <Box className='menuOptions'
       onClick={()=>dispatch(changeMenu('myproducts'))}
       sx={{ 
        borderLeft: currentMenu==='myproducts'?'3px solid white':'none',
        backgroundColor: currentMenu==='myproducts'?'#7a7a7a':'none'
      }}
       > 
        <Grid container>
          <Grid item md={9}>
            <Typography className='menuText'>My Products</Typography>
          </Grid>
          <Grid item md={3}>
            <InventoryIcon className='menuIcon' />
          </Grid>
        </Grid>
      </Box>}
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
