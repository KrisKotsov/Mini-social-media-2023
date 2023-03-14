import { createContext, useEffect, useState } from "react";
import { STORAGE_KEYS } from "../../utils/constants";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const savedUserValue =
      window.localStorage.getItem(STORAGE_KEYS.USER) ||
      window.sessionStorage.getItem(STORAGE_KEYS.USER);

    if (savedUserValue) {
      setUser(JSON.parse(savedUserValue));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
