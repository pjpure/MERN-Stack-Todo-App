import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { signIn } from '../../data/users';

const initialState: any = {
    user: null,
    loading: false,
    error: null,
}

export const signInAsync: any = createAsyncThunk('signIn', async ({ username, password }: { username: string, password: string }, store) => {
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
    extraReducers: {
        [signInAsync.pending]: (state, action) => {
            state.loading = true;
            state.error = '';
        },
        [signInAsync.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = '';
        },
        [signInAsync.rejected]: (state, action) => {
            state.user = null;
            state.error = action.error.message;
            state.loading = false;
        },
    }
})

export const { signOut } = authSlice.actions;

export default authSlice.reducer;