import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import App from "./app";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const font = Manrope({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Faber Color",
    description: "A simple paint page built with Next.js and Tailwind CSS",
    icons: {
        icon: "/favicon.ico", // Đường dẫn từ thư mục public/
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${font.className} antialiased`}>
                <StoreProvider>
                    <App>{children}</App>
                </StoreProvider>
            </body>
        </html>
    );
}
