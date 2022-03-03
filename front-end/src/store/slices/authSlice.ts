import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

type AuthState = {
    user: User;
}

const initialState: AuthState = {
    user: {
        'id': '',
        'username': '',
        'token': '',
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = {
                'id': '',
                'username': '',
                'token': '',
            }
        }
    },

})

export const { signOut, setUser } = authSlice.actions;

export default authSlice.reducer;