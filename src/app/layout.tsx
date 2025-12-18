import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Ergonomic Coach",
  description: "Real-time posture analysis and ergonomic guidance powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-dark-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
