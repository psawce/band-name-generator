export const metadata = { title: "Band Name Generator" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#fff", color: "#111" }}>
        {children}
      </body>
    </html>
  );
}
