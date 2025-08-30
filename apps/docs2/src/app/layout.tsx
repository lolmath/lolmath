"use client";
import "@/app/global.css";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";
import { RouterProvider } from "@lolmath/ui";
import { RootProvider } from "fumadocs-ui/provider";
import { useRouter } from "next/navigation";

export default function Layout({ children }: LayoutProps<"/">) {
  const router = useRouter();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>lolmath docs</title>
        <link rel="icon" href="/img/logo.png" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RouterProvider navigate={router.push}>
          <RootProvider
            theme={{
              forcedTheme: "dark",
            }}
          >
            {children}
          </RootProvider>
        </RouterProvider>
      </body>
    </html>
  );
}
