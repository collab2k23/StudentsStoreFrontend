import React, { useState, useEffect } from "react";
import Alert from "../component/Alert";
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
import { registerUser, resetStatus} from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MuiPhoneNumber from "mui-phone-number";
import VerifyOTP from "./VerifyOTP";

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

function Register(){
    const [ mode, setMode ] = useState('register')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const data = useSelector(state => state.user)
    const [ alert, setAlert ] = useState('')
    const [ alertType, setAlertType] = useState('danger')
    const [ user, setUser] = useState({
        firstName:'',
        lastName:'',
        username:'',
        password:'',
        email:'',
        address:'',
        city:'',
        state:'',
        pincode:'',
        district:'',
        phoneno:'',
    })
    let handleSubmit = (event)=>{
        event.preventDefault()
        if(user.phoneno.length!==15) {
            setAlertType('danger')
            setAlert("Enter 10 digit phone number")
            setTimeout(()=>{
                setAlert("")
            },5000)
            return 
        }
        if(user.password.length<6){
            setAlertType('danger')
            setAlert("Password must be at least 6 characters")
            setTimeout(()=>{
                setAlert("")
            },5000)
            return
        } 
        if(user.pincode && !(user.pincode.length === 6 && user.pincode>0)){
            setAlertType('danger')
            setAlert("Invalid Pincode")
            setTimeout(()=>{
                setAlert("")
            },5000)
            return
        }
        dispatch(registerUser(user))
    }
    useEffect(() =>{
        console.log(data)
        if(data.resStatus==='ok'){
            localStorage.setItem('token',data.token)
            setMode('verifyotp')
            dispatch(resetStatus())
        }else{
            setAlert(data.msg)
        }
    },[ data, navigate, dispatch ])
    return(
        <>
            <Alert type={ alertType } msg={ alert }/>
            <ThemeProvider theme={theme}>
                { mode==='register' && 
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Grid container component="main" sx={{ width:'90%' }}>
                        <CssBaseline />
                        <Grid
                        item
                        xs={false}
                        sm={4}
                        md={4}
                        sx={{
                            backgroundImage: 'url(https://c1.wallpaperflare.com/preview/294/960/948/university-student-graduation-photo-hats.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            }}
                            />
                        <Grid item xs={12} sm={8} md={8} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            }}
                        >
                            <Avatar src={logo} sx={{ m: 1, border:'1px solid gray' }}/>
                            <Typography component="h1" variant="h5">
                            Register
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <Grid container>
                                    <Grid item md={4} sx={{px: '2px'}}
                                    >
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            name="firstName"
                                            type="text"
                                            autoFocus
                                            value={user.firstName}
                                            onChange={ e=>setUser({
                                                ...user,
                                                firstName: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                    <Grid item md={4} sx={{px: '2px'}}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last name"
                                            name="lastName"
                                            type="text"
                                            autoFocus
                                            value={user.lastName}
                                            onChange={ e=>setUser({
                                                ...user,
                                                lastName: e.target.value
                                            }) }
                                        />
                                    </Grid >
                                    <Grid item md={4} sx={{px: '2px'}}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            type="text"
                                            autoFocus
                                            value={user.username}
                                            onChange={ e=>setUser({
                                                ...user,
                                                username: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                    <Grid item md={7} sx={{px: '2px'}}>
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
                                            onChange={ e=>setUser({
                                                ...user,
                                                email: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                    <Grid item md={5} sx={{px: '2px'}}>
                                        <MuiPhoneNumber
                                            margin="normal"
                                            fullWidth
                                            required
                                            id="phoneno"
                                            label="Phone No."
                                            name="phoneno"
                                            type="tel"
                                            pattern="[0-9]{10}"
                                            defaultCountry="in"
                                            autoFocus
                                            value={user.phoneno}
                                            onChange={ e=>setUser({
                                                ...user,
                                                phoneno: e
                                            }) }    
                                        />
                                    </Grid>
                                    <Grid item md={3} sx={{px: '2px'}}>
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
                                                onChange={ e=>setUser({
                                                    ...user,
                                                    password: e.target.value
                                                }) }
                                        />
                                    </Grid>
                                    <Grid item md={9} sx={{px: '2px'}}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="address"
                                            label="Address"
                                            name="address"
                                            type="address"
                                            autoFocus
                                            value={user.address}
                                            onChange={ e=>setUser({
                                                ...user,
                                                address: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                    <Grid item md={3} sx={{px: '2px'}}>
                                        <TextField
                                            margin="normal"
                                            id="city"
                                            label="City"
                                            name="city"
                                            type="city"
                                            autoFocus
                                            value={user.city}
                                            onChange={ e=>setUser({
                                                ...user,
                                                city: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                    <Grid item md={3} sx={{px: '2px'}}>
                                        <TextField
                                            margin="normal"
                                            id="district"
                                            label="District"
                                            name="district"
                                            type="district"
                                            autoFocus
                                            value={user.district}
                                            onChange={ e=>setUser({
                                                ...user,
                                                district: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                    <Grid item md={3} sx={{px: '2px'}}>
                                        <TextField
                                            margin="normal"
                                            id="state"
                                            label="State"
                                            name="state"
                                            type="state"
                                            autoFocus
                                            value={user.state}
                                            onChange={ e=>setUser({
                                                ...user ,
                                                state: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                    <Grid item md={3} sx={{px: '2px'}}>
                                        <TextField
                                            margin="normal"
                                            id="pincode"
                                            label="Pincode"
                                            name="pincode"
                                            type="number"
                                            autoFocus
                                            value={user.pincode}
                                            onChange={ e=>setUser({
                                                ...user,
                                                pincode: e.target.value
                                            }) }
                                        />
                                    </Grid>
                                </Grid>
                                
                                <FormControlLabel 
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                    />
                                <div>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{ width:'60%',margin:'10px 20%' }}
                                        >
                                        Register
                                    </Button>
                                </div>
                                <Grid container>
                                    <Grid item>
                                    <Link href="/login" variant="body2">
                                        {"Already have an account? Login"}
                                    </Link>
                                    </Grid>
                                </Grid>
                                <Copyright sx={{ mt: 1 }} />
                            </Box>
                        </Box>
                        </Grid>
                    </Grid>
                </div>
                }

                { mode==='verifyotp' &&
                    <VerifyOTP />
                }
            </ThemeProvider>
        </>
  );
}
export default Register;

                /* <div className="col-md-3">
                    <label for="validationDefault05" className="form-label">State</label>
                    <select className="form-select" value={user.state} onChange={e=>{setUser({...user,state:e.target.value})}} id="validationDefault05" required>
                    <option selected disabled value="">State</option>
                        <option value="AN">Andaman and Nicobar Islands</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CH">Chandigarh</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="DN">Dadra and Nagar Haveli</option>
                        <option value="DD">Daman and Diu</option>
                        <option value="DL">Delhi</option>
                        <option value="GA">Goa</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="LA">Ladakh</option>
                        <option value="LD">Lakshadweep</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ML">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OR">Odisha</option>
                        <option value="PY">Puducherry</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TG">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="UT">Uttarakhand</option>
                        <option value="WB">West Bengal</option> */
                    