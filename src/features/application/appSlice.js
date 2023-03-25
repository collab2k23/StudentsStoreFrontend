import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentMenu:'account',
}

const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        changeMenu:(state,action)=>{
            state.currentMenu = action.payload
        },
    }
})

export default appSlice.reducer
export const { changeMenu } = appSlice.actions