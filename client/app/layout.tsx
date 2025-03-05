import { ThemeProvider } from "@/components/providers/theme.provider";
import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import QueryProvider from "@/components/providers/query.provider";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/components/providers/session.provider";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Chat Application",
  description: "Chat Application created with Nextjs and Nodejs",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={` ${spaceGrotesk.variable} antialiased sidebar-custom-scrollbar`}
          suppressHydrationWarning
          >

          <SessionProvider>
            <QueryProvider>

          
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster />
          </ThemeProvider>
    </QueryProvider>
    </SessionProvider>
        </body>
      </html>
    
  );
}
