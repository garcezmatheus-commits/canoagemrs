import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FGC — Federação Gaúcha de Canoagem",
  description: "A força da nossa remada. Competições, resultados, notícias e a história da canoagem no Rio Grande do Sul.",
  icons: {
    icon: "/logo-fgc.jpeg",
    shortcut: "/logo-fgc.jpeg",
  },
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
