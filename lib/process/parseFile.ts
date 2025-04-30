import { Document } from "langchain/document";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

const parseTextFile = async (blob: Blob): Promise<Document[]> => {
	const text = await blob.text();
	return [
		new Document({
			pageContent: text,
			metadata: { source: "text" },
		}),
	];
};

const parsePdfFile = async (blob: Blob): Promise<Document[]> => {
	const buffer = await blob.arrayBuffer();
	const pdfBlob = new Blob([buffer], { type: "application/pdf" });
	const loader = new PDFLoader(pdfBlob, {
		splitPages: false, // one document per page
	});
	return await loader.load();
};

const parseDocxFile = async (blob: Blob): Promise<Document[]> => {
	const buffer = await blob.arrayBuffer();
	const docxBlob = new Blob([buffer], {
		type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
	});
	const loader = new DocxLoader(docxBlob);
	return await loader.load();
};

const parseFile = async (file: File) => {
	const fileType = file.type;
	const buffer = await file.arrayBuffer();
	const blob = new Blob([buffer], { type: fileType });

	if (fileType === "text/plain") return parseTextFile(blob);
	else if (fileType === "application/pdf") return parsePdfFile(blob);
	else if (
		fileType ===
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document"
	)
		return parseDocxFile(blob);
	else throw new Error(`Unsupported file type: ${fileType}`);
};

export default parseFile;
