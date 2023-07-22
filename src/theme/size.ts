import {Dimensions} from 'react-native';
import {Scaling} from './scaling';

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');

const Size = Object.freeze({
  ...Scaling,
});

export {DEVICE_HEIGHT, DEVICE_WIDTH, Size};
