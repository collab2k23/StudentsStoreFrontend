import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { url } from '../user/userSlice'

const initialState = {
    currentMenu:'account',
    loading:false,
    myproducts:[],
    products:[],
    error:'',
    msg:'',
    drawer:null,
}

export const getmyproducts = createAsyncThunk('/getmyproduct',(seller)=>{
    const config={
        headers:{
            'x-access-token':localStorage.getItem('token')
        }
    }
    return axios.post(url+'/myproducts/all',{},config)
    .then(response=>response.data)
})

export const searchedproducts = createAsyncThunk('/searchedproducts',(searchKey)=>{
    const config={
        headers:{
            'x-access-token':localStorage.getItem('token')
        }
    }
    return axios.post(url+'/product/explore',{ key : searchKey },config)
    .then(response=>response.data)
})

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        changeMenu:(state,action)=>{
            state.currentMenu = action.payload
        },
        drawercontent:(state,action)=>{
            state.drawer=action.payload
        }
    },
    extraReducers:builder=>{
        builder.addCase(getmyproducts.pending(),(state)=>{
            state.loading=true
            state.msg=''
            state.error=''
            state.myproducts=[]
        })
        builder.addCase(getmyproducts.fulfilled(),(state,action)=>{
            state.loading=false
            state.msg=action.payload.msg
            state.myproducts=action.payload.myproducts
            state.error=''
        })
        builder.addCase(getmyproducts.rejected(),(state,action)=>{
            state.loading=false
            state.msg=''
            state.error=action.error.message
            state.myproducts=[]
        })
        builder.addCase(searchedproducts.pending(),(state)=>{
            state.loading=true
            state.msg=''
            state.error=''
            state.products=[]
        })
        builder.addCase(searchedproducts.fulfilled(),(state,action)=>{
            console.log(action)
            state.loading=false
            state.msg=action.payload.msg
            state.products=action.payload.items
            state.error=''
        })
        builder.addCase(searchedproducts.rejected(),(state,action)=>{
            state.loading=false
            state.msg=''
            state.error=action.error.message
            state.products=[]
        })
    }
})

export default appSlice.reducer
export const { changeMenu, drawercontent } = appSlice.actions