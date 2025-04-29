import { MdErrorOutline } from "react-icons/md";

export default function CustomError({
	message,
	className,
}: {
	message: string;
	className?: string;
}) {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<div className="bg-red-600 rounded-full p-3">
				<MdErrorOutline className="text-white text-3xl" />
			</div>
			<p className="text-red-500 mt-2">{message}</p>
		</div>
	);
}
