import { Document } from "langchain/document";
import { OllamaEmbeddings } from "@langchain/ollama";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const storeEmbeddings = async (vectors: Document[]) => {
	const embeddings = new OllamaEmbeddings({
		model: "nomic-embed-text",
	});

	return await MemoryVectorStore.fromDocuments(vectors, embeddings);
};

export default storeEmbeddings;
