import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Generate recipes from Youtube videos using AI",
  description: "Quick and easy recipes, watch cooking videos with your recipe, generate recipes from video using AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <Header />
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
