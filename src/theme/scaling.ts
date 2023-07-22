import {IS_IOS} from '@src/constants';
import {Dimensions, PixelRatio} from 'react-native';

// iOS: iPhone 11 Pro: 5.8" / 1125px x 2436px / 375x812 / ratio = 3
// Android: Samsung S10: 6.1" / 1440px x 3040px / 360x760 / ratio = 4
const BASE_WIDTH = IS_IOS ? 375 : 360;
const BASE_HEIGHT = IS_IOS ? 812 : 760;

const {width, height} = Dimensions.get('window');
const [short, long] = width < height ? [width, height] : [height, width];

const scale = (size: number) =>
  PixelRatio.roundToNearestPixel((short / BASE_WIDTH) * size);
const verticalScale = (size: number) =>
  PixelRatio.roundToNearestPixel((long / BASE_HEIGHT) * size);
const moderateScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);
const moderateVerticalScale = (size: number, factor = 0.5) =>
  PixelRatio.roundToNearestPixel(size + (verticalScale(size) - size) * factor);

const Scaling = Object.freeze({
  hs: (value: number) => scale(value),
  vs: (value: number) => verticalScale(value),
  ms: (value: number, factor = 0.5) => moderateScale(value, factor),
  mvs: (value: number, factor = 0.5) => moderateVerticalScale(value, factor),
});

export {Scaling};
