import type { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider/SessionProvider";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "🕵️",
  description: "ADMIN",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="overflow-hidden">
        <div className="bg-dark-bg h-screen w-screen">
          <SessionProvider session={session}>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
