import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RootState} from '@store';

import Animated, {
  FadeInRight,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';
import {ITask} from '@interface';
import {TaskItem} from './TaskItem';
import {useAppSelector} from '@src/hook';

const DURATION = 500;

const TaskList = () => {
  const tasks = useAppSelector((state: RootState) => state.task.tasks);

  const renderItem = (item: ITask, index: number) => {
    return (
      <Animated.View
        key={`${item.id}`}
        layout={Layout.delay(50)}
        entering={FadeInRight.delay(100 * index).duration(DURATION)}
        exiting={FadeOutRight}>
        <TaskItem item={item} />
      </Animated.View>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Animated.View style={styles.container}>
        {tasks.map((task, index) => renderItem(task, index))}
      </Animated.View>
    </ScrollView>
  );
};

export {TaskList};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
