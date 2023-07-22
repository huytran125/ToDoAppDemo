import React, {useEffect} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {Colors, Size} from '@src/theme';
import {SpringButton} from './SpringButton';

const DURATION = 500;
export interface IAnimatedButtonProps {
  isActive?: boolean;
  onToggle: (isActive: boolean) => void;
  text: string;
}
const AnimatedButton = (props: IAnimatedButtonProps) => {
  const {onToggle, isActive = false, text} = props;
  const state = useSharedValue(0);

  useEffect(() => {
    state.value = withTiming(isActive ? 1 : 0, {duration: DURATION});
  }, [isActive, state]);

  const onPress = () => {
    onToggle(!state.value);
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        state.value,
        [0, 1],
        [Colors.Main.Primary, Colors.Main.White],
      ),
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        state.value,
        [0, 1],
        [Colors.Main.White, Colors.Main.Primary],
      ),
    };
  });

  return (
    <SpringButton onPress={onPress}>
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.Text style={[styles.text, animatedTextStyle]}>
          {text}
        </Animated.Text>
      </Animated.View>
    </SpringButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Size.ms(80),
    height: Size.ms(35),
    borderWidth: 2,
    borderColor: Colors.Main.White,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

export {AnimatedButton};
