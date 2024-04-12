import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dev-Duo Locater",
  description: "Application to pair program with other developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* //here we made provider as component so it keeps session running on client side*/}
        <Providers>
          <NextTopLoader />
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
