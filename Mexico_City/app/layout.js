import "./Styles.css";

export const metadata = {
  title: "Mexico City",
  description: "Test"}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
