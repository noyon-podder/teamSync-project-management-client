/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useEffect } from "react";
// import useWorkspaceId from "@/hooks/use-workspace-id";
import useAuth from "@/hooks/api/use-auth";
import { UserType } from "@/types/api.type";

// Define the context shape
type AuthContextType = {
  user?: UserType;
  error: any;
  isLoading: boolean;
  isFetching: boolean;
  refetchAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: authData,
    error: authError,
    isLoading: authLoading,
    isFetching: authFetching,
    refetch: refetchAuth,
  } = useAuth();

  const user = authData?.user;
  // const workspaceId = useWorkspaceId();

  useEffect(() => {});

  return (
    <AuthContext.Provider
      value={{
        user,
        error: authError,
        isLoading: authLoading,
        isFetching: authFetching,
        refetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useCurrentUserContext must be used within a AuthProvider");
  }
  return context;
};
