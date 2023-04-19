import React from 'react'
import { useSelector } from 'react-redux'
import { Box ,Grid , Avatar , Typography , Card , CardHeader, CardMedia, CardContent , CardActions  ,IconButton ,Drawer } from '@mui/material';
import { url } from '../../features/user/userSlice';

export default function SearchedItem() {
  const products = useSelector(state=>state.app.products)

  return (
    <>
    <div style={{height:'100%'}}>
    
      <Box sx={{height:'90%'}} >

        {products && products.map((product,index)=>{
          const d=new Date(product.createdAt)
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          const str=d.getDate()+'-'+months[d.getMonth()]+'-'+d.getFullYear()
          return     (
          <div style={{
            height: '30vh',
            border: '1px solid black',
            borderRadius: "3px",
            margin: "20px 40px",
            display: "flex",
            flexdirection: "row",
            alignitems: "center",
          }}>
            <div style={{
              height: "100%",
              width: "25%",
              margin: '0px 5px',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition:'center',
              backgroundImage: `url('${product.img[0]?url+product.img[0]:'https://tse2.mm.bing.net/th?id=OIP.kz5xzTb9k_VVR_f5ykCL0gHaHa&pid=Api&P=0'}')`
            }}>
              
            </div>
            <div style={{
              padding: '30px 10px',
              width: "25%",
            }}>
            {product.title && <Typography variant='h4'>{product.title}</Typography>}
            {product.domain && <Typography variant='subtitle1'><li>{product.domain}</li></Typography>}
            <hr/>
            {product.price && <Typography variant='subtitle1'>₹{product.price}</Typography>}
              
            </div>
            <div style={{
              padding: '30px 10px',
              width: "25%",
            }}>
            {product.description && 
              <Typography variant="body2" color="text.secondary">
                {product.description.length>75?product.description.substr(0,75)+'...':product.description}
              </Typography>}
            </div>
          </div>)
  })}
      </Box>
      {/* <Box sx={{display:'flex',justifyContent:'end',alignItems:'flex-end',marginRight:'20px'}}>
        <Avatar sx={{bgcolor:'#2e2e2e'}} onClick={()=>setMode('additem')}><AddIcon/></Avatar>
      </Box> */}
      
    </div>
    </>
  )
}
