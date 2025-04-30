"use client";

import { useEffect } from "react";
import FileUpload from "@/components/file-upload";

export default function Home() {
	useEffect(() => {
		if (localStorage.getItem("chatMessages")) {
			localStorage.removeItem("chatMessages");
		}
	}, []);

	return (
		<div className="flex flex-col">
			<header>
				<h1 className="text-3xl sm:text-5xl md:text-6xl font-bungee text-center">
					Welcome to the AI RAG
				</h1>
				<p className="text-center text-foreground-hover mt-2 max-w-2xl mx-auto text-xs sm:text-base">
					Upload your document and use advanced RAG to chat with your
					data
				</p>
			</header>

			<div className="mt-24">
				<FileUpload />
			</div>
		</div>
	);
}
