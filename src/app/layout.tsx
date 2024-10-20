import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CW Mastery",
	description: "Morse Code Learning App",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<html lang="ja">
			<body className={inter.className}>
				<SessionProvider>
					<Header session={session} />
					{children}
				</SessionProvider>
			</body>
		</html>
	);
}
