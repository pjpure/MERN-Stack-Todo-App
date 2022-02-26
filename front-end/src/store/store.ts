import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice'
import authReducer from './slices/authSlice'

export default configureStore({
    reducer: {
        task: taskReducer,
        auth: authReducer,
    },
});

