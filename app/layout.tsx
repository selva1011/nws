import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://nwsworkspace.com"),
  title: "Node Workspace Solutions | Ergonomic Office Furniture Chennai",
  description: "Explore office chairs, executive seating and workspace solutions from Node Workspace Solutions in Chennai.",
  openGraph: { title: "Node Workspace Solutions", description: "Office seating and workspace solutions in Chennai.", siteName: "NWS", type: "website", locale: "en_IN", images: ["/images/nws-hero.png"] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = { "@context": "https://schema.org", "@type": "Organization", "@id": "https://nwsworkspace.com/#organization", name: "Node Workspace Solutions", alternateName: "NWS", url: "https://nwsworkspace.com", logo: "https://nwsworkspace.com/logo.png" };
  return <html lang="en"><body><a href="#main-content" className="skip-link">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }} /><Header /><main id="main-content" tabIndex={-1}>{children}</main><Footer /></body></html>;
}
