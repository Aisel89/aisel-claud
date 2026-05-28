import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/layouts/MainLayout";
import { studioMetadata } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = studioMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased text-brand-stone bg-white`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
