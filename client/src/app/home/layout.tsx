import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components";
import { HeaderSub } from "@/components/ui";
import { UserProvider } from "@/libs/contexts/user.context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SportMan | Home",
    description: "Generated by create next app",
};

export default function HomeLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
