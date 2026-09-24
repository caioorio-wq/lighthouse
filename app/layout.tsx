import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {title:"Lighthouse — a tiny adventure",description:"Four rooms. A restless sea. A tiny lighthouse adventure."};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
