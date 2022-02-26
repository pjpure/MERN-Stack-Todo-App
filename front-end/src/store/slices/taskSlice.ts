import { createSlice } from '@reduxjs/toolkit';

const initialState: any = [];

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.splice(state.findIndex((task: any) => task._id === action.payload), 1)
        }
    }
})

export const { addTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;