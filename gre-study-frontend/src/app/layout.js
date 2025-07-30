import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import ReactQueryProvider from "./ReactQueryProvider";
import { ToastContainer } from "react-toastify";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GRE Study App",
  description: "The great app for Ari to study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <ReactQueryProvider>
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
