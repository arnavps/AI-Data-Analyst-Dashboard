import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Data Analyst Dashboard",
  description: "Enterprise-grade data analysis with Apple's Human Interface Guidelines design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-background text-text-primary selection:bg-apple-blue/20 selection:text-apple-blue">
        {children}
        <Toaster 
          position="top-center" 
          richColors 
          closeButton 
          toastOptions={{
            className: "apple-toast",
            style: {
              borderRadius: "16px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              border: "1px solid rgba(0,0,0,0.05)",
              padding: "16px"
            }
          }}
        />
      </body>
    </html>
  );
}
