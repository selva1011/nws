import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = { metadataBase: new URL("https://nwsworkspace.com"), title: "Node Workspace Solutions | Ergonomic Office Furniture Chennai", description: "Node Workspace Solutions provides ergonomic office chairs, executive seating, workstations and complete office furniture solutions for modern workplaces.", openGraph: { title: "Node Workspace Solutions", description: "Ergonomic office furniture for better work.", siteName: "NWS", type: "website" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body><Header />{children}<Footer /></body></html>; }
