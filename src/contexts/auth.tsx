import React, { createContext, ReactNode, useContext, useState } from "react";

interface IUser {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface IAuthContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Auth context must be used within a provider!");
  }

  return context;
}

export { AuthProvider, useAuth };
