import Footer from "components/layout/footer";
import NavBar from "components/layout/navbar";
import "notion-on-next/non.css";
import "components/globals.css";
import { Providers } from "components/layout/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
