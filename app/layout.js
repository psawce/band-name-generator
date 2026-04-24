import "./globals.css";

export const metadata = { title: "Band Name Generator" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
       <link rel="stylesheet" href="https://use.typekit.net/zqj2efl.css">
      </head>
      <body>{children}</body>
    </html>
  );
}
