import {createContext, type ReactNode, useContext} from "react";
import {useLocalStorage} from "usehooks-ts";
import type {User} from "../utils/types.ts";

type ApplicationContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined,
);

const USER_KEY = "currentUser";

type ApplicationContextProviderProps = {
  children: ReactNode;
};

export const ApplicationContextProvider = ({children}: ApplicationContextProviderProps) => {
  const [user, setUser] = useLocalStorage<User | null>(USER_KEY, null);

  return (
    <ApplicationContext.Provider value={{user, setUser}}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationContextProvider",
    );
  }
  return context;
};
