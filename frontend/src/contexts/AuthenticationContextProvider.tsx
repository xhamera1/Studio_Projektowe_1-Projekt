import {createContext, type ReactNode, useContext} from "react";
import {useLocalStorage} from "usehooks-ts";
import type {JwtToken} from "../utils/types.ts";

type AuthenticationContextType = {
  getTokenValue: () => string | null;
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

const AUTHENTICATION_TOKEN_KEY = "authenticationToken";

type AuthenticationContextProviderProps = {
  children: ReactNode;
};

export const AuthenticationContextProvider = ({
                                                children,
                                              }: AuthenticationContextProviderProps) => {
  const [token, setToken] = useLocalStorage<AuthenticationToken | null>(
    AUTHENTICATION_TOKEN_KEY,
    null,
  );
  const isAuthenticated = token != null && Date.now() < token.expiryTime;

  const getTokenValue = () => {
    if (isAuthenticated) {
      return token.value;
    }
    return null;
  };

  const saveAuthentication = (jwtToken: JwtToken) => {
    const expiryTime = Date.now() + jwtToken.expiresIn * 1000;
    setToken({
      value: jwtToken.value,
      expiryTime,
    });
  };

  const clearAuthentication = () => {
    setToken(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        getTokenValue,
        isAuthenticated,
        saveAuthentication,
        clearAuthentication,
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
      "useAuthenticationContext must be used within an AuthenticationContextProvider",
    );
  }
  return context;
};

export default useAuthenticationContext;
