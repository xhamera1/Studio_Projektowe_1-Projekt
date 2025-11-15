import { createContext, type ReactNode, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import type { User } from '../utils/types.ts';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

const USER_KEY = 'currentUser';

type Props = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<User | null>(USER_KEY, null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationContext must be used within an ApplicationContextProvider'
    );
  }
  return context;
};
