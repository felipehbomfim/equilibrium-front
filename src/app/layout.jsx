import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Providers from "@/app/providers";
import {Toaster} from "sonner";

const outfit = Outfit({
    subsets: ['latin'],
});

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${outfit.className} dark:bg-gray-900`}>
            <Providers>
                <Toaster position="top-center" richColors />
                <ThemeProvider>
                    <SidebarProvider>{children}</SidebarProvider>
                </ThemeProvider>
            </Providers>
        </body>
        </html>
    );
}
