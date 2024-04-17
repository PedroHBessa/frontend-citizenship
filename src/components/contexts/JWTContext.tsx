import { createContext, ReactNode, useEffect, useReducer } from 'react';

import {
  ActionMap,
  AuthState,
  AuthUser,
  JWTContextType,
} from '../../types/auth';

import { Auth } from '../../config/Auth';
import Configuration from '../../config/Configuration';
import axios from '../../utils/axios';
import { isValidToken, setSession } from '../../utils/jwt';
import { useAppStore } from '../stores/useAppStore';

const INITIALIZE = 'INITIALIZE';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';
const SIGN_UP = 'SIGN_UP';

type AuthActionTypes = {
  [INITIALIZE]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [SIGN_IN]: {
    user: AuthUser;
  };
  [SIGN_OUT]: undefined;
  [SIGN_UP]: {
    user: AuthUser;
  };
};

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (
  state: AuthState,
  action: ActionMap<AuthActionTypes>[keyof ActionMap<AuthActionTypes>]
) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'SIGN_UP':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const config = new Configuration();
  const { setIsAuthenticated } = useAppStore();
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const { accessToken } = Auth.getCredentials();

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          setIsAuthenticated(true);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: {},
            },
          });
        } else {
          setIsAuthenticated(false);
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        setIsAuthenticated(false);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [setIsAuthenticated]);

  const signIn = async (email: string, password: string) => {
    const response = await axios.post(config.endpoint.post.token, {
      email,
      password,
    });
    const { token: access_token } = response.data;

    setSession(access_token);
    Auth.setCredentials({
      username: email,
      password,
      accessToken: access_token,
    });
    setIsAuthenticated(true);
    dispatch({
      type: SIGN_IN,
      payload: {
        user: {
          username: email,
        },
      },
    });
  };

  const signOut = async () => {
    setSession(null);
    setIsAuthenticated(false);
    Auth.removeCredentials();
    dispatch({ type: SIGN_OUT });
  };

  const signUp = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    console.log({ email, password, firstName, lastName });
  };

  const resetPassword = (email: string) => console.log(email);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        signIn,
        signOut,
        signUp,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
