/* eslint-disable react/display-name */
import React from "react";
import { AuthProvider } from "./auth/authProvider";

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

const Providers = compose([AuthProvider]);

export function ProvidersWrapper({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
