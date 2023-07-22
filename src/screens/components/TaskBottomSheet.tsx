import React, {
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import {BottomSheetModal, BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Colors, Size} from '@theme';
import {AnimatedButtonList} from '@lib';
import {
  TaskButton,
  TaskButtonActionEnum,
  TaskButtonTypeEnum,
} from './TaskButton';
import {addTask, editTask} from '@slices';
import {ITask, TaskStatusEnum} from '@interface';
import {createAccessibleTestProps, uuidv4} from '@utils';
import {IS_IOS} from '@src/constants';
import {useAppDispatch} from '@src/hook';

export interface ITaskBottomSheet {
  item?: ITask;
  testID?: string;
}

export const PRIORITY_LIST = [
  {
    text: 'High',
    color: Colors.Priority.High,
  },
  {
    text: 'Medium',
    color: Colors.Priority.Medium,
  },
  {
    text: 'Low',
    color: Colors.Priority.Low,
  },
];

const PRIORITY_LIST_TEXT = PRIORITY_LIST.map(priority => priority.text);
const TaskBottomSheet = forwardRef((props: ITaskBottomSheet, ref) => {
  const {item, testID} = props;
  const snapPoints = useMemo(() => [IS_IOS ? '40%' : '25%'], []);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<string>('');
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    () => ({
      present: () => {
        setText(item?.content ?? '');
        setPriority(item?.priority ?? PRIORITY_LIST_TEXT[0]);
        setTimeout(() => {
          bottomSheetRef?.current?.present();
        }, 200);
      },
    }),
    [item?.content, item?.priority],
  );

  const onPress = () => {
    if (priority && text?.length) {
      if (item) {
        dispatch(
          editTask({
            id: item.id,
            content: text,
            priority,
            status: item?.status,
          }),
        );
      } else {
        dispatch(
          addTask({
            id: uuidv4(),
            content: text,
            priority,
            status: TaskStatusEnum.OnGoing,
          }),
        );
      }

      closeSheet();
    }
  };

  const closeSheet = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      bottomSheetRef?.current?.forceClose();
    }, 200);
  };

  const onSelectPriority = (newPriority: string) => {
    setPriority(newPriority);
  };

  // renders
  return (
    <BottomSheetModal
      backgroundStyle={styles.root}
      ref={bottomSheetRef}
      index={0}
      {...createAccessibleTestProps(testID)}
      handleIndicatorStyle={styles.handleIndicator}
      snapPoints={snapPoints}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {item ? 'Edit task' : 'Create a new task'}
        </Text>
        <BottomSheetTextInput
          autoFocus
          defaultValue={text}
          onChangeText={setText}
          placeholder="Task name"
          placeholderTextColor={Colors.Main.White}
          style={styles.textInput}
        />
        <Text style={styles.priorityText}>Priority</Text>
        <AnimatedButtonList
          style={styles.buttonList}
          selected={priority}
          onChangeSelected={onSelectPriority}
          data={PRIORITY_LIST_TEXT}
        />
        <View style={styles.addButton}>
          <TaskButton
            onPress={onPress}
            action={item ? TaskButtonActionEnum.Edit : TaskButtonActionEnum.Add}
            type={TaskButtonTypeEnum.Secondary}
          />
        </View>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.Main.Primary,
    borderRadius: Size.ms(25),
  },
  container: {
    marginHorizontal: Size.ms(20),
  },
  handleIndicator: {
    height: Size.ms(4),
    width: Size.ms(40),
    backgroundColor: Colors.Main.White,
  },
  title: {
    color: Colors.Main.White,
    fontSize: Size.ms(20),
  },
  textInput: {
    marginTop: Size.ms(30),
    color: Colors.Main.White,
    borderBottomColor: Colors.Main.White,
    borderBottomWidth: Size.ms(1),
    fontSize: Size.ms(16),
    paddingBottom: Size.ms(10),
  },
  priorityText: {
    marginTop: Size.ms(30),
    fontSize: Size.ms(16),
    paddingBottom: Size.ms(10),
    color: Colors.Main.White,
  },
  buttonList: {
    marginTop: Size.vs(10),
  },
  addButton: {
    marginTop: Size.vs(30),
  },
});
export interface ITaskBottomSheetRef {
  present: () => void;
}

export {TaskBottomSheet};
