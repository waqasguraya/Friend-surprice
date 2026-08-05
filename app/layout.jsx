import "./globals.css";
import { Cinzel, Poppins } from "next/font/google";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Welcome to the Kingdom",
  description: "A Special Surprise",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}