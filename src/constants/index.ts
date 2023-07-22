import {Platform} from 'react-native';

export const CURRENT_DATE = new Date().toLocaleDateString('en-gb', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'utc',
});
export const IS_IOS = Platform.OS === 'ios';
