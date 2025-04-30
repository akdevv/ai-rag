import { Document } from "langchain/document";
import { OllamaEmbeddings } from "@langchain/ollama";

const embedChunks = async (chunks: Document[]): Promise<number[][]> => {
	const embeddings = new OllamaEmbeddings({
		model: "nomic-embed-text",
	});

	return await embeddings.embedDocuments(
		chunks.map((doc) => doc.pageContent)
	);
};

export default embedChunks;
