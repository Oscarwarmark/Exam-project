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
  setSignedInUser: () => {},
  signedInUser: [],
});

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signedInUser, setSignedInUser] = useState([]);

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
      setSignedInUser(data);

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

  useEffect(() => {
    auth();
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        setUserData,
        userData,
        logInData,
        setLogInData,
        setIsLoggedIn,
        isLoggedIn,
        signedInUser,
        setSignedInUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
