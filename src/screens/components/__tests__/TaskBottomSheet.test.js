import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {TaskBottomSheet} from '../TaskBottomSheet';
import {TaskStatusEnum} from '@interface';
import {renderWithProviders} from '@src/utils/test-utils';
import {act} from 'react-test-renderer';
import '@testing-library/jest-native/extend-expect';

describe('TaskBottomSheet', () => {
  test('should render the component with default props', () => {
    const ref = React.createRef();
    const {getByText, getByPlaceholderText} = renderWithProviders(
      <TaskBottomSheet ref={ref} />,
    );
    act(ref.current?.present);
    expect(getByText('Create a new task')).toBeTruthy();
    expect(getByPlaceholderText('Task name')).toBeTruthy();
    expect(getByText('Priority')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Low')).toBeTruthy();
  });

  test('should render the component with item prop', () => {
    const ref = React.createRef();
    const item = {
      id: '1',
      content: 'Test task',
      priority: 'Medium',
      status: TaskStatusEnum.OnGoing,
    };
    const {getByText, getByDisplayValue, getAllByText} = renderWithProviders(
      <TaskBottomSheet ref={ref} item={item} />,
    );
    act(ref.current?.present);
    expect(getAllByText('Edit task')[0]).toBeTruthy();
    expect(getByDisplayValue('Test task')).toBeTruthy();
    expect(getByText('Priority')).toBeTruthy();
    expect(getByText('High')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Low')).toBeTruthy();
  });

  test('should update the text input value when typing', () => {
    const ref = React.createRef();
    const {getByPlaceholderText, getByDisplayValue} = renderWithProviders(
      <TaskBottomSheet ref={ref} />,
    );
    act(ref.current?.present);
    const input = getByPlaceholderText('Task name');
    fireEvent.changeText(input, 'New task');
    expect(getByDisplayValue('New task')).toBeTruthy();
  });
});
