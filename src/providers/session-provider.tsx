import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  setAuthToken,
  setUnauthorizedHandler,
} from "@/lib/api";
import { clearToken, loadToken, saveToken } from "@/lib/secure-token";

type SessionValue = {
  token: string | null;
  isLoading: boolean;
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken().then((stored) => {
      if (stored) {
        setAuthToken(stored);
        setToken(stored);
      }
      setIsLoading(false);
    });
  }, []);

  const signIn = useCallback(async (next: string) => {
    await saveToken(next);
    setAuthToken(next);
    setToken(next);
  }, []);

  const signOut = useCallback(async () => {
    await clearToken();
    setAuthToken(null);
    setToken(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      void signOut();
    });
    return () => setUnauthorizedHandler(null);
  }, [signOut]);

  return (
    <SessionContext.Provider value={{ token, isLoading, signIn, signOut }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return value;
}
