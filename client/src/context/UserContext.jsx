import { createContext, PropsWithChildren, useState, useEffect } from "react";

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

  const auth = async () => {
    try {
      const response = await fetch("/api/customer/authorize");
      const data = await response.json();
      console.log(data);

      // Check if data contains an ID, then update isLoggedIn accordingly
      if (data._id) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Handle authentication error if needed
    }
  };
  useEffect(() => {
    auth();
  }, []);

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
