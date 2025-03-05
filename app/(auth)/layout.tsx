
import Provider from "../Provider";
import { Inter } from "next/font/google";
import "../globals.css";
import FacebookPixel from "@/components/pixel/FacebookPixel";

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <FacebookPixel />
          <section>
            <div className="w-full">
                {children}
            </div>
          </section>
        </Provider>
      </body>
    </html>
);
}

