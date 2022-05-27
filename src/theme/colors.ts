import { useColorScheme } from 'react-native';

export interface Colors {
  primary: string
  white: string
  light: string
  black: string
  gray: string
  dark: string
  slimy: string
  darkerGray: string
  darkerDarkerGray: string
  theLastGray: string
}

export const LightColors: Colors = {
  primary: '#ee1a64',
  white: '#fff',
  light: '#f2f2f2',
  gray: '#6c6f78',
  darkerGray: '#5b5f67',
  darkerDarkerGray: '#4a4e56',
  theLastGray: '#393d45',
  black: '#20232a',
  dark: '#282c34',
  slimy: '#AEEDB3cc'
};

export const DarkColors: Colors = {
  ...LightColors,
  white: '#20232a',
  light: '#282c34',
  black: '#fff',
  dark: '#f2f2f2',
};

const useColors = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? DarkColors : LightColors;
  return { colors, isDark };
};

export default useColors;
