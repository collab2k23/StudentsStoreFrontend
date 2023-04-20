import React , {useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box ,Grid , Avatar , Typography ,Drawer, Paper, Button } from '@mui/material';
import { url } from '../../features/user/userSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import { drawercontent } from '../../features/application/appSlice';
import axios from 'axios';
import Alert from '../../component/Alert';
import SendIcon from '@mui/icons-material/Send';


export default function SearchedItem() {
  const products = useSelector(state=>state.app.products)
  const theme = useTheme();
  const [ alert, setAlert ] = useState('')
  const [ alertType, setAlertType] = useState('')
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch()
  const [drawer,setDrawer]=useState(false)
  const [address,setAddress] = useState(null)
  const contents=useSelector(state=>state.app.drawer)
  const drawermode=()=>{
    if(drawer===true)
      setDrawer(false)
    else
      setDrawer(true)
  }

  const list = () => {
    const d = new Date(contents.createdAt)
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];
    const str = d.getDate()+'-'+months[d.getMonth()]+'-'+d.getFullYear()
    
    const images = contents?contents.img?contents.img.map((content)=>{
      return {
        imgPath: url+content
      }
    }):[]:[]
    
    
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    
    
    return (<Box sx={{width:'900px'}}>
          <Grid container sx={{height:'50%',padding:'25px'}}>
            <Grid item md={5} sx={{display:'flex',flexDirection:'column'}}>
              {images && images.map((step, index) => (
                <div key={Math.random()}>
                {index === activeStep ? (
                  <Box
                    sx={{
                      backgroundImage:`url(${step.imgPath})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      height: 256,
                      display: 'block',
                      overflow: 'hidden',
                      width: '100%',
                    }}
                  />
                ) : null}
                </div>
              ))}
              {images.length!==0 &&<MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={<Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>}
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                  </Button>}
              />}
              {images && images.length===0 &&<> <Box
              sx={{
                backgroundImage:'url(https://tse2.mm.bing.net/th?id=OIP.kz5xzTb9k_VVR_f5ykCL0gHaHa&pid=Api&P=0)',
                backgroundRepeat: 'no-repeat',
                      backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      height: '256px',
                      display: 'block',
                      overflow: 'hidden',
                      width: '100%',
              }}
              />
              <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={<Button
                    size="small"
                    onClick={handleNext}
                    disabled
                  >
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                    ) : (
                      <KeyboardArrowRight />
                    )}
                  </Button>}
                backButton={
                  <Button size="small" onClick={handleBack} disabled>
                    {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                    ) : (
                      <KeyboardArrowLeft />
                    )}
                  </Button>}
              />
              </>}
              
              {contents && <>
              <Typography variant='subtitle1' sx={{padding:'10px'}}>Created At : {str}</Typography>
              <Typography variant='h4' sx={{padding:'10px'}}>{contents.title}</Typography>
              <Typography variant='h5' sx={{padding:'10px'}}>₹{contents.price}</Typography>
              <Typography variant='subtitle2' sx={{padding:'10px'}}>Category : {contents.domain}</Typography>
              <Typography variant='subtitle1' sx={{padding:'10px'}}>{contents.description}</Typography>
              </> 
              }
            </Grid>
            {contents && <Grid item md={7} sx={{display:'flex',flexDirection:'column',padding:'25px'}}>
              <Typography variant='h5' sx={{textAlign:'center',paddingBottom:'20px'}}>Product Information</Typography>
              <Grid container sx={{paddingLeft:'30px'}}>
                {contents.attribute[0]!=="" && contents.attribute.map((feature,index)=>{
                  return<>
                    <Grid item md={4} sx={{padding:'10px',backgroundColor:'#ced4da',textAlign:'center',borderBottom:'1px solid black'}}>
                      <Typography>{feature}</Typography>
                    </Grid>
                    <Grid item md={8} sx={{padding:'10px',backgroundColor:'white',textAlign:'center',borderBottom:'1px solid black'}}>
                      <Typography>{contents.val[index]}</Typography>
                    </Grid>
                  </>
                })}
                {contents.attribute[0]==="" && <Typography sx={{textAlign:'center',width:'100%',paddingRight:'30px'}}>No Information Available</Typography>}
              </Grid>
                <Typography variant='h5' sx={{marginTop:'25px'}}> Seller Details -</Typography>
                {address && <>
                {address.city && <Typography>City: {address.city}</Typography>}
                {address.district && <Typography>District : {address.district}</Typography>}
                {address.state && <Typography>State : {address.state}</Typography>}
                {address.pincode && <Typography>Pincode : {address.pincode}</Typography>}
                {address.address && <Typography>Address : {address.address}</Typography>}
                </>}
                {!address && <Typography>No details Available</Typography>}
            </Grid>}
            
             
              
          </Grid>
          <Box id='newchat' component={ Paper } sx={{
            position: 'absolute',
            bottom:'70px',
            right:'40px',
            padding:'10px',
            border: '1px solid black',
            display: 'none',
            backgroundColor: '#efefef',
          }}>
            <Typography variant='subtitle2'>Message:</Typography>
            <div>
              <input type='text' />
              <Box sx={{
                display:'inline-block', 
                margin: 'auto 8px',
                padding: '3px', 
                border:'1px solid black', 
                borderRadius:'2px',
                cursor: 'pointer'
                }}> <SendIcon/> </Box>
            </div>
          </Box>
          <Box sx={{
            position:'absolute',
            bottom:'20px',
            right:'20px',
            ":hover":{cursor:'pointer'}
          }}
          onClick={()=>{
            document.getElementById('newchat').style.display = 'block'
          }}
            >
            <Avatar>
              <QuestionAnswerIcon/>
            </Avatar>
          </Box>
          <Box sx={{
            position:'absolute',
            bottom:'20px',
            right:'70px',
            ":hover":{cursor:'pointer'}
            }}
            onClick={async()=>{
              drawermode()
              const config={
                headers:{
                  'x-access-token':localStorage.getItem('token'),
                  'Content-Type':'application/json'
                }
              }
              axios.post(url+'/product/addtocart',{productid:contents._id},config)
              .then(response=>{
                console.log(response.data)
                if(response.data.status==='error'){
                  setAlert('Already in cart')
                  setAlertType('warning')
                  setTimeout(()=>{
                    setAlert('')
                    setAlertType('')
                  },3000)
                }
                else{
                  setAlert('Added to cart')
                  setAlertType('success')
                  setTimeout(()=>{
                    setAlert('')
                    setAlertType('')
                  },3000)
                }
              })
            }}
            >
            <Avatar>
              <ShoppingCartIcon />
            </Avatar>
          </Box>
      </Box>)};

      
  return (
    <>
    <Alert type={ alertType } msg={ alert }/>
    <div style={{height:'100%'}}>
    
      <Box sx={{height:'90%'}} >

        {products && products.map((product,index)=>{
          
          return     (
          <Box component={Paper} elevation={3} style={{
            height: '30vh',
            
            borderRadius: "3px",
            margin: "20px 40px",
            display: "flex",
            flexdirection: "row",
            alignitems: "center",
            position:'relative'
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
            <div style={{display:'flex', flexDirection:'column',justifyContent:'left',alignItems:'flex-start'}}>
              <Button sx={{height:'33%'}} 
              onClick={async()=>{
                const config={
                  headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'Content-Type':'application/json'
                  }
                }
                axios.post(url+'/product/addtocart',{productid:product._id},config)
                .then(response=>{
                  console.log(response.data)
                  if(response.data.status==='error'){
                    setAlert('Already in cart')
                    setAlertType('warning')
                    setTimeout(()=>{
                      setAlert('')
                      setAlertType('')
                    },3000)
                  }
                  else{
                    setAlert('Added to cart')
                    setAlertType('success')
                    setTimeout(()=>{
                      setAlert('')
                      setAlertType('')
                    },3000)
                  }
                })
              }}>
                <Box sx={{margin:'5px',backgroundColor:'grey',padding:'10px',color:'white',borderRadius:'50%'}}><ShoppingCartIcon/></Box>
                <Typography>Add To Cart</Typography>
              </Button>
              <Button sx={{height:'33%'}}>
                <Box sx={{margin:'5px',backgroundColor:'grey',padding:'10px',color:'white',borderRadius:'50%'}}><QuestionAnswerIcon/></Box>
                <Typography>Chat</Typography>
              </Button>
              <Button sx={{height:'33%', position:'absolute',right:'5px',bottom:'5px',borderRadius:'50%'}} onClick={async()=>{
                drawermode()
                dispatch(drawercontent(product))
                const config={
                  headers:{
                    'x-access-token':localStorage.getItem('token'),
                    'Content-Type':'application/json'
                  }
                }
                axios.post(url+'/product/getaddress',{addressid:product.address},config)
                .then(res=>{console.log(res.data)
                      setAddress(res.data.address)
                })

              }} >
                <Box sx={{padding:'10px',color:'black',borderRadius:'50%'}}><KeyboardDoubleArrowRightIcon/></Box>
                {/* <Typography>view more</Typography> */}
              </Button>
            </div>
          </Box>
          )
          
  })}
      </Box>
      {/* <Box sx={{display:'flex',justifyContent:'end',alignItems:'flex-end',marginRight:'20px'}}>
        <Avatar sx={{bgcolor:'#2e2e2e'}} onClick={()=>setMode('additem')}><AddIcon/></Avatar>
      </Box> */}
     <Drawer
          open={drawer}
          onClose={drawermode}
          anchor='right'  
         >
          {list()}
        </Drawer> 
      
    </div>
    </>
  )
}
