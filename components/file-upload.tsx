"use client";

import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { useFile } from "@/context/file-context";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { FiUploadCloud, FiFileText } from "react-icons/fi";

export default function FileUpload() {
	const { file, setFile } = useFile();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();

		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			setFile(e.dataTransfer.files[0]);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const formatFileSize = (bytes: number) => {
		if (bytes < 1024) return `${bytes} bytes`;
		else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
		else return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	};

	const truncateFileName = (fileName: string) => {
		if (fileName.length <= 20) return fileName;
		const extension = fileName.split(".").pop() || "";
		const baseName = fileName.substring(0, fileName.lastIndexOf("."));
		const truncatedName = baseName.substring(0, 10) + "...";
		return `${truncatedName}.${extension}`;
	};

	const fileIcon = (fileName: string) => {
		const extension = fileName.split(".").pop() || "";
		switch (extension) {
			case "pdf":
				return <FaFilePdf />;
			case "txt":
				return <FiFileText />;
			case "docx":
				return <FaFileWord />;
			case "doc":
				return <FaFileWord />;
		}
	};

	return (
		<div
			className="border-2 border-dashed border-neutral-500 rounded-lg text-center cursor-pointer h-60 w-80 sm:w-md"
			onClick={() => fileInputRef.current?.click()}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			<div className="flex flex-col items-center justify-center h-full p-2">
				<input
					type="file"
					ref={fileInputRef}
					className="hidden"
					accept=".pdf, .txt, .docx, .doc"
					onChange={handleFileChange}
				/>
				<div className="">
					{!file ? (
						<>
							<div className="w-16 h-16 bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center">
								<FiUploadCloud className="w-8 h-8 text-neutral-500" />
							</div>
							<p className="text-lg">Drag and drop your</p>
							<p className="text-lg -mt-1">
								resume or click to browse
							</p>
							<p className="text-xs text-neutral-500 mt-1">
								Supported formats: PDF, DOCX, DOC, TXT
							</p>
						</>
					) : (
						<>
							<div className="flex items-center justify-between gap-2">
								<div className="flex items-center gap-2">
									{fileIcon(file.name)}
									<span className="text-sm font-medium">
										{truncateFileName(file.name)}
									</span>
									<span className="text-xs text-neutral-500">
										({formatFileSize(file.size)})
									</span>
								</div>
								<button
									className="flex items-center justify-center rounded-full bg-neutral-800 p-1 text-red-500 hover:bg-neutral-700 cursor-pointer transition-all duration-300"
									onClick={() => setFile(null)}
								>
									<IoClose />
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
}
