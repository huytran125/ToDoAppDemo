import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React, {useCallback} from 'react';
import {AnimatedButton} from './AnimatedButton';

export interface IAnimatedButtonList {
  data: string[];
  style?: StyleProp<ViewStyle>;
  selected?: string;
  onChangeSelected?: (selected: string) => void;
}
const AnimatedButtonList = (props: IAnimatedButtonList) => {
  const {data, style, selected, onChangeSelected} = props;

  const onSelected = useCallback(
    (newSelected: string) => {
      onChangeSelected?.(newSelected);
    },
    [onChangeSelected],
  );

  return (
    <View style={[styles.container, style]}>
      {data.map(item => (
        <AnimatedButton
          isActive={item === selected}
          key={item}
          onToggle={() => onSelected(item)}
          text={item}
        />
      ))}
    </View>
  );
};

export {AnimatedButtonList};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
