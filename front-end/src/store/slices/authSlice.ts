import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import { signIn } from '../../data/users';

type AuthState = {
    user: User | null;
    loading: boolean;
    error: string;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: '',
}

export const signInAsync = createAsyncThunk('signIn', async ({ username, password }: { username: string, password: string }, store) => {
    try {
        const user = await signIn(username, password);

        return user;
    } catch (error) {
        throw error;
    }
});

//signInAsync.pending,fullfilled,rejected

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            state.loading = false;
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signInAsync.pending, (state, action) => {
            state.loading = true;
            state.error = '';
        });
        builder.addCase(signInAsync.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = '';
        });
        builder.addCase(signInAsync.rejected, (state, action) => {
            state.user = null;
            state.error = action.error.message || '';
            state.loading = false;
        });

    }


})

export const { signOut } = authSlice.actions;

export default authSlice.reducer;