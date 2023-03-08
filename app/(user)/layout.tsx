import "../globals.css";

import localfont from 'next/font/local'

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation"

// import Providers from "./providers";

const font = localfont({
  src: '../../public/Tilt_Neon_Var.ttf',
  variable: "--font-tilt",
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <head />
      <body className="no-scrollbar bg-slate-900 w-11/12 3xl:w-9/12 mx-auto" >
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
