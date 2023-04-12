import React from 'react'
import { useSelector } from 'react-redux'
import { Box ,Grid , Avatar , Typography , Card , CardHeader, CardMedia, CardContent , CardActions  ,IconButton ,Drawer } from '@mui/material';
import { url } from '../../features/user/userSlice';

export default function SearchedItem() {
  const products=useSelector(state=>state.app.myproducts)


  return (
    <>
    <div style={{height:'100%'}}>
    
      <Box sx={{height:'90%'}} >
        <Grid container sx={{height:'100%',overflowY:'scroll'}}>

        {products && products.map((product)=>{
          const d=new Date(product.createdAt)
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const str=d.getDate()+'-'+months[d.getMonth()]+'-'+d.getFullYear()
          return <Grid item md={12} sx={{height:'20%'}}>
            <Grid item md={4} >
              <Box component='img'  src={product.img[0]?url+product.img[0]:'https://tse2.mm.bing.net/th?id=OIP.kz5xzTb9k_VVR_f5ykCL0gHaHa&pid=Api&P=0'}></Box>
            </Grid>
            <Grid item md={5} sx={{padding:'10px'}}>  
              {product.description && <Typography variant="body2" color="text.secondary">
              {product.description.length>75?product.description.substr(0,75)+'....':product.description}
    +         </Typography>}
            </Grid>
          </Grid>
  })}
        </Grid>
      </Box>
      {/* <Box sx={{display:'flex',justifyContent:'end',alignItems:'flex-end',marginRight:'20px'}}>
        <Avatar sx={{bgcolor:'#2e2e2e'}} onClick={()=>setMode('additem')}><AddIcon/></Avatar>
      </Box> */}
    </div>
    </>
  )
}
