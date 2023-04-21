import React from 'react'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import Account from './Accounts/Account'
import MyProducts from './MyProducts/MyProducts'
import SearchedItem from './Search/SearchedItem'
import Cart from './Cart/Cart'
import Chat from './Chat/Chat'
import SellerChat from './Chat/SellerChat'

export default function ContentArea() {
  const currentMenu=useSelector(state=>state.app.currentMenu)
  return (
    <Paper elevation={24} sx={{
      height: '100%',
      overflowY:'scroll',
      marginBottom:'15px'
    }}>
    {currentMenu==='account' && <Account/>}
    {currentMenu==='myproducts' && <MyProducts/>}
    {currentMenu==='search' && <SearchedItem/>}
    {currentMenu==='cart' && <Cart/>}
    {currentMenu==='buyerchat' && <Chat/>}
    {currentMenu==='sellerchat' && <SellerChat/>}
    </Paper>
  )
}
