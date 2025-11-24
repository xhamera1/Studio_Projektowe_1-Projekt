import { createContext, type ReactNode, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import type { JwtToken, User } from '../utils/types.ts';

export type AuthenticationToken = {
  value: string;
  expiryTime: number;
};

type ApplicationContextType = {
  accessToken: AuthenticationToken | null;
  isUserAuthenticated: boolean;
  saveAuthentication: (jwtToken: JwtToken | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

const AUTHENTICATION_TOKEN_KEY = 'accessToken';
const USER_KEY = 'currentUser';

type Props = {
  children: ReactNode;
};

export const ApplicationContextProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<User | null>(USER_KEY, null);
  const [accessToken, setAccessToken] =
    useLocalStorage<AuthenticationToken | null>(AUTHENTICATION_TOKEN_KEY, null);
  const isUserAuthenticated =
    accessToken != null && Date.now() < accessToken.expiryTime;

  const saveAuthentication = (jwtToken: JwtToken | null) => {
    if (jwtToken) {
      setAccessToken({
        value: jwtToken.value,
        expiryTime: Date.now() + jwtToken.expiresIn * 1000
      });
    } else {
      setAccessToken(null);
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        accessToken,
        isUserAuthenticated,
        saveAuthentication,
        user,
        setUser
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationContext must be used within an ApplicationContextProvider'
    );
  }
  return context;
};
