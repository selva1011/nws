import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.example.com"),

  title: {
    default: "Workspace Solutions | Chennai",
    template: "%s | Workspace Solutions",
  },

  description:
    "High-end workspace and office solutions in Chennai. Premium design, reliable delivery, and sales-ready support.",

  keywords: [
    "workspace solutions",
    "office services",
    "Chennai workspace",
    "corporate interiors",
  ],

  authors: [{ name: "My Business" }],

  openGraph: {
    title: "Workspace Solutions",
    description:
      "High-end workspace and office solutions in Chennai.",
    url: "https://www.example.com",
    siteName: "Workspace Solutions",
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
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <div className="isolate">
          <Header />

          <main className="transition-colors duration-500">
            <PageTransition>{children}</PageTransition>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}