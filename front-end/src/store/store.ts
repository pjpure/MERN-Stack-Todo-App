import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './slices/taskSlice'
import authReducer from './slices/authSlice'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
    reducer: {
        task: taskReducer,
        auth: authReducer,
    },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;