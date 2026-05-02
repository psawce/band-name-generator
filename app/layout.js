import "./globals.css";

export const metadata = {
  title: "Band Name Generator",
  description: "Generate, save, and share band names.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
