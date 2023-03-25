import React, { useEffect } from "react";
import { CssBaseline ,Box , Grid, Avatar, Typography, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import logo from "../assets/img/logo.png"
import { useSelector, useDispatch } from 'react-redux' 
import { fetchUser, toggleUserMode, resetStatus , logout as Logout } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

function Navbar(){
    const userMode = useSelector( state => state.user.userMode )
    const user = useSelector( state => state.user.user )
    const resStatus = useSelector( state => state.user.resStatus )
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let logout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
        dispatch(Logout())
        dispatch(resetStatus())
    }

    useEffect(()=>{
        if(!user){
            dispatch(fetchUser())
        }
    },[ dispatch, user ])

    useEffect(()=>{
        if(resStatus==='fail'){
            localStorage.removeItem('token')
            navigate('/login')
            dispatch(resetStatus())
        }
    },[ resStatus, navigate, dispatch ])
    
    return(
        <div style={{
            backgroundColor:"#2e2e2e",
            position:'fixed',
            top:'0',
            width:'100%',
            zIndex:'1',
            borderBottom:'1px solid white'
            }}>
            <CssBaseline/>
                <Grid container sx={{height:'50px' }}>
                    <Grid item xs={10} sm={8} md={6}  >
                        <Box sx={{
                            mx: 4, 
                            display: 'flex', 
                            flexDirection: 'row',
                            justifyContent:'left', 
                            alignItems: 'center',
                            height:'100%' 
                        }} >
                            <Avatar src={logo} sx={{ mx:'5px' }}/>
                            <Typography variant="h4" sx={{
                                color:"White",
                                marginLeft:'10px',
                                fontFamily: 'Dancing Script'
                            }}> StudentStore</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={6}>
                        <Box sx={{
                            display:'flex', 
                            flexDirection:'row',
                            justifyContent:'right',
                            alignItems:'center',
                            height:"100%"
                        }}>
                            <Typography variant='subtitle1' sx={{
                                color:'white',
                                marginRight:'10px',
                                fontFamily:'Josefin Sans',
                            }}>
                               {user?`Hi ${user.username}`:""}{user && user.city ?`, ${user.city}`:''}
                            </Typography>
                            <Avatar src='' sx={{marginRight:'4px'}} />
                            <Button variant={ userMode==='BUY'?'contained':'outlined' } sx={{
                                borderRadius:'0',
                                marginLeft:'4px',
                                marginRight:'4px',
                                fontFamily:'Libre Baskerville',
                                color: userMode === 'BUY'?'#2e2e2e':'white' ,
                                bgcolor: userMode === 'BUY'?'white':'#2e2e2e' ,
                                borderColor:'white',
                            }}
                            onClick={ () => dispatch( toggleUserMode('BUY')) }
                            >B U Y</Button>
                            <Button variant={ userMode==='SELL'?'contained':'outlined' } sx={{
                                borderRadius:'0',
                                marginLeft:'4px',
                                marginRight:'4px',
                                fontFamily: 'Libre Baskerville',
                                bgcolor: userMode === 'SELL'?'white':'#2e2e2e',
                                color: userMode === 'SELL'?'#2e2e2e':'white',
                                borderColor: 'white',
                            }}
                            onClick={ () => dispatch( toggleUserMode('SELL')) }
                            >S E L L</Button>
                            <Box component={LogoutIcon} sx={{
                                bgcolor:"white",
                                borderRadius:'50%',
                                padding:'5px',
                                marginRight:'15px',
                                marginLeft:'2px',
                                height:'35px',
                                width:'35px',
                                cursor:'pointer'
                            }} 
                            onClick={ logout }
                            />
                        </Box>
                    </Grid>
                </Grid>
        </div>
    )
}
export default Navbar