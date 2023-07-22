import React, {useCallback} from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {Keyboard, StyleSheet} from 'react-native';
import {Colors} from '@src/theme';

interface BottomModalBackdropProps extends BottomSheetBackdropProps {
  pressBehavior?: 'none' | 'close' | 'collapse' | number;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Text.Light,
  },
});

const BottomSheetVBackdrop: React.FC<BottomModalBackdropProps> = ({
  pressBehavior,
  ...props
}) => {
  const onPress = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <BottomSheetBackdrop
      opacity={0.25}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      enableTouchThrough={false}
      pressBehavior={pressBehavior}
      onPress={onPress}
      style={styles.container}
      {...props}
    />
  );
};

export {BottomSheetVBackdrop};
