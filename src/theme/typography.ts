import { TypographyOptions } from '@mui/material/styles/createTypography';

export const fontFamily = [
  'Lato',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

const typography: TypographyOptions = {
  fontFamily,
  fontSize: 13,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontSize: '2.375rem',
    fontWeight: 200,
    lineHeight: 1.5,
  },
  h2: {
    fontSize: '1.75rem',
    fontWeight: 200,
    lineHeight: 1.25,
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.25,
  },
  h4: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.25,
  },
  h5: {
    fontSize: '1.0625rem',
    fontWeight: 500,
    lineHeight: 1.25,
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 300,
    lineHeight: 1.25,
  },
  body1: {
    fontSize: 13,
    color: '#808080',
    display: 'inline-block',
  },
  body2: {
    fontSize: 13,
    color: '#A9A9A9',
    display: 'inline-block',
  },
  button: {
    textTransform: 'none',
  },
};

export default typography;
