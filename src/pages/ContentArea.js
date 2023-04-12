import React from 'react'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import Account from './Accounts/Account'
import MyProducts from './MyProducts/MyProducts'
import SearchedItem from './Search/SearchedItem'

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
    </Paper>
  )
}
