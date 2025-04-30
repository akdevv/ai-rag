import { ChatOllama } from "@langchain/ollama";
import { HumanMessage } from "@langchain/core/messages";
import { getVectorStore } from "@/services/vectorStore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const { userMessage } = await req.json();

		if (!userMessage) {
			return NextResponse.json(
				{ error: "User message is required" },
				{ status: 400 }
			);
		}

		const vectorStore = getVectorStore();

		// Similarity search
		const results = await vectorStore.similaritySearch(userMessage);
		const context = results
			.map((result) => result.pageContent)
			.join("\n\n");

		// Prepare the prompt
		const prompt = `
        You are a helpful assistant that can answer questions about the following text:
        ${context}

        Question: ${userMessage}
        `;

		// Generate the response
		const model = new ChatOllama({
			baseUrl: "http://localhost:11434",
			model: "mistral",
		});

		const res = await model.invoke([new HumanMessage(prompt)]);
		return NextResponse.json({ aiResponse: res.content });
	} catch (error) {
		console.error("Error in chat API:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
