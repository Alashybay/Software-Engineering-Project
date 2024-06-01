/* eslint-disable react/display-name */
import React from "react";
import AuthProvider from "./auth/authProvider";
import ReactQueryProvider from "./react-query/react-query-provider";

const compose = (providers: React.FC<{ children: React.ReactNode }>[]) =>
  providers.reduce((Prev, Curr) => ({ children }) => {
    if (Prev) {
      return (
        <Prev>
          <Curr>{children}</Curr>
        </Prev>
      );
    }

    return <Curr>{children}</Curr>;
  });

const Providers = compose([ReactQueryProvider, AuthProvider]);

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
