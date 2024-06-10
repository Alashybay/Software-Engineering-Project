"use client";

import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ProvidersWrapper } from "../providers";
import { ModalsProvider } from "@mantine/modals";
import { YMaps } from "@pbe/react-yandex-maps";

const yandexApiKey = "650c5309-d7b5-4e13-8e07-4a5a9d727eb8";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <ProvidersWrapper>
          <YMaps query={{ load: "package.full", apikey: yandexApiKey }}>
            <MantineProvider>
              <ModalsProvider>
                <Notifications position="top-center" zIndex={1000} />
                {children}
              </ModalsProvider>
            </MantineProvider>
          </YMaps>
        </ProvidersWrapper>
      </body>
    </html>
  );
}
