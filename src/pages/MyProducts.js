import React, { useEffect , useState } from 'react'
import { drawercontent, getmyproducts } from '../features/application/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import { Box ,Grid , Avatar , Typography , Card , CardHeader, CardMedia, CardContent , CardActions  ,IconButton ,Drawer } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddItem from './AddItem';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useTheme } from '@mui/material/styles';
import { url } from '../features/user/userSlice';
import EditIcon from '@mui/icons-material/Edit';


export default function MyProducts() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  
  const myproducts=useSelector(state=>state.app.myproducts)
  const contents=useSelector(state=>state.app.drawer)
  const [drawer,setDrawer]=useState(false)
  const [mode,setMode]=useState('display')
  const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(getmyproducts())
    },[dispatch])
  const drawermode=()=>{
    if(drawer===true)
      setDrawer(false)
    else
      setDrawer(true)
  }

  const list = () => {
    const images = contents?contents.img.map((content)=>{
      return {
        imgPath: url+content
      }
    }):[]
    
    
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
              {images.map((step, index) => (
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
              <MobileStepper
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
              />
              
              {contents && <>
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
                {contents.attribute && contents.attribute.map((feature,index)=>{
                  return<>
                    <Grid item md={4} sx={{padding:'10px',backgroundColor:'#ced4da',textAlign:'center',borderBottom:'1px solid black'}}>
                      <Typography>{feature}</Typography>
                    </Grid>
                    <Grid item md={8} sx={{padding:'10px',backgroundColor:'white',textAlign:'center',borderBottom:'1px solid black'}}>
                      <Typography>{contents.val[index]}</Typography>
                    </Grid>
                  </>
                })}
              </Grid>
            </Grid>}
          </Grid>
          <Box sx={{
            position:'absolute',
            bottom:'20px',
            right:'20px'}}>
            <Avatar>
              <EditIcon/>
            </Avatar>
          </Box>
      </Box>)};

  return (
    <>
    {mode==='display' && <div style={{height:'100%'}}>
    
    <Box sx={{height:'90%'}} >
      <Grid container sx={{height:'100%',overflowY:'scroll'}}>

       {myproducts && myproducts.map((product)=>{
        const d=new Date(product.createdAt)
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const str=d.getDate()+'-'+months[d.getMonth()]+'-'+d.getFullYear()
       return <Grid item md={3} sx={{padding:'15px'}}>

    <Card sx={{ maxWidth: 345,maxHeight:345 }}>
      <CardHeader
        title={product.title}
        subheader={str}
      />
      <CardMedia
        component="img"
        height="128"
        image={url+product.img[0]}
        alt='product image'
      />
      <CardContent>
        {product.description && <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>}
      </CardContent>
      <CardActions disableSpacing>
          <Grid container>
            <Grid item md={6}>
            <Typography variant="h6" color="black">
            ₹ {product.price}
            </Typography>
            </Grid>
            <Grid item md={6} sx={{display:'flex',justifyContent:'flex-end'}}>
              <IconButton aria-label="delete"  onClick={()=>{
                dispatch(drawercontent(product))
                drawermode()
                console.log(drawer)}}>
                <ChevronRightIcon />
              </IconButton>
            </Grid>
          </Grid>
       </CardActions>
      <Drawer
        open={drawer}
        onClose={drawermode}
        anchor='right'
            
       >
        {list()}
      </Drawer>
    </Card>
        </Grid>
})}
      </Grid>
    </Box>
    <Box sx={{display:'flex',justifyContent:'end',alignItems:'flex-end',marginRight:'20px'}}>
      <Avatar sx={{bgcolor:'#2e2e2e'}} onClick={()=>setMode('additem')}><AddIcon/></Avatar>
    </Box>
    </div>}
    {mode==='additem' && <AddItem  changeMode={setMode} />}
    </>
  )
}
