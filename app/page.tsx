"use client";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import { MdArrowRightAlt } from "react-icons/md";
import { useFile } from "@/context/file-context";
import { useRouter } from "next/navigation";

export default function Home() {
	const { file } = useFile();
	const router = useRouter();

	const handleFileAnalyze = () => {
		if (file) {
			router.push("/analyze");
		}
	};

	return (
		<div className="flex flex-col items-center h-screen p-5">
			<h1 className="text-4xl font-bold">Welcome to the AI RAG</h1>

			<div className="flex flex-col items-center justify-center h-full">
				<FileUpload />
				<div className="mt-4 w-full">
					<Button
						disabled={!file}
						className="bg-accent text-foreground hover:bg-accent/90 transition-all duration-300 w-full cursor-pointer"
						onClick={handleFileAnalyze}
					>
						Analyze <MdArrowRightAlt />
					</Button>
				</div>
			</div>
		</div>
	);
}
