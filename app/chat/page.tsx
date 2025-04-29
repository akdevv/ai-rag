"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFile } from "@/context/file-context";
import Loader from "@/components/shared/loader";
import CustomError from "@/components/shared/custom-error";

export default function Analyze() {
	const { file } = useFile();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

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

	if (isLoading) {
		return <Loader text="Processing your file..." />;
	}

	if (error) {
		return <CustomError message={error || "An error occurred"} />;
	}

	return (
		<div className="min-h-screen p-8">
			<div
				className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative"
				role="alert"
			>
				<strong className="font-bold">Success!</strong>
				<span className="block sm:inline">
					{" "}
					File processed successfully. Chat UI coming soon!
				</span>
			</div>
		</div>
	);
}
