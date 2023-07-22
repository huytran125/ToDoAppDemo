module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@src': './src',
          '@lib': './src/lib',
          '@store': './src/store',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@constants': './src/constants',
          '@interface': './src/interface',
          '@utils': './src/utils',
          '@slices': './src/slices',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
      },
    ],
  ],
};
