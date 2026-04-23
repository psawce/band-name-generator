import "./globals.css";

export const metadata = { title: "Band Name Generator" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.css" rel="stylesheet" type="text/css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
