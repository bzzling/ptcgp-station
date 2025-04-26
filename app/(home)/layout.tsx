import type { Metadata } from "next";
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Open_Sans, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/app/globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pokemon TCG Pocket Station",
  description: "An all-inclusive station for PTCGP players and enthusiasts",
  icons: {
    icon: "/favicon.ico",
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
        className={`${openSans.variable} ${robotoMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
