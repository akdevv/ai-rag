import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
	return (
		<footer>
			<Link
				href="https://github.com/akdevv"
				target="_blank"
				className="flex items-center justify-center gap-2 text-foreground-hover hover:text-foreground transition-all duration-300"
			>
				<FaGithub className="text-lg" />
				akdevv
			</Link>
		</footer>
	);
}
