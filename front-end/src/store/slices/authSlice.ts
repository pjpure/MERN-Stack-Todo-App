import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

type AuthState = {
    user: User | null;
}

const initialState: AuthState = {
    user: null,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null
        }
    },

})

export const { signOut, setUser } = authSlice.actions;

export default authSlice.reducer;