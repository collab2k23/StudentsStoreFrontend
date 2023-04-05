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
// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@mui/material/styles';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }


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
  
    // const handleStepChange = (step) => {
    //   setActiveStep(step);
    // };
    return (<Box sx={{width:'900px'}}>
          <Grid container sx={{height:'50%'}}>
            <Grid item md={5 }>
            {images.map((step, index) => (
          <div key={Math.random()}>
            {index === activeStep ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                
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

       {myproducts && myproducts.map((product)=><Grid item md={3} sx={{padding:'15px'}}>

    <Card sx={{ maxWidth: 345,maxHeight:345 }}>
      <CardHeader
        title={product.title}
        subheader={product.createdAt}
      />
      <CardMedia
        component="img"
        height="100"
        image="imageurl"
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
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <ExpandMoreIcon />
          </ExpandMore> */}
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
      {/*<Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
          Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
          medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
          occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
          large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
          </Typography>
          <Typography>
          </Typography>
          </CardContent>
        </Collapse> */}
    </Card>
        </Grid>
)}
      </Grid>
    </Box>
    <Box sx={{display:'flex',justifyContent:'end',alignItems:'flex-end',marginRight:'20px'}}>
      <Avatar sx={{bgcolor:'#2e2e2e'}} onClick={()=>setMode('additem')}><AddIcon/></Avatar>
    </Box>
    </div>}
    {mode==='additem' && <AddItem />}
    </>
  )
}
