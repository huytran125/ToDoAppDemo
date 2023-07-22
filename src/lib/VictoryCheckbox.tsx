import React, {useEffect} from 'react';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {StyleSheet} from 'react-native';
import {SVGicon} from './SvgIcon';
import {Colors, Size} from '@src/theme';
import {SpringButton} from './SpringButton';

export interface IVictoryCheckboxProps {
  isActive?: boolean;
  onToggle: (isActive: boolean) => void;
}

const DURATION = 200;

const VictoryCheckbox = (props: IVictoryCheckboxProps) => {
  const {onToggle, isActive} = props;
  const state = useSharedValue(0);

  useEffect(() => {
    state.value = isActive ? 1 : 0;
  }, [isActive, state]);

  const animatedHiddenView = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(state.value, {
            duration: DURATION,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          }),
        },
      ],
    };
  });
  const animatedIcon = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withDelay(DURATION, withSpring(state.value)),
        },
      ],
    };
  });

  const animatedContainer = useAnimatedStyle(() => {
    return {
      borderColor: withSpring(
        interpolateColor(
          state.value,
          [0, 1],
          [Colors.Text.Light, Colors.Main.Primary],
        ),
      ),
    };
  });

  const onPress = () => {
    onToggle?.(!state.value);
  };

  return (
    <SpringButton onPress={onPress}>
      <Animated.View style={[styles.container, animatedContainer]}>
        <Animated.View style={[styles.hiddenView, animatedHiddenView]} />
        <Animated.View style={animatedIcon}>
          <SVGicon stroke={Colors.Main.White} name={'check'} size={15} />
        </Animated.View>
      </Animated.View>
    </SpringButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Size.ms(19),
    height: Size.ms(19),
    borderWidth: Size.ms(2),
    borderRadius: Size.ms(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hiddenView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.Main.Primary,
  },
});

export {VictoryCheckbox};
