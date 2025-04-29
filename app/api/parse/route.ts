import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { file } = await request.json();
}
