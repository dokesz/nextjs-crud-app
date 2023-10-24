import "../styles/globals.css";
import Provider from "@components/Provider";
import Nav from "@components/Nav";
import { useSession } from "next-auth/react";
import SessionCheck from "@components/NoteMessage";

export const metadata = {
  title: "Prompts",
  description: "Discover & Shae AI Prompts",
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