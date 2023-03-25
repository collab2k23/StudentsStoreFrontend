import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../features/user/userSlice'
import appReducer from "../features/application/appSlice"
// import { createLogger } from 'redux-logger'

// const logger = createLogger()

const store = configureStore({
    reducer:{
        user: userReducer,
        app:appReducer,
    },
    // middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(logger),
})

export default store