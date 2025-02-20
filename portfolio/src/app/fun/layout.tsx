import type { Metadata } from "next";
import { Header } from "@/components/global/Header";
import { ThemeProvider } from "@/components/global/theme-provider";
import { helveticaFont } from "@/helper/helveticaFont";
import NavBar from "@/components/global/NavBar";
import Nav from "@/components/fun/Nav";

export const metadata: Metadata = {
  title: "Fun",
  description: "Diego Gutierrez' Portfolio Fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaFont.className} bg-light-bg overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="flex justify-center sm:-mt-14 -mt-2">
            <Nav />
          </div>
          {children}
          <NavBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
