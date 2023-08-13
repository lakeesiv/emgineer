import Footer from "components/layout/footer";
import NavBar from "components/layout/navbar";
import "lib/non/styles.css";
import "components/globals.css";
import { Providers } from "components/layout/providers";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Emgineers</title>
        <meta
          name="description"
          content="Emmanuel College Engineering Society"
        />
        <meta property="og:title" content="Emgineers" />
        <meta
          property="og:description"
          content="Emmanuel College Engineering Society"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta property="og:image" content="https://emgineer.vercel.app/og/" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="mb-auto">{children}</main>
            <Footer />
          </div>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
