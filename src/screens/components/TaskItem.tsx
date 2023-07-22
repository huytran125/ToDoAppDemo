import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useMemo, useRef} from 'react';
import {Colors, DEVICE_WIDTH, Fonts, Size} from '@theme';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {ITask, TaskStatusEnum} from '@src/interface';
import {SVGicon, VictoryCheckbox} from '@src/lib';
import {deleteTask, toggleTaskStatus} from '@src/slices';
import {
  ITaskBottomSheetRef,
  PRIORITY_LIST,
  TaskBottomSheet,
} from './TaskBottomSheet';
import {useAppDispatch} from '@src/hook';

interface ITaskItemProps {
  item: ITask;
}

const TRANSLATE_X_THRESHOLD = DEVICE_WIDTH;
const DELETE_BUTTON_WIDTH = Size.hs(68);
const CONTENT_PADDING = Size.hs(16);

const TaskItem = (props: ITaskItemProps) => {
  const {item} = props;
  const dispatch = useAppDispatch();
  const isDelete = useRef(false);
  const isDeleteButtonOn = useRef(false);

  const translateX = useSharedValue(0);
  const deleteButtonWidth = useSharedValue(0);
  const paddingContent = useSharedValue(CONTENT_PADDING);
  const taskSheetRef = useRef<ITaskBottomSheetRef>(null);

  const onPress = () => {
    taskSheetRef?.current?.present();
  };

  const resetAnimation = () => {
    'worklet';
    deleteButtonWidth.value = withTiming(0);
    translateX.value = withTiming(0);
    paddingContent.value = withTiming(CONTENT_PADDING);
  };

  const onAnimationEndDelete = () => {
    isDelete.current = true;
    dispatch(deleteTask(item.id));
  };

  const runFullTransition = () => {
    'worklet';
    deleteButtonWidth.value = withTiming(
      TRANSLATE_X_THRESHOLD - 50,
      {},
      finished => {
        if (finished) {
          runOnJS(onAnimationEndDelete)();
        }
      },
    );
    translateX.value = withTiming(-TRANSLATE_X_THRESHOLD);
    paddingContent.value = withTiming(0);
  };

  const disableDeleteButton = () => {
    'worklet';
    deleteButtonWidth.value = withTiming(0);
    translateX.value = withTiming(0);
  };

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
      if (isDeleteButtonOn.current) {
        deleteButtonWidth.value = -event.translationX + DELETE_BUTTON_WIDTH;
        isDeleteButtonOn.current = false;
      } else {
        deleteButtonWidth.value = -event.translationX;
      }
      if (event.translationX > 0) {
        deleteButtonWidth.value = 0;
      }
    },
    onEnd: event => {
      if (Math.abs(translateX.value) < TRANSLATE_X_THRESHOLD * 0.3) {
        disableDeleteButton();
      } else {
        if (event.velocityX <= 0) {
          if (translateX.value > TRANSLATE_X_THRESHOLD / 2) {
            resetAnimation();
          } else {
            runFullTransition();
          }
        } else {
          disableDeleteButton();
        }
      }
    },
  });

  const onShowDelete = () => {
    if (deleteButtonWidth.value === DELETE_BUTTON_WIDTH) {
      deleteButtonWidth.value = withTiming(0);
      isDeleteButtonOn.current = false;
    } else {
      isDeleteButtonOn.current = true;
      deleteButtonWidth.value = withTiming(DELETE_BUTTON_WIDTH);
    }
  };

  const onPressDelete = () => {
    if (paddingContent.value === CONTENT_PADDING) {
      runFullTransition();
    } else {
      resetAnimation();
    }
  };

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value - deleteButtonWidth.value}],
    paddingHorizontal: paddingContent.value,
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const borderLeft = translateX.value === -TRANSLATE_X_THRESHOLD ? 15 : 0;
    return {
      width: deleteButtonWidth.value,
      borderTopLeftRadius: borderLeft,
      borderBottomLeftRadius: borderLeft,
    };
  });

  const optionButtonStyle = useAnimatedStyle(() => {
    return {opacity: translateX.value ? 0 : 1};
  });

  const onToggle = () => {
    dispatch(toggleTaskStatus(item.id));
  };

  const indicatorColor = useMemo(
    () =>
      PRIORITY_LIST.find(priority => priority.text === item.priority)?.color,
    [item],
  );

  return (
    <View style={styles.root}>
      <PanGestureHandler
        onGestureEvent={panGesture}
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}>
        <Animated.View style={[styles.container, rStyle]}>
          <Pressable style={styles.checkBox}>
            <VictoryCheckbox
              onToggle={onToggle}
              isActive={item.status === TaskStatusEnum.Completed}
            />
          </Pressable>
          <View
            style={[
              styles.indicator,
              {
                backgroundColor: indicatorColor,
              },
            ]}
          />
          <Pressable style={styles.detailContainer} onPress={onPress}>
            <Text style={styles.contentText}>{item.content}</Text>
            <Text style={styles.priorityText}>
              {`${item.priority} Priority`}
            </Text>
          </Pressable>
          <Animated.View style={optionButtonStyle}>
            <Pressable onPress={onShowDelete}>
              <SVGicon
                size={Size.ms(35)}
                name="more"
                stroke={Colors.Text.Light}
              />
            </Pressable>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View
        style={[styles.deleteButtonContainer, rIconContainerStyle]}>
        <Pressable onPress={onPressDelete} style={styles.deleteButton}>
          <SVGicon size={Size.ms(20)} name="trash" fill={Colors.Main.White} />
        </Pressable>
      </Animated.View>
      <TaskBottomSheet item={item} ref={taskSheetRef} />
    </View>
  );
};

export {TaskItem};

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.Main.White,
    flexDirection: 'row',
    borderRadius: Size.ms(15),
    marginTop: Size.vs(20),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Size.vs(12),
    flex: 1,
  },
  checkBox: {
    paddingRight: CONTENT_PADDING,
  },
  indicator: {
    width: Size.ms(3),
    height: '100%',
    marginRight: Size.hs(16),
  },
  detailContainer: {
    flex: 1,
  },
  contentText: {
    color: Colors.Text.Black,
    fontSize: Size.ms(22),
    fontFamily: Fonts.SemiBold,
  },
  priorityText: {
    color: Colors.Text.Light,
    marginTop: Size.vs(10),
  },
  deleteButtonContainer: {
    backgroundColor: Colors.Main.Primary,
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    borderTopRightRadius: Size.ms(15),
    borderBottomRightRadius: Size.ms(15),
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: Size.hs(24),
  },
});
