import {StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import React from 'react';
import {Colors, Size} from '@theme';
import {ISpringButtonProps, SpringButton, SVGicon} from '@lib';

export enum TaskButtonTypeEnum {
  Primary = 'Primary',
  Secondary = 'Secondary',
}
export enum TaskButtonActionEnum {
  Add = 'Add',
  Edit = 'Edit',
}
export interface ITaskButtonProps extends ISpringButtonProps {
  type: TaskButtonTypeEnum;
  style?: StyleProp<ViewStyle>;
  action?: TaskButtonActionEnum;
}
const TaskButton: React.FC<ITaskButtonProps> = props => {
  const {type, style, action = TaskButtonActionEnum.Add} = props;

  return (
    <SpringButton
      style={[
        styles.container,
        type === TaskButtonTypeEnum.Primary
          ? styles.primaryContainer
          : styles.secondaryContainer,
        style,
      ]}
      {...props}>
      {action === TaskButtonActionEnum.Add && (
        <SVGicon
          fill={
            type === TaskButtonTypeEnum.Primary
              ? Colors.Main.White
              : Colors.Main.Primary
          }
          name="plus"
        />
      )}

      <Text
        style={[
          styles.text,
          type === TaskButtonTypeEnum.Primary
            ? styles.primaryText
            : styles.secondaryText,
        ]}>
        {action === TaskButtonActionEnum.Add ? 'Create task' : 'Edit task'}
      </Text>
    </SpringButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Size.ms(15),
    paddingHorizontal: Size.hs(6),
    paddingVertical: Size.vs(6),
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryContainer: {
    backgroundColor: Colors.Main.Primary,
  },
  secondaryContainer: {
    backgroundColor: Colors.Main.White,
  },
  text: {
    fontSize: Size.ms(16),
    marginLeft: Size.hs(5),
  },
  primaryText: {
    color: Colors.Text.White,
  },
  secondaryText: {
    color: Colors.Main.Primary,
  },
});
export {TaskButton};
