"use client";
import "../styles/globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
import { useSession } from "next-auth/react";

export const metadata = {
  title: "Prompts",
  description: "Discover & Shae AI Prompts",
};

const SessionCheck = () => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <p className="text-red-800 italic">
        Note: If you sign-in, the app will store your email, name and profile
        picture
      </p>
    );
  }

  return null;
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            <SessionCheck />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
