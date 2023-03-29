import React from 'react'
import { Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import Account from './Account'

export default function ContentArea() {
  const currentMenu=useSelector(state=>state.app.currentMenu)
  return (
    <Paper elevation={24} sx={{
      height: '100%',
    }}>
    {currentMenu==='account' && <Account/>}
    </Paper>
  )
}
