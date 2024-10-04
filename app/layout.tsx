import { ThemeProvider } from "@/components/ThemeProvider";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { IBM_Plex_Mono, IBM_Plex_Sans, Noto_Serif_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { validateRequest } from "@/lib/auth";
import Script from 'next/script'

const inter = Bricolage_Grotesque({ subsets: ["latin"] });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['200', '400', '700'],
  variable: '--font-IBM-mono',
})
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['200', '400'],
  variable: '--font-IBM-sans',
})
const notoSerif = Noto_Serif_Display({
  subsets: ['latin'],
  weight: ['100', '400'],
  variable: '--font-Noto-serif',
})

export const metadata: Metadata = {
  title: "Folyo",
  description: "Your Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = await validateRequest();
  const userId = user?.id;

  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${ibmPlexSans.variable} ${notoSerif.variable} font-sans`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header user={user} />
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
