"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFile } from "@/context/file-context";
import Loader from "@/components/shared/loader";
import { BiSolidSend } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import CustomError from "@/components/shared/custom-error";
import { FaRobot, FaUser, FaFile, FaArrowLeft } from "react-icons/fa";

type Message = {
	id: string;
	text: string;
	sender: "ai" | "user";
	isLoading?: boolean;
};

export default function Chat() {
	const { file } = useFile();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessage, setInputMessage] = useState("");
	const [isAiResponding, setIsAiResponding] = useState(false);

	if (!file) {
		router.push("/");
		return null;
	}

	useEffect(() => {
		// Load messages from localStorage
		const savedMessages = localStorage.getItem("chatMessages");
		if (savedMessages) {
			setMessages(JSON.parse(savedMessages));
		} else {
			// Set initial message if no saved messages
			const initialMessage: Message = {
				id: "1",
				text: "Hello! I've processed your document. What would you like to know about it?",
				sender: "ai",
			};
			setMessages([initialMessage]);
			localStorage.setItem(
				"chatMessages",
				JSON.stringify([initialMessage])
			);
		}
	}, []);

	// Save messages to localStorage whenever they change
	useEffect(() => {
		if (messages.length > 0) {
			localStorage.setItem("chatMessages", JSON.stringify(messages));
		}
	}, [messages]);

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

	const handleSendMessage = async () => {
		if (!inputMessage.trim() || isAiResponding) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			text: inputMessage,
			sender: "user",
		};

		const updatedMessages = [...messages, userMessage];
		setMessages(updatedMessages);
		setInputMessage("");
		setIsAiResponding(true);

		// Add loading message
		const loadingMessage: Message = {
			id: `loading-${Date.now()}`,
			text: "...",
			sender: "ai",
			isLoading: true,
		};

		setMessages([...updatedMessages, loadingMessage]);

		try {
			const res = await axios.post("/api/chat", {
				userMessage: inputMessage,
			});

			// Replace loading message with actual response
			const aiMessage: Message = {
				id: Date.now().toString(),
				text: res.data.aiResponse,
				sender: "ai",
			};

			const finalMessages = updatedMessages.concat(aiMessage);
			setMessages(finalMessages);
		} catch (error) {
			console.error("Error sending message:", error);

			// Replace loading message with error
			const errorMessage: Message = {
				id: Date.now().toString(),
				text: "Sorry, I encountered an error processing your request.",
				sender: "ai",
			};

			const finalMessages = updatedMessages.concat(errorMessage);
			setMessages(finalMessages);
		} finally {
			setIsAiResponding(false);
		}
	};

	if (isLoading) {
		return <Loader text="Processing your file..." />;
	}

	if (error) {
		return <CustomError message={error || "An error occurred"} />;
	}

	return (
		<div className="flex justify-center">
			<Button
				size="icon"
				onClick={() => router.back()}
				className="absolute top-3 left-3 bg-neutral-800 border border-neutral-700 hover:bg-neutral-600 cursor-pointer rounded-full p-4"
			>
				<FaArrowLeft className="text-white" />
			</Button>

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
									<div className="p-3 max-w-[80%] rounded-xl bg-neutral-800 border border-neutral-700">
										{message.isLoading ? (
											<div className="flex gap-1 font-extrabold">
												<span className="animate-pulse">
													.
												</span>
												<span className="animate-pulse animation-delay-200">
													.
												</span>
												<span className="animate-pulse animation-delay-400">
													.
												</span>
											</div>
										) : (
											message.text
										)}
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
							disabled={isAiResponding}
						/>
						<Button
							onClick={handleSendMessage}
							className="bg-accent text-white p-2 rounded-full hover:bg-accent/80 transition-colors duration-300 cursor-pointer"
							disabled={isAiResponding}
						>
							<BiSolidSend />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
