import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";

declare global {
	interface Url {
		title: string;
		href: string;
		icon?: IconDefinition;
	}

	interface CommissionImage {
		src: string;
		alt?: string;
	}
}
