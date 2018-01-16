import { rgba } from 'polished';

const colors = {
  // Neutral Colors
  white: '#fff',
  grayLight: '#f8f8f8',
  gray: '#ddd',
  black: '#000',

  // Brand Colors
  red: '#db0030',
  green: '#1bdb00',
  blue: '#0031ff',
  blueLight: '#bbd0ff'

  // Utility Colors
};

const utilityColors = {
  shadowBlue: rgba(colors.blue, 0.2),
  shadowBlack: rgba(colors.black, 0.1)
};

export { colors, utilityColors };
