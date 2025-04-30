import { v4 as uuidv4 } from "uuid";
import { Document } from "langchain/document";
import { OllamaEmbeddings } from "@langchain/ollama";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const storeEmbeddings = async (vectors: Document[]) => {
	const embeddings = new OllamaEmbeddings({
		model: "nomic-embed-text",
	});

	const vectorStore = await Chroma.fromDocuments(vectors, embeddings, {
		collectionName: `chunk-${uuidv4()}`,
	});

	return vectorStore;
};

export default storeEmbeddings;
