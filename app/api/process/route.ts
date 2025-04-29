import { NextRequest, NextResponse } from "next/server";
import parseFile from "@/lib/parseFile";
import chalk from "chalk";

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

		// Log file information
		console.log(chalk.green("📄 File received:"));
		console.log(chalk.yellow(`   - Name: ${file.name}`));
		console.log(chalk.yellow(`   - Type: ${file.type}`));
		console.log(
			chalk.yellow(`   - Size: ${(file.size / 1024).toFixed(2)} KB`)
		);
		console.log(
			chalk.yellow(
				`   - Last Modified: ${new Date(
					file.lastModified
				).toLocaleString()}`
			)
		);

		console.log(chalk.blue("🔍 Starting file parsing..."));
		const documents = await parseFile(file);

		console.log(chalk.green("✅ File parsed successfully:"));
		console.log(
			chalk.yellow(`   - Number of documents: ${documents.length}`)
		);
		console.log(
			chalk.yellow(
				`   - First document preview: ${documents[0].pageContent.substring(
					0,
					100
				)}...`
			)
		);

		// TODO: Store the parsed documents in your vector store or database
		console.log(chalk.blue("💾 Documents ready for storage"));

		return NextResponse.json({
			success: true,
			message: "File processed successfully",
			fileName: file.name,
			documentCount: documents.length,
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
