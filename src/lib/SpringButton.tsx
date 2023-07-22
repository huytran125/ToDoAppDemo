import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  Pressable,
  PressableProps,
} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const SPRING_BUTTON_CONFIG = {
  damping: 10,
  mass: 1,
  stiffness: 300,
};

export interface ISpringButtonProps extends PressableProps {
  scaleSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}
const SpringButton: React.FC<ISpringButtonProps> = props => {
  const {scaleSize = 0.95, style, disabled = false} = props;

  const animatedSize = useSharedValue(1);

  const animatedScaleStyle = useAnimatedStyle(() => {
    return {transform: [{scale: animatedSize.value}]};
  });

  const onPressIn = useCallback(() => {
    animatedSize.value = withSpring(scaleSize, SPRING_BUTTON_CONFIG);
  }, [animatedSize, scaleSize]);

  const onPressOut = useCallback(() => {
    animatedSize.value = withSpring(1, SPRING_BUTTON_CONFIG);
  }, [animatedSize]);

  return (
    <Animated.View style={[styles.container, style, animatedScaleStyle]}>
      <Pressable
        disabled={disabled}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        {...props}
      />
    </Animated.View>
  );
};

export {SpringButton};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
