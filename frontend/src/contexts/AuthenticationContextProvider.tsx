import { createContext, type ReactNode, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import type { JwtToken } from '../utils/types.ts';

type AuthenticationContextType = {
  token: AuthenticationToken | null;
  isAuthenticated: boolean;
  saveAuthentication: (jwtToken: JwtToken) => void;
  clearAuthentication: () => void;
};

const AuthenticationContext = createContext<
  AuthenticationContextType | undefined
>(undefined);

export type AuthenticationToken = {
  value: string;
  expiryTime: number;
};

export const AUTHENTICATION_TOKEN_KEY = 'authenticationToken';

type Props = {
  children: ReactNode;
};

export const AuthenticationContextProvider = ({ children }: Props) => {
  const [token, setToken] = useLocalStorage<AuthenticationToken | null>(
    AUTHENTICATION_TOKEN_KEY,
    null
  );
  const isAuthenticated = token != null && Date.now() < token.expiryTime;

  const saveAuthentication = (jwtToken: JwtToken) => {
    const expiryTime = Date.now() + jwtToken.expiresIn * 1000;
    setToken({
      value: jwtToken.value,
      expiryTime
    });
  };

  const clearAuthentication = () => {
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        token,
        isAuthenticated,
        saveAuthentication,
        clearAuthentication
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => {
  const context = useContext(AuthenticationContext);
  if (context === undefined) {
    throw new Error(
      'useAuthenticationContext must be used within an AuthenticationContextProvider'
    );
  }
  return context;
};

export default useAuthenticationContext;
