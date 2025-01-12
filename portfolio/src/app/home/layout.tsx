import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guti's Portfolio",
  description: "Diego Gutierrez' Portfolio Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-dark-bg">
        {children}
      </body>
    </html>
  );
}
