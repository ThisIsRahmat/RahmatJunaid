import "./Styles.css";

export const metadata = {
  title: "Matt Mannucci | Product & Design",
  description: "Product and design generalist based in Berkeley, CA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}