import "../styles/globals.css";
import dynamic from "next/dynamic";
import Provider from "@components/Provider";

export const metadata = {
  title: "Prompts",
  description: "Discover & Shae AI Prompts",
};

//noSSR nav
const NoSSRNav = dynamic(()=> import('@components/Nav') , {ssr: false})

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <NoSSRNav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
