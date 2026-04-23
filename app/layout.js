import "./globals.css";

export const metadata = { title: "Band Name Generator" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <body>{children}</body>
    </html>
  );
}
