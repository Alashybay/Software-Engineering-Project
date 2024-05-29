import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ProvidersWrapper } from "../providers";

export const metadata = {
  title: "My project",
  description: "university project",
};

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
        {/* <ProvidersWrapper> */}
        <MantineProvider>
          <Notifications />
          {children}
        </MantineProvider>
        {/* </ProvidersWrapper> */}
      </body>
    </html>
  );
}
