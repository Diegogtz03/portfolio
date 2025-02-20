import type { Metadata } from "next";
import { Header } from "@/components/global/Header";
import { ThemeProvider } from "@/components/global/theme-provider";
import { helveticaFont } from "@/helper/helveticaFont";
import NavBar from "@/components/global/NavBar";

export const metadata: Metadata = {
  title: "Home",
  description: "Diego Gutierrez' Portfolio Home",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helveticaFont.className} bg-light-bg`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <NavBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
