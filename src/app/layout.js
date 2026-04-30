import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StayHaven | Premium House Rental",
  description: "Seamless house rental experience for users and admins.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t py-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} StayHaven. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
