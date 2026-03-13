import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

declare global {
	interface Url {
		title: string;
		href: string;
		icon: IconDefinition;
	}

	interface Commission {
		src: string;
		alt?: string;
		type: string;
		date: Date;
	}
}
