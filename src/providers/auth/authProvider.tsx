import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { parseJSONString } from "@/src/services/utils";
import { AuthUserWithTokensResponse } from "@/src/typings/auth";
import { useStorageState } from "@/src/hooks/useStorageState";

export type AuthContextType = {
  signIn: (payload: AuthUserWithTokensResponse) => void;
  signOut: () => void;
  session?: AuthUserWithTokensResponse | null;
  isLoading: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuthSessionContext(): AuthContextType {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isSessionValidationInProgress, setIsSessionValidationInProgress] =
    useState(true);
  const [[isStorageLoading, sessionString], setSession] =
    useStorageState("session");
  const session = parseJSONString(sessionString);
  const router = useRouter();

  const signIn = useCallback(
    (payload: AuthUserWithTokensResponse) => {
      setSession(JSON.stringify(payload));
    },
    [setSession]
  );

  const signOut = useCallback(() => {
    setSession(null);
    router.replace("/auth/login");
  }, [setSession, router]);

  //   const validateToken = async () => {
  //     if (isStorageLoading) return;

  //     if (!session?.accessToken) {
  //       setIsSessionValidationInProgress(false);
  //       router.replace("/auth/login");
  //       return;
  //     }
  //     try {
  //       const user = await api.myUser.fetchMyUser();
  //       if (user?.onboardingComplete) {
  //         router.replace("/");
  //       } else {
  //         router.replace("/username");
  //       }
  //     } catch (e) {
  //       router.replace("/auth/login");
  //       signOut();
  //     } finally {
  //       setIsSessionValidationInProgress(false);
  //     }
  //   };

  useEffect(() => {
    if (session?.accessToken) {
      console.log("session?.accessToken");
    } else {
      console.log("delete");
    }
  }, [session?.accessToken]);

  useEffect(() => {
    if (isStorageLoading) return;

    // validateToken();
  }, [isStorageLoading]);

  const value = useMemo(
    () => ({
      isLoading: isStorageLoading || isSessionValidationInProgress,
      session,
      accessToken: session?.accessToken,
      refreshToken: session?.refreshToken,
      signIn,
      signOut,
    }),
    [isStorageLoading, isSessionValidationInProgress, session, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
