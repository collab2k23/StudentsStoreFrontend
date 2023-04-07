import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState={
    loading:false,
    user:null,
    token:'',
    error:'',
    msg:'',
    resStatus:'',
    userMode:'BUY'
}

export const url = 'https://6c53-2405-201-3006-b39-c4a9-b0c4-5a26-3405.in.ngrok.io'

export const registerUser = createAsyncThunk('user/registerUser',(user)=>{
    return axios.post(url+'/api/register',user)
    .then(response => response.data)
})

export const loginUser = createAsyncThunk('user/loginUser',(user)=>{
    return axios.post(url+'/api/login',user)
    .then(response => response.data)
})

export const fetchUser = createAsyncThunk('user/fetchUser',()=>{
    const config={
        headers:{
            'x-access-token':localStorage.getItem('token')
        }
    }
    return axios.post(url+'/api/userDetails',{},config)
    .then(response=>response.data)
})

export const uploadImage=createAsyncThunk('user/uploadImage',()=>{
    const config={
        headers:{
            'x-access-token':localStorage.getItem('token'),
            'Content-Type':'multipart/form-data'
        }
    }
    return axios.post(url+'/upload/profile',{},config)
    .then(response=>response.data)
})

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{ 
        toggleUserMode: (state,action)=>{
            state.userMode=action.payload
        },
        resetStatus: (state)=>{
            state.resStatus=''
        },
        logout: (state)=>{
            state.loading=false
            state.user=null
            state.token=''
            state.error=''
            state.msg=''
            state.resStatus=''
            state.userMode='BUY'
        },
        updateAvatar:(state,action)=>{
            state.user.avatar=action.payload
        }
    },    
    extraReducers: builder=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.loading=true
            state.resStatus=''
        })
        builder.addCase(registerUser.fulfilled,(state,action)=>{
            state.loading=false
            state.msg = action.payload.msg
            state.resStatus = action.payload.status
            state.token = action.payload.token
            state.error = ''
        })
        builder.addCase(registerUser.rejected,(state,action)=>{
            state.loading = false
            state.user = null
            state.resStatus = ''
            state.token = ''
            state.msg = ''       
            state.error = action.error.message
        })
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true
            state.resStatus=''
        })
        builder.addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false
            state.msg = action.payload.msg
            state.resStatus = action.payload.status
            state.token = action.payload.token
            state.error = ''
        })
        builder.addCase(loginUser.rejected,(state,action)=>{
            state.loading = false
            state.user = null
            state.resStatus = ''
            state.token = ''
            state.msg = ''       
            state.error = action.error.message
        })
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading=true
            state.resStatus=''
        })
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload.user
            state.resStatus=action.payload.status
            state.msg=''
            state.error=''
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false
            state.user=null
            state.resStatus=''
            state.msg=''
            state.error=action.error.message
        })
    }
})

export default userSlice.reducer
export const { toggleUserMode, resetStatus, logout , updateAvatar } = userSlice.actions