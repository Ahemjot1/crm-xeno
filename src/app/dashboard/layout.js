// import './styles/global'
"use client"

import Navbar from "@/app/components/Navbar";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <SessionProvider>
                <body>
                    <Navbar />
                    {children}
                </body>
            </SessionProvider>
        </html>
    );
}
