import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CURRENT_DATE} from '@constants';
import {Colors, Fonts, Size} from '@theme';
import React, {useRef} from 'react';
import {TaskButton, TaskButtonTypeEnum} from './components/TaskButton';
import {
  ITaskBottomSheetRef,
  TaskBottomSheet,
} from './components/TaskBottomSheet';
import {TaskList} from './components/TaskList';

const HomeScreen = () => {
  const sheetRef = useRef<ITaskBottomSheetRef>(null);

  const onPressAddTask = () => {
    sheetRef?.current?.present();
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.dateText}>{CURRENT_DATE}</Text>
        <Text style={styles.titleText}>Today Tasks</Text>
        <TaskList />
        <View style={styles.button}>
          <TaskButton
            testID="task-button-primary"
            type={TaskButtonTypeEnum.Primary}
            onPress={onPressAddTask}
          />
        </View>
      </View>

      <TaskBottomSheet testID="task-bottom-sheet-add" ref={sheetRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.Main.Background,
    flex: 1,
  },
  container: {
    marginHorizontal: Size.ms(25),
    flex: 1,
  },
  dateText: {
    fontSize: Size.ms(16),
    fontFamily: Fonts.SemiBold,
    color: Colors.Text.Light,
  },
  titleText: {
    fontSize: Size.ms(22),
    fontFamily: Fonts.SemiBold,
    color: Colors.Text.Black,
    marginTop: Size.vs(8),
  },
  button: {
    position: 'absolute',
    bottom: Size.vs(20),
    alignSelf: 'center',
  },
});

export {HomeScreen};
