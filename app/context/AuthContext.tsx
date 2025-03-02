import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the user and token details
interface User {
  // Define the properties of the user object here
  id: string;
  username: string;
  // Add other user properties as needed
}

interface TokenDetails {
  change_password?: boolean;
  student_no: string;
  // Add other token details as needed
}

// Define the shape of the AuthContext
interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  changePwdModalVisible: boolean;
  setChangePwdModalVisible: (visible: boolean) => void;
  tokenDetails: TokenDetails | null;
}

// Create the Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProvider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null); // Store the authenticated user
  const [token, setToken] = useState<string | null>(null); // Store the token in memory
  const [changePwdModalVisible, setChangePwdModalVisible] =
    useState<boolean>(false);

  let tokenDetails: TokenDetails | null = null;
  if (token) {
    tokenDetails = jwtDecode<TokenDetails>(token);
    // console.log("tokenDetails", tokenDetails);
  }

  useEffect(() => {
    if (tokenDetails) {
      setChangePwdModalVisible(tokenDetails?.change_password || false);
    }
  }, [token]);

  // Function to log out the user
  const logout = () => {
    setToken(null); // Remove token from memory
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        changePwdModalVisible,
        setChangePwdModalVisible,
        tokenDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
