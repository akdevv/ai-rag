import { MemoryVectorStore } from "langchain/vectorstores/memory";

let vectorStore: MemoryVectorStore | null = null;

export function setVectorStore(store: MemoryVectorStore) {
	vectorStore = store;
}

export function getVectorStore(): MemoryVectorStore {
	if (!vectorStore) {
		throw new Error("Vector store not initialized");
	}
	return vectorStore;
}
