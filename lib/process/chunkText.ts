import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const chunkText = async (text: string): Promise<Document[]> => {
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 200,
	});

	return await splitter.createDocuments([text]);
};

export default chunkText;
