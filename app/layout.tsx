import "./globals.css";
import type { Metadata } from "next";
import { FileProvider } from "@/context/file-context";

export const metadata: Metadata = {
	title: "AI RAG",
	description: "AI RAG",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`antialiased bg-background text-foreground`}>
				<FileProvider>{children}</FileProvider>
			</body>
		</html>
	);
}
