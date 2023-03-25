import React from 'react'
import Navbar from '../component/Navbar'
import { Grid } from '@mui/material/'
import { useSelector } from 'react-redux'
import Menu from '../component/Menu'
import ContentArea from './ContentArea'

export default function Home() {
  const loading=useSelector(state=>state.user.loading)
  return (
    <>
    {!loading && 
      <div style={{
        height:'100vh'
      }}>
       <Navbar />
        <div style={{
          paddingTop: '50px',
          height: '100%'
        }}>
          <Grid container 
          sx={{
            height:'100%'
          }}>
              <Grid item md={2} sx={{height:'100%'}}>
                <Menu />
              </Grid>
              <Grid item md={10} sx={{height:'100%',padding:'10px'}}>
                <ContentArea />
              </Grid>
          </Grid>
        </div>
      </div>}
    </>
  )
}
