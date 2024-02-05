import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import Provider from "./context/Provider";
import { Montserrat } from "next/font/google";
import { Loader, Loader2 } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "QuikPlanr",
  description: "turn your ideas into plans!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/>
          <Provider session={session}>
            <body className={``}>
              <Navbar />
              {children}
        {/* <Footer /> */}
            </body>
          </Provider>
        </html>
        );
}
