import projects from "../data/projects.json";

export interface Project {
	title: string;
	description: string;
	href: string;
	image: string;
	langs?: string[];
	frameworks?: string[];
}

export default function projectSkills() {
	// this is all constant so we don't need to use $derived at all
	const projectList = Object.values(projects).flat();

	const groupedProjects = projectList.reduce<Record<string, Project[]>>((acc, cur) => {
		for (const lang of cur.langs || []) {
			acc[lang] ||= [];
			acc[lang].push(cur);
		}
		for (const framework of cur.frameworks || []) {
			acc[framework] ||= [];
			acc[framework].push(cur);
		}
		return acc;
	}, {});

	const availableKeys = Object.keys(groupedProjects).sort((a, b) =>
		// sort alphabetically if tied, otherwise most used goes first
		groupedProjects[b].length === groupedProjects[a].length
			? a.localeCompare(b)
			: groupedProjects[b].length - groupedProjects[a].length,
	);

	const groupedKeys = availableKeys.reduce<Record<string, string[]>>(
		(acc, cur) => {
			if (projectList.some((p) => (p.langs || []).includes(cur))) acc.Languages.push(cur);
			if (projectList.some((p) => (p.frameworks || []).includes(cur))) acc.Frameworks.push(cur);
			return acc;
		},
		{ Languages: [], Frameworks: [] },
	);

	return { availableKeys, groupedKeys, groupedProjects };
}
