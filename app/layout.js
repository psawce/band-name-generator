export const metadata = { title: "Band Name Generator" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="night">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.css" rel="stylesheet" type="text/css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
