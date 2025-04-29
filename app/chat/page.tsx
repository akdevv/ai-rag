"use client";

import { useRouter } from "next/navigation";
import { useFile } from "@/context/file-context";

export default function Analyze() {
	const { file } = useFile();
	const router = useRouter();

	if (!file) {
		router.push("/");
	}

	return <div>Analyze</div>;
}
