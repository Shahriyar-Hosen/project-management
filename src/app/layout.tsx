import { StoreProvider } from "@/stores/provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Project Management",
  description: "Project management tools!",
};

const RootLayout: FC<Readonly<IChildren>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
};

export default RootLayout;
