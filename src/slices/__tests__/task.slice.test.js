import {taskSlice, initialState} from '../task.slice';
import {TaskStatusEnum} from '@src/interface';

describe('taskSlice', () => {
  test('should handle initial state', () => {
    expect(taskSlice.reducer(undefined, {type: 'unknown'})).toEqual(
      initialState,
    );
  });

  test('should handle add new task', () => {
    const newTask = {
      id: '1',
      title: 'Test task',
      status: TaskStatusEnum.OnGoing,
    };
    const expectedState = {
      tasks: [newTask],
    };
    expect(
      taskSlice.reducer(initialState, taskSlice.actions.addTask(newTask)),
    ).toEqual(expectedState);
  });

  test('should handle toggle a task status', () => {
    const initialTask = {
      id: '1',
      title: 'Test task',
      status: TaskStatusEnum.OnGoing,
    };
    const initialTasks = [initialTask];
    const initialState = {
      tasks: initialTasks,
    };
    const expectedTask = {
      id: '1',
      title: 'Test task',
      status: TaskStatusEnum.Completed,
    };
    const expectedTasks = [expectedTask];
    const expectedState = {
      tasks: expectedTasks,
    };
    expect(
      taskSlice.reducer(initialState, taskSlice.actions.toggleTaskStatus('1')),
    ).toEqual(expectedState);
  });

  test('should handle delete task', () => {
    const initialTask = {
      id: '1',
      title: 'Test task',
      status: TaskStatusEnum.OnGoing,
    };
    const initialTasks = [initialTask];
    const initialState = {
      tasks: initialTasks,
    };
    const expectedState = {
      tasks: [],
    };
    expect(
      taskSlice.reducer(initialState, taskSlice.actions.deleteTask('1')),
    ).toEqual(expectedState);
  });

  test('should handle edit task', () => {
    const initialTask = {
      id: '1',
      title: 'Test task',
      status: TaskStatusEnum.OnGoing,
    };
    const initialTasks = [initialTask];
    const initialState = {
      tasks: initialTasks,
    };
    const editedTask = {
      id: '1',
      title: 'Edited task',
      status: TaskStatusEnum.Completed,
    };
    const expectedTasks = [editedTask];
    const expectedState = {
      tasks: expectedTasks,
    };
    expect(
      taskSlice.reducer(initialState, taskSlice.actions.editTask(editedTask)),
    ).toEqual(expectedState);
  });
});
