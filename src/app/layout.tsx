import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Providers from "@/libs/provider";
// import IntroName from "@/components/introName/IntroName";
// import { cookies } from "next/headers";
// import { jwtDecoder } from "@/jwtDecoder/jwtDecoder";
// import AddPostModal from "@/components/modal/AddPostModal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Garden Gallery",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const cookieStore = cookies();
  // const accessToken = cookieStore.get("accessToken")?.value as string;
  // const userInfo = jwtDecoder(accessToken);


  return (
    <html lang="en">
       <head>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release-pro/v4.0.0/css/line.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-2`}
      >
        <ToastContainer position="bottom-right"/>
        <Providers>
        {/* <IntroName/> */}
        <Navbar/>
            {children}
            {/* <AddPostModal userInfo={userInfo}/> */}
        </Providers>
      </body>
    </html>
  );
}
