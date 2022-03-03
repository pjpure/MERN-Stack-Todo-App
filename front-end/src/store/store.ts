import { configureStore } from '@reduxjs/toolkit'
// import taskReducer from './slices/taskSlice'
import authReducer from './slices/authSlice'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import { tasksApi } from '../services/tasksApi'
import { authApi } from '../services/authApi'
const store = configureStore({
    reducer: {
        // task: taskReducer,
        auth: authReducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tasksApi.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;