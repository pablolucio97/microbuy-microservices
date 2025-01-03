import { EmailContextProvider } from "@/contexts/EmailContext";
import ApolloClientProvider from "@/providers/ApolloProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientQueryProvider from "../providers/ReactQueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MicroBuy - Microservices",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloClientProvider>
          <ClientQueryProvider>
            <EmailContextProvider>{children}</EmailContextProvider>
          </ClientQueryProvider>
        </ApolloClientProvider>
      </body>
    </html>
  );
}
