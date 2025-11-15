import { createContext, type ReactNode, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import type { User } from '../utils/types.ts';
import { AUTHENTICATION_TOKEN_KEY } from './AuthenticationContextProvider.tsx';

type ApplicationContextType = {
  getUser: () => User;
  setUser: (user: User) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

const USER_KEY = 'currentUser';

type ApplicationContextProviderProps = {
  children: ReactNode;
};

export const ApplicationContextProvider = ({
  children
}: ApplicationContextProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>(USER_KEY, null);

  const getUser = () => {
    if (user) {
      return user;
    }
    localStorage.removeItem(AUTHENTICATION_TOKEN_KEY);
    throw new Error('No user is set in the application context');
  };

  return (
    <ApplicationContext.Provider value={{ getUser, setUser }}>
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
