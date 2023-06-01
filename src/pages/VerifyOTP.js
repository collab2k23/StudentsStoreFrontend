import React, {  useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../assets/img/logo.png'
import Alert from '../component/Alert';
import { url } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/" sx={{ fontFamily: 'Dancing Script', fontSize:'20px' }}>
          Student Store
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const theme = createTheme();

export default function VerifyOTP() {
    const [alert,setAlert]=useState('')
    const [otp,setOtp]=useState('')
    const Navigate=useNavigate()
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const res= await fetch(url+'/api/verifyOTP',{
            method:"POST",
            headers:{
                "x-access-token":localStorage.getItem('token'),
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                'otp':otp,
            }),
        })
        const data=await res.json()
        if(data.status==='ok')
            Navigate('/')
        else{
            setAlert(data.msg)
            setTimeout(()=>{
                setAlert('')
            },5000)
        }
    }
  return (
    <ThemeProvider theme={theme}>
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
          <Alert type='danger' msg={ alert }/>
            <Grid container component="main" sx={{ height: '90%', width:'90%' }}>
                <CssBaseline />
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://c1.wallpaperflare.com/preview/294/960/948/university-student-graduation-photo-hats.jpg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    }}
                    />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Grid container sx={{height:'100%',width:'100%'}}>
                        <Grid item sx={{width:'100%',height:'75%'}}>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar src={logo} sx={{ m: 1, border:'1px solid gray' }} />
                    <Typography component="h1" variant="h5">
                    Verify Email
                    </Typography>
                    <Typography component="h1" variant="subtitle1" sx={{color:'green'}}>
                    OTP sent to your provided email
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="otp"
                            label="Enter OTP"
                            name="otp"
                            type="otp"
                            autoComplete="otp"
                            autoFocus
                            value={otp}
                            onChange={e=>setOtp(e.target.value)}
                            />
                        
                        <Link href="/register" variant="body2">
                            {"Resend OTP"}
                        </Link>
                    
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Verify OTP
                        </Button>
                        <Grid container sx={{ mt:'2vh' }}>
                            <Grid item xs>
                            <Link href="/login" variant="body2">
                                Login Here !
                            </Link>
                            </Grid>
                            <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Register"}
                            </Link>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Box>
                    </Grid>
                    <Grid item sx={{
                        display:'flex',
                        alignItems:'center',
                        width:'100%',
                        height:'25%',
                        justifyContent:'center'
                    }}>
                        <Box>
                    <Copyright sx={{ mt: 5 }} />
                    </Box>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </ThemeProvider>
      
    
  )
}
