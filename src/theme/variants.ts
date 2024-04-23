import merge from 'deepmerge';
import { green, grey, indigo, red } from '@mui/material/colors';
import { THEMES } from '../constants';
import { FamilyMemberStatus, FamilyState } from '../types/State';

export const customColor = {
  50: '#faf0ee',
  100: '#EFCFCF',
  200: '#fcbfb2',
  300: '#fdb4a2',
  400: '#f5a28b',
  500: '#53738D',
  600: '#53738D',
  700: '#53738D',
  800: '#171F27',
  900: '#171F27',
};

export const grayScale = {
  25: '#E2E2E2',
  50: '#D5D5D5',
  60: '#D9D9D9',
  75: '#979797',
  80: '#808080',
  500: '#343434',
};

export const tertiaryColor = {
  500: '#53738D',
};

export const themeBackgroundColor = '#ECEBEB';

export const darkColors = {
  darkGreen: '#345233',
};

interface StatusColors {
  [key: string]: string;
}

export const familyMemberStatusColor: StatusColors = {
  [FamilyMemberStatus.ERRORS]: '#E94343',
  [FamilyMemberStatus.COMPLETED_WITH_NO_ERRORS]: '#12CDD4',
  [FamilyMemberStatus.COMPLETED_WITH_ERRORS]: '#7d12d4',
  [FamilyMemberStatus.INCOMPLETE]: '#FFB800',
  [FamilyMemberStatus.ON_PROGRESS]: grayScale[60],
};

export const familyStatusColor: StatusColors = {
  [FamilyState.CREATED]: grayScale[60],
  [FamilyState.ON_PROGRESS]: '#FFB800',
  [FamilyState.FINISHED]: '#68B861',
};

export const statusColor: StatusColors = {
  ...familyMemberStatusColor,
  ...familyStatusColor,
};

const defaultVariant = {
  name: THEMES.DEFAULT,
  palette: {
    mode: 'light',
    primary: {
      main: customColor[700],
      contrastText: '#FFF',
    },
    secondary: {
      main: customColor[500],
      contrastText: '#521e22',
    },
    background: {
      default: themeBackgroundColor,
      paper: themeBackgroundColor,
    },
  },
  header: {
    color: grey[500],
    background: '#FFF',
    search: {
      color: grey[800],
    },
    indicator: {
      background: customColor[600],
    },
  },
  footer: {
    color: grey[500],
    background: '#FFF',
  },
  sidebar: {
    color: grey[200],
    background: '#535353',
    header: {
      color: grey[200],
      background: '#535353',
      brand: {
        color: customColor[500],
      },
    },
    footer: {
      color: grey[200],
      background: '#535353',
      online: {
        background: green[500],
      },
    },
    badge: {
      color: '#FFF',
      background: customColor[500],
    },
  },
};

const darkVariant = merge(defaultVariant, {
  name: THEMES.DARK,
  palette: {
    mode: 'dark',
    primary: {
      main: customColor[600],
      contrastText: '#FFF',
    },
    background: {
      default: '#1B2635',
      paper: '#233044',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.95)',
      secondary: 'rgba(255, 255, 255, 0.5)',
    },
  },
  header: {
    color: grey[300],
    background: '#1B2635',
    search: {
      color: grey[200],
    },
  },
  footer: {
    color: grey[300],
    background: '#233044',
  },
});

const lightVariant = merge(defaultVariant, {
  name: THEMES.LIGHT,
  palette: {
    mode: 'light',
  },
  header: {
    color: grey[200],
    background: customColor[800],
    search: {
      color: grey[100],
    },
    indicator: {
      background: red[700],
    },
  },
  sidebar: {
    color: grey[900],
    background: '#FFF',
    header: {
      color: '#FFF',
      background: customColor[800],
      brand: {
        color: '#FFFFFF',
      },
    },
    footer: {
      color: grey[800],
      background: '#F7F7F7',
      online: {
        background: green[500],
      },
    },
  },
});

const blueVariant = merge(defaultVariant, {
  name: THEMES.BLUE,
  palette: {
    mode: 'light',
  },
  sidebar: {
    color: '#FFF',
    background: customColor[700],
    header: {
      color: '#FFF',
      background: customColor[800],
      brand: {
        color: '#FFFFFF',
      },
    },
    footer: {
      color: '#FFF',
      background: customColor[800],
      online: {
        background: '#FFF',
      },
    },
    badge: {
      color: '#000',
      background: '#FFF',
    },
  },
});

const greenVariant = merge(defaultVariant, {
  name: THEMES.GREEN,
  palette: {
    primary: {
      main: green[800],
      contrastText: '#FFF',
    },
    secondary: {
      main: green[500],
      contrastText: '#FFF',
    },
  },
  header: {
    indicator: {
      background: green[600],
    },
  },
  sidebar: {
    color: '#FFF',
    background: green[700],
    header: {
      color: '#FFF',
      background: green[800],
      brand: {
        color: '#FFFFFF',
      },
    },
    footer: {
      color: '#FFF',
      background: green[800],
      online: {
        background: '#FFF',
      },
    },
    badge: {
      color: '#000',
      background: '#FFF',
    },
  },
});

const indigoVariant = merge(defaultVariant, {
  name: THEMES.INDIGO,
  palette: {
    primary: {
      main: indigo[600],
      contrastText: '#FFF',
    },
    secondary: {
      main: indigo[400],
      contrastText: '#FFF',
    },
  },
  header: {
    indicator: {
      background: indigo[600],
    },
  },
  sidebar: {
    color: '#FFF',
    background: indigo[700],
    header: {
      color: '#FFF',
      background: indigo[800],
      brand: {
        color: '#FFFFFF',
      },
    },
    footer: {
      color: '#FFF',
      background: indigo[800],
      online: {
        background: '#FFF',
      },
    },
    badge: {
      color: '#000',
      background: '#FFF',
    },
  },
});

const variants: Array<VariantType> = [
  defaultVariant,
  darkVariant,
  lightVariant,
  blueVariant,
  greenVariant,
  indigoVariant,
];

export default variants;

export type VariantType = {
  name: string;
  palette: {
    primary: MainContrastTextType;
    secondary: MainContrastTextType;
  };
  header: ColorBgType & {
    search: {
      color: string;
    };
    indicator: {
      background: string;
    };
  };
  footer: ColorBgType;
  sidebar: ColorBgType & {
    header: ColorBgType & {
      brand: {
        color: string;
      };
    };
    footer: ColorBgType & {
      online: {
        background: string;
      };
    };
    badge: ColorBgType;
  };
};

type MainContrastTextType = {
  main: string;
  contrastText: string;
};
type ColorBgType = {
  color: string;
  background: string;
};
