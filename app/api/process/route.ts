import chalk from "chalk";
import parseFile from "@/lib/process/parseFile";
import chunkText from "@/lib/process/chunkText";
import embedChunks from "@/lib/process/embedChunks";
import { NextRequest, NextResponse } from "next/server";
import { setVectorStore } from "@/services/vectorStore";
import storeEmbeddings from "@/lib/process/storeEmbeddings";

export async function POST(request: NextRequest) {
	try {
		console.log(chalk.blue("📥 Starting file processing..."));

		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			console.log(chalk.red("❌ No file provided in the request"));
			return NextResponse.json(
				{ success: false, error: "No file provided" },
				{ status: 400 }
			);
		}

		// STEP 1: Parse the file
		console.log(chalk.blue("🔍 Starting file parsing..."));
		const parsedFile = await parseFile(file);
		console.log(chalk.green("✅ File parsed successfully:"));
		console.log("Parsed text:", parsedFile);

		// STEP 2: Chunk the parsed file
		console.log(chalk.blue("🔍 Starting file chunking..."));
		const chunkedText = await chunkText(parsedFile[0].pageContent);
		console.log(chalk.green("✅ File chunked successfully:"));
		console.log("Chunked text:", chunkedText);

		// STEP 3: Embed the chunks
		console.log(chalk.blue("🔍 Starting chunk embedding..."));
		const embeddedChunks = await embedChunks(chunkedText);
		console.log(chalk.green("✅ Chunks embedded successfully:"));
		console.log("Embedded chunks:", embeddedChunks);

		// STEP 4: Store the embeddings
		console.log(chalk.blue("🔍 Starting vector store storage..."));
		const vectorStore = await storeEmbeddings(embeddedChunks, chunkedText);
		console.log(chalk.green("✅ Vector store stored successfully:"));
		console.log("Vector store:", vectorStore);
		setVectorStore(vectorStore);

		return NextResponse.json({
			success: true,
			message: "File processed successfully",
		});
	} catch (error) {
		console.error(chalk.red("❌ Error processing file:"), error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to process file",
			},
			{ status: 500 }
		);
	}
}
