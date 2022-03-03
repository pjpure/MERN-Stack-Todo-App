// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Task } from '../../types'



// type TaskState = Task[]

// const initialState: TaskState = [];

// const taskSlice = createSlice({
//     name: 'tasks',
//     initialState,
//     reducers: {
//         addAllTask: (state, action: PayloadAction<Task[]>) => {
//             return action.payload;
//         },
//         addTask: (state, action: PayloadAction<Task>) => {
//             state.push(action.payload);
//         },
//         deleteTask: (state, action: PayloadAction<string>) => {
//             return state.filter((task) => task._id !== action.payload)
//         },
//         editTask: (state, action: PayloadAction<Task>) => {
//             return state.map((task) => {
//                 if (task._id === action.payload._id) {
//                     return action.payload;
//                 }
//                 return task;
//             })
//         }
//     }
// })

// export const { addAllTask, addTask, deleteTask, editTask } = taskSlice.actions;

// export default taskSlice.reducer;

import React from 'react'

function taskSlice() {

}

export default taskSlice