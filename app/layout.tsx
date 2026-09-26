import type { Metadata } from "next";
import { preload } from "react-dom";
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
  // Barlow é a fonte dos títulos. Sem o preload ela só é pedida depois do CSS e chega após a
  // primeira pintura; com ele, o texto aparece ~0,3 s antes no celular (Lighthouse, 25/09).
  // O pulo do título na troca de fonte é resolvido pelas fontes reserva em globals.css.
  preload("/fonts/barlow.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
