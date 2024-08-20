import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css";
import Header from "@/components/ui/header";
import AppProvider from "@/app/AppProvider";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Gai Xinh',
    default: 'Gai Xinh'
  },
  description: "Gai Xinh chi co o Thanh Hai",
  openGraph:{
    title: 'Gai Xinh',
    description: 'Gai ngon',
    url: 'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A4000%2Fstatic%2F708afe1676324eb59b088147a872ec1d.jpg&w=256&q=100',
    siteName: 'Gai xinh',
    images: {
      url:'http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A4000%2Fstatic%2F708afe1676324eb59b088147a872ec1d.jpg&w=256&q=100'
    },
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header/>
            <AppProvider initialSessionToken={
              sessionToken?.value
            } >
            {children}
            </AppProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
