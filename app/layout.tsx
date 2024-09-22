import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: "Cooking recipes without the nonsense, just recipes.",
  description: "The quickest way to learn a new recipe.",
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
          <div className='content-wrap'>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
