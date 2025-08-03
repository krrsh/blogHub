import { createContext, useContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      const decoded = JSON.parse(atob(action.payload.split(".")[1]));
      return { user: decoded, token: action.payload };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  let user = null;
  if (token) {
    try {
      user = JSON.parse(atob(token.split(".")[1]));
    } catch {
      user = null;
    }
  }
  const [state, dispatch] = useReducer(authReducer, {
    user,
    token,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) dispatch({ type: "LOGIN", payload: token });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
