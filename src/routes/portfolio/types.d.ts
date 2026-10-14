export interface PortfolioItem {
	src: string;
	alt?: string;
	title: string;
	description: string;
	links?: Record<string, string>;
	date: string;
	tools: string;
	show_download?: boolean;
}
