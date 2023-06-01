import { Grid, Box, Paper, Avatar, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../../features/user/userSlice'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SendIcon from '@mui/icons-material/Send';

export default function SellerChat() {
    const [ chats, setChats ] = useState([])
    const [ products, setProducts ] = useState([])
    const [ currentProduct, setCurrentProduct ] = useState("")
    const [ chatContent, setChatContent ] = useState([])
    useEffect(()=>{
        getSellerChat()
    },[])
    const getSellerChat = async()=>{
        const config = {
            headers:{
                'x-access-token': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        }
        await axios.post(url+'/product/getsellerchat',{},config)
        .then(res=>{
            if(res.data.status==='ok'){
                console.log(res.data)
                setChats(res.data.chats)
                let products = res.data.chats.map(chat=>chat.buyer._id) 
                let productSet = new Set(products)
                setProducts(Array.from(productSet))
            }
        })
    }
  return (
    <Box sx={{height:'100%',overflowX:'hidden'}}>
        <Grid container sx={{height:'100%'}}>
            <Grid item md={3} sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'left',
                alignItems: 'center',
                height: '100%',
                borderRight: '1px solid black',
                borderRightStyle: 'dotted',
                backgroundColor: '#deefe1'
            }}>
                {products.map(product=>{
                    const chat = chats.find(e=>e.item._id === product)
                    return (
                    <>
                        <Box component={ Paper } id={product} elevation={currentProduct===product?3:0} sx={{
                            position: 'relative',
                            padding:'5px 10px',
                            margin:'5px 0 5px 5px',
                            borderBottom:'1px solid black',
                            borderRadius:'0',
                            width:'90%',
                            cursor:'pointer',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            ':hover':{
                                backgroundColor:'#efefef'
                            }
                        }}
                        onClick={()=>{
                            setCurrentProduct(chat.item._id)
                            const currentchats = chats.filter(ch => ch.item._id===product)
                            setChatContent(currentchats)
                        }}
                        > 
                            <Avatar src={chat.img && chat.img[0]?url+chat.img[0]:''}></Avatar>
                            <Typography sx={{
                                paddingLeft:'10px'
                            }}> {chat.item.title} </Typography>
                            <KeyboardArrowRightIcon sx={{
                                position: 'absolute',
                                right:'15px'
                            }}/>
                        </Box>
                    </>
                    )
                })}
            </Grid>
            <Grid item md={9} >
                <Box sx={{paddingBottom:'50px'}}>

                    {chatContent.length === 0 && <>
                        <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}>
                            <Typography sx={{backgroundColor:'#ccece1',padding:'10px 10px'}}>
                                Select a Chat to display.
                            </Typography>
                        </Box>
                    </>}
                    {chatContent.length !== 0 && <>
                        <Box component={ Paper } elevation={1} sx={{
                            position: 'relative',
                            padding:'5px 10px',
                            margin:'5px 0 5px 5px',
                            borderBottom:'1px solid black',
                            borderRadius:'0',
                            width:'100%',
                            height:'10%',
                            cursor:'pointer',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            ':hover':{
                                backgroundColor:'#efefef'
                            }
                        }}> 
                                <Avatar src={chatContent[0].img && chatContent.img[0]?url+chatContent.img[0]:''}></Avatar>
                                <Typography sx={{
                                    paddingLeft:'10px'
                                }}> {chatContent[0].item.title} </Typography>
                            </Box>
                            <Box sx={{
                                padding:'10px 20px',
                                display: 'flex',
                                flexDirection:'column',
                                height:'80%'
                            }}>
                                {chatContent.map(chat=>{
                                    const d = new Date(chat?chat.date:'')
                                    const str = d.getDate()+'.'+d.getMonth()+'.'+d.getFullYear()+' '+d.getHours()+':'+d.getMinutes()
                                    return <>
                                        <Box sx={{
                                            padding:'3px 5px',
                                            border: '1px solid black',
                                            width:'fit-content',
                                            borderRadius: '3px',
                                            backgroundColor: '',
                                            margin:'5px 0'
                                        }}> 
                                            <Typography variant='subtitle2' sx={{
                                                fontSize:'0.7em',
                                            }}> {chat.sender==='buyer'?'me':'seller'} --- {str} </Typography>
                                            <Typography sx={{ 
                                                padding:'1px 5px',
                                                borderLeft: '1px solid black',
                                                backgroundColor:'grey',
                                                color:'white'
                                            }}>
                                                {chat.content}
                                            </Typography>
                                        </Box>
                                    </>
                                })}
                            </Box>
                            <Box id='newchat' component={ Paper } sx={{
                                position: 'fixed',
                                bottom: '14px',
                                padding:'10px',
                                backgroundColor: '#efefef',
                                width: '60%',
                                height:'8%'
                            }}>
                                    <div>
                                    <input type='text' id='message' style={{width:'92%'}}/>
                                    <Box sx={{
                                        display:'inline-block', 
                                        margin: 'auto 8px',
                                        padding: '3px', 
                                        border:'1px solid black', 
                                        borderRadius:'2px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={()=>{
                                        const msg = document.getElementById('message').value
                                        const body = {
                                            sellerid: chatContent[0].seller,
                                            content: msg,
                                            itemid: chatContent[0].item._id,
                                            sender:'buyer'
                                        }
                                        console.log(body)
                                        const config = {
                                            headers: {
                                                'x-access-token': localStorage.getItem('token'),
                                                'Content-Type': 'application/json',
                                            }
                                        }
                                        axios.post(url+'/product/newchat',body,config)
                                        .then(async (response) => {
                                            if(response.data.status==='ok'){
                                                await getSellerChat()
                                                setTimeout(() =>{
                                                    document.getElementById(currentProduct).click()
                                                    document.getElementById('message').value=''
                                                    window.scrollBy(0, 500);
                                                },1000)
                                            }
                                        })
                                    }}
                                        > <SendIcon/> </Box>
                                    </div>
                                </Box>
                    </>}
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}
