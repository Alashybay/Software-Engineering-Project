// import {
//   createContext,
//   ReactNode,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { segmentClient } from "@index";
// import { useQueryClient } from "@tanstack/react-query";
// import { AuthUserWithTokensResponse } from "@typings/auth";
// import * as Linking from "expo-linking";
// import { router } from "expo-router";
// import { useStorageState } from "@hooks/use-storage-state";
// import { api } from "@services/api";
// import { httpClient } from "@services/httpClient";
// import { parseJSONString } from "@services/utils";

// export type AuthContextType = {
//   signIn: (payload: AuthUserWithTokensResponse) => void;
//   signOut: () => void;
//   session?: AuthUserWithTokensResponse | null;
//   isLoading: boolean;
//   accessToken?: string | null;
//   refreshToken?: string | null;
// };
// const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// export function useAuthSessionContext(): AuthContextType {
//   return useContext(AuthContext);
// }

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [isSessionValidationInProgress, setIsSessionValidationInProgress] =
//     useState(true);
//   const [[isStorageLoading, sessionString], setSession] =
//     useStorageState("session");
//   const session = parseJSONString(sessionString);
//   const queryClient = useQueryClient();

//   const signIn = useCallback(
//     (payload: AuthUserWithTokensResponse) => {
//       httpClient.defaults.headers.common.Authorization = `Bearer ${payload.accessToken}`;
//       setSession(JSON.stringify(payload));
//     },
//     [setSession]
//   );
//   const signOut = useCallback(() => {
//     setSession(null);
//     segmentClient.reset();
//     queryClient.clear();
//     router.replace("/(auth)/home");
//   }, [queryClient, setSession]);

//   const validateToken = async () => {
//     if (isStorageLoading) return;

//     if (!session?.accessToken) {
//       setIsSessionValidationInProgress(false);
//       router.replace("/(auth)/home");

//       return;
//     }
//     try {
//       const user = await api.myUser.fetchMyUser();
//       if (user?.onboardingComplete) {
//         router.replace("/(tabs)/home");
//       } else {
//         router.replace("/username");
//       }
//     } catch (e) {
//       router.replace("/(auth)/home");
//       signOut();
//     } finally {
//       setIsSessionValidationInProgress(false);
//     }
//   };

//   useEffect(() => {
//     if (session?.accessToken) {
//       httpClient.defaults.headers.common.Authorization = `Bearer ${session.accessToken}`;
//     } else {
//       delete httpClient.defaults.headers.common.Authorization;
//     }
//   }, [session?.accessToken]);

//   useEffect(() => {
//     if (isStorageLoading) return;

//     validateToken().then(async () => {
//       const initialUrl = await Linking.getInitialURL();
//       if (initialUrl) Linking.openURL(initialUrl);
//     });
//   }, [isStorageLoading]);

//   const value = useMemo(
//     () => ({
//       isLoading: isStorageLoading || isSessionValidationInProgress,
//       session,
//       accessToken: session?.accessToken,
//       refreshToken: session?.refreshToken,
//       signIn,
//       signOut,
//     }),
//     [isStorageLoading, isSessionValidationInProgress, session, signIn, signOut]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }
