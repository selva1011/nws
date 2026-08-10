import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.example.com"),

  title: {
    default: "My Business | Chennai",
    template: "%s | My Business",
  },

  description:
    "Professional services in Chennai. Contact us today to learn more about our services.",

  keywords: [
    "business Chennai",
    "services Chennai",
    "my business",
  ],

  authors: [{ name: "My Business" }],

  openGraph: {
    title: "My Business",
    description:
      "Professional services in Chennai. Contact us today.",
    url: "https://www.example.com",
    siteName: "My Business",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}