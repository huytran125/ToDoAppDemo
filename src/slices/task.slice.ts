import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {ITask, TaskStatusEnum} from '@src/interface';

export interface TaskState {
  tasks: ITask[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(item => item.id === action.payload);
      if (task) {
        task.status =
          task?.status === TaskStatusEnum.Completed
            ? TaskStatusEnum.OnGoing
            : TaskStatusEnum.Completed;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(item => item.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      let index = state.tasks.findIndex(item => item.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addTask, toggleTaskStatus, deleteTask, editTask} =
  taskSlice.actions;

export const taskReducer = taskSlice.reducer;
