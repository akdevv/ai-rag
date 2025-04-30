"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFile } from "@/context/file-context";
import Loader from "@/components/shared/loader";
import { BiSolidSend } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { FaRobot, FaUser, FaFile } from "react-icons/fa";
import CustomError from "@/components/shared/custom-error";

type Message = {
	id: string;
	text: string;
	sender: "ai" | "user";
};

export default function Chat() {
	const { file } = useFile();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			text: "Hello! I've processed your document. What would you like to know about it?",
			sender: "ai",
		},
	]);
	const [inputMessage, setInputMessage] = useState("");

	if (!file) {
		router.push("/");
		return null;
	}

	useEffect(() => {
		const processFile = async () => {
			if (!file) return;

			setIsLoading(true);
			const formData = new FormData();
			formData.append("file", file);

			try {
				const res = await axios.post("/api/process", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
			} catch (error: any) {
				console.error("Error processing file:", error);
				setError(
					error instanceof Error ? error.message : "An error occurred"
				);
			} finally {
				setIsLoading(false);
			}
		};

		processFile();
	}, [file]);

	const handleSendMessage = () => {
		if (!inputMessage.trim()) return;

		const newMessage: Message = {
			id: Date.now().toString(),
			text: inputMessage,
			sender: "user",
		};

		setMessages([...messages, newMessage]);
		setInputMessage("");

		// Simulate AI response (in a real app, you would call your AI API here)
		setTimeout(() => {
			const aiResponse: Message = {
				id: (Date.now() + 1).toString(),
				text: "I'm analyzing your document based on your query. Here's what I found...",
				sender: "ai",
			};
			setMessages((prev) => [...prev, aiResponse]);
		}, 1000);
	};

	if (isLoading) {
		return <Loader text="Processing your file..." />;
	}

	if (error) {
		return <CustomError message={error || "An error occurred"} />;
	}

	return (
		<div className="flex justify-center">
			<div className="max-w-4xl w-full flex flex-col h-[calc(100vh-5rem)]">
				<div className="flex-1 overflow-y-auto mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
					<div className="flex items-center w-fit gap-2 mb-4 p-2 rounded-lg bg-neutral-800 border border-neutral-700">
						<FaFile className="text-accent" />
						<span className="font-medium">{file.name}</span>
					</div>

					<div className="space-y-4">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`flex ${
									message.sender === "user"
										? "justify-end"
										: "justify-start"
								}`}
							>
								<div
									className={`flex items-end gap-2 max-w-[80%] ${
										message.sender === "user"
											? "flex-row-reverse"
											: "flex-row"
									}`}
								>
									<div
										className={`w-8 h-8 rounded-full flex items-center justify-center ${
											message.sender === "ai"
												? "bg-accent"
												: "bg-green-500"
										}`}
									>
										{message.sender === "ai" ? (
											<FaRobot className="text-white" />
										) : (
											<FaUser className="text-white" />
										)}
									</div>
									<div className="p-3 rounded-xl bg-neutral-800 border border-neutral-700">
										{message.text}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="sticky bottom-0">
					<div className="flex items-center gap-2 bg-neutral-800 border border-neutral-700 rounded-full p-2">
						<input
							type="text"
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyDown={(e) =>
								e.key === "Enter" && handleSendMessage()
							}
							placeholder="Ask something about your document..."
							className="flex-1 outline-none pl-2 text-neutral-100"
						/>
						<Button
							onClick={handleSendMessage}
							className="bg-accent text-white p-2 rounded-full hover:bg-accent/80 transition-colors duration-300 cursor-pointer"
						>
							<BiSolidSend />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
