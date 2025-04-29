import { cn } from "@/lib/utils";

export default function Loader({
	text,
	className,
}: {
	text?: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex h-screen items-center justify-center",
				className
			)}
		>
			<div className="flex flex-col items-center justify-center gap-2">
				<div className="w-10 h-10 border-4 border-neutral-700 border-t-accent rounded-full animate-spin" />
				<div className="text-neutral-500 text-sm">{text}</div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
