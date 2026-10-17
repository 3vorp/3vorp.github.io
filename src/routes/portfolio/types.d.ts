export interface PortfolioItem {
	src: string;
	alt?: string;
	title: string;
	description: string;
	links?: { text: string, href: string }[];
	date: string;
	tools: string;
	show_download?: boolean;
	pad?: boolean;
}
