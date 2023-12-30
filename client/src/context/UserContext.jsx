import { createContext, PropsWithChildren, useState } from "react";

export const UserContext = createContext({
  setUserData: () => {},
  userData: {
    name: "",
    email: "",
    password: "",
  },
  setLogInData: () => {},
  logInData: {
    email: "",
    password: "",
  },
  setIsLoggedIn: () => {},
  isLoggedIn: false,
});

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [logInData, setLogInData] = useState({
    email: "",
    password: "",
  });

  return (
    <UserContext.Provider
      value={{
        setUserData,
        userData,
        logInData,
        setLogInData,
        setIsLoggedIn,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
