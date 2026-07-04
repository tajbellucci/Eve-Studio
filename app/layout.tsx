import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eve Studio® — Full-Service Creative Studio",
  description:
    "Eve Studio is a full-service creative studio crafting unforgettable digital experiences through strategy, design, development and storytelling. Since '18.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  );
}
