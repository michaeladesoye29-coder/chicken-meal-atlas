import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Daily Plate — Chicken Meal Atlas",
  description: "Explore chicken recipes from around the world. Browse meals, inspect their API properties, and check off ingredient lists powered by TheMealDB.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
