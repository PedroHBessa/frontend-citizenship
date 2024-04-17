import { fontFamily } from './typography';
import { customColor, grayScale } from './variants';

const components = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: true,
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'hover',
      fontFamily,
      display: 'inline-block',
    },
  },
  MuiCardHeader: {
    defaultProps: {
      titleTypographyProps: {
        variant: 'h6',
      },
    },
    styleOverrides: {
      action: {
        marginTop: '-4px',
        marginRight: '-4px',
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
        boxShadow:
          'rgba(50, 50, 93, 0.025) 0px 2px 5px -1px, rgba(0, 0, 0, 0.05) 0px 1px 3px -1px',
        backgroundImage: 'none',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
    },
  },
  MuiPickersDay: {
    styleOverrides: {
      day: {
        fontWeight: '300',
      },
    },
  },
  MuiPickersYear: {
    styleOverrides: {
      root: {
        height: '64px',
      },
    },
  },
  MuiPickersCalendar: {
    styleOverrides: {
      transitionContainer: {
        marginTop: '6px',
      },
    },
  },
  MuiPickersCalendarHeader: {
    styleOverrides: {
      iconButton: {
        backgroundColor: 'transparent',
        '& > *': {
          backgroundColor: 'transparent',
        },
      },
      switchHeader: {
        marginTop: '2px',
        marginBottom: '4px',
      },
    },
  },
  MuiPickersClock: {
    styleOverrides: {
      container: {
        margin: `32px 0 4px`,
      },
    },
  },
  MuiPickersClockNumber: {
    styleOverrides: {
      clockNumber: {
        left: `calc(50% - 16px)`,
        width: '32px',
        height: '32px',
      },
    },
  },
  MuiPickerDTHeader: {
    styleOverrides: {
      dateHeader: {
        '& h4': {
          fontSize: '2.125rem',
          fontWeight: 400,
        },
      },
      timeHeader: {
        '& h3': {
          fontSize: '3rem',
          fontWeight: 400,
        },
      },
    },
  },
  MuiPickersTimePicker: {
    styleOverrides: {
      hourMinuteLabel: {
        '& h2': {
          fontSize: '3.75rem',
          fontWeight: 300,
        },
      },
    },
  },
  MuiPickersToolbar: {
    styleOverrides: {
      toolbar: {
        '& h4': {
          fontSize: '2.125rem',
          fontWeight: 400,
        },
      },
    },
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        '&.Mui-checked svg:first-of-type': {
          color: customColor[800],
        },
        '&.Mui-checked svg:last-child': {
          color: customColor[500],
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: '6px',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      root: {
        color: 'white',
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        // margin: '0.15rem',
        // boxSizing: 'border-box',
      },
    },
  },
  MuiFormLabel: {
    styleOverrides: {
      root: {
        color: grayScale[500],
        fontWeight: 'bold',
        '&.MuiInputLabel-formControl': {
          color: grayScale[75],
          fontWeight: 'normal',
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        '&.MuiButton-outlinedSecondary:hover': {
          backgroundColor: customColor[500],
          color: 'white',
        },
      },
    },
  },
};

export default components;
