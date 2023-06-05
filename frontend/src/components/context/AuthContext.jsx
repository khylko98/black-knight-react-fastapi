import { createContext, useContext, useEffect, useState } from "react";
import {
  login as performLogin,
  registration as performRegistration,
} from "../../services/user";
import jwtDecode from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserFromToken = () => {
    let token = localStorage.getItem("access_token");
    if (token) {
      token = jwtDecode(token);
      setUser({
        username: token.sub,
      });
    }
  };

  useEffect(() => {
    setUserFromToken();
  }, []);

  const login = async (usernameAndPassword) => {
    return new Promise((resolve, reject) => {
      performLogin(usernameAndPassword)
        .then((res) => {
          const jwtToken = res.data.access_token;
          localStorage.setItem("access_token", jwtToken);

          const decodedToken = jwtDecode(jwtToken);

          setUser({
            username: decodedToken.sub,
          });

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const registration = async (usernameAndPassword) => {
    return new Promise((resolve, reject) => {
      performRegistration(usernameAndPassword)
        .then((res) => {
          const jwtToken = res.data.access_token;
          localStorage.setItem("access_token", jwtToken);

          const decodedToken = jwtDecode(jwtToken);

          setUser({
            username: decodedToken.sub,
          });

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  const isCustomerAuthenticated = () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return false;
    }
    const { exp: expiration } = jwtDecode(token);
    if (Date.now() > expiration * 1000) {
      localStorage.removeItem("access_token");
      return false;
    }
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        registration,
        isCustomerAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
