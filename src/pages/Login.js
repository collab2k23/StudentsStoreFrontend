import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../assets/img/logo.png'
import { loginUser, resetStatus } from '../features/user/userSlice';
import { useState , useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Alert from '../component/Alert';


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

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector(state => state.user)
  const [ alert, setAlert ] = useState('')
  const [user,setUser]=useState({
    email:'',
    password:'',
  })  

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(user))
  }
  
  useEffect(()=>{
    if(data.resStatus==='ok'){
      localStorage.setItem('token',data.token)
      navigate('/')
      dispatch(resetStatus())
    }else{
      setAlert(data.msg)
    }
  },[ data, navigate, dispatch ])

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
                    Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        value={user.email}
                        onChange={e=>setUser({
                          ...user,
                          email:e.target.value
                        })}
                        />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={e=>setUser({
                          ...user,
                          password:e.target.value
                        })}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                        />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        LogIn
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Register"}
                        </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
                </Grid>
            </Grid>
        </div>
    </ThemeProvider>
  );
}