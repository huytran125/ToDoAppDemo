import React from 'react';
import {fireEvent} from '@testing-library/react-native';
import {HomeScreen} from '../HomeScreen';
import {renderWithProviders} from '@utils/test-utils';
import {TaskBottomSheet} from '../components/TaskBottomSheet';
import {act} from 'react-test-renderer';

describe('HomeScreen', () => {
  test('should render the title', () => {
    const {getByText} = renderWithProviders(<HomeScreen />);
    expect(getByText('Today Tasks')).toBeTruthy();
  });

  test('should open the task bottom sheet when pressing the add task button', () => {
    const {getByTestId} = renderWithProviders(<HomeScreen />);
    const button = getByTestId('task-button-primary');
    const ref = React.createRef();
    fireEvent.press(button);
    renderWithProviders(<TaskBottomSheet ref={ref} />);
    const present = jest.spyOn(ref.current, 'present');
    act(() => ref.current.present());
    expect(present).toBeCalled();
  });
});
