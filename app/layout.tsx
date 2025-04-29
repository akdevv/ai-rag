import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/shared/footer";
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
			<body
				className={`antialiased bg-background text-foreground font-bricolage p-3 md:p-5 flex flex-col min-h-screen`}
			>
				<FileProvider>
					<main className="flex-1">{children}</main>
					<Footer />
				</FileProvider>
			</body>
		</html>
	);
}
