import type { Metadata } from "next";
import { SITE_URL, SITE_INDEXABLE, pageOpenGraph } from "@/lib/site";
import "./globals.css";

const description = "A força da nossa remada. Competições, resultados, notícias e a história da canoagem no Rio Grande do Sul.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "FGC — Federação Gaúcha de Canoagem",
  description,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({ title: "FGC — Federação Gaúcha de Canoagem", description, url: "/" }),
  twitter: { card: "summary_large_image" },
  robots: SITE_INDEXABLE ? undefined : { index: false, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
