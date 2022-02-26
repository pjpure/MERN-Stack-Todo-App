import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types'



type TaskState = Task[]

const initialState: TaskState = [];

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            return state.filter((task: any) => task._id !== action.payload)
        }
    }
})

export const { addTask, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;