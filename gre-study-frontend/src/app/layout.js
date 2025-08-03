import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import ReactQueryProvider from "./ReactQueryProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "GRE Study App",
  description: "The great app for Ari to study",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased flex`}>
        <ReactQueryProvider>
          <Sidebar />
          <main className="flex-1 p-6">{children}</main>
        </ReactQueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
