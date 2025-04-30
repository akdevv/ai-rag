import { Document } from "langchain/document";
import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const storeEmbeddings = async (
	embeddings: number[][],
	documents: Document[]
) => {
	const vectorStore = new MemoryVectorStore(
		new OllamaEmbeddings({
			model: "nomic-embed-text",
		})
	);
	await vectorStore.addVectors(embeddings, documents);
	return vectorStore;
};

export default storeEmbeddings;
