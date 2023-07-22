const Main = {
  Primary: '#9400FE',
  Background: '#F4F7FA',
  White: '#FFFFFF',
};

const Text = {
  Black: '#0C0C0E',
  Light: '#A3A2BA',
  White: '#FFFFFF',
};

const Priority = {
  High: '#FF006D',
  Medium: '#F5F591',
  Low: '#ABFFA3',
};

const Colors = Object.freeze({
  Main,
  Text,
  Priority,
});

export type ColorsType = typeof Colors;

export {Colors};
