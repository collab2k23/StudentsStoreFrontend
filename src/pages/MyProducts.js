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
// import { url } from '../features/user/userSlice';


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
        imgPath: content
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
          <Grid container sx={{height:'50%'}}>
            <Grid item md={5}>
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
                  height: 255,
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
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
            </Grid>
          </Grid>
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
        height="100"
        image={product.img[0]}
        alt="Paella dish"
      />
      <CardContent>
        {product.description && <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>}
        <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing
      sx={{display:'flex',justifyContent:'right'}}
      >
        
          <IconButton aria-label="delete"  onClick={()=>{
            dispatch(drawercontent(product))
            drawermode()
            console.log(drawer)}}>
        <ChevronRightIcon />
      </IconButton>
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
