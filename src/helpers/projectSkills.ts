export interface Project {
	title: string;
	description: string;
	href: string;
	image: string;
	langs?: string[];
	frameworks?: string[];
	category: string;
}

export interface SkillRecord {
	name: string;
	count: number;
}

export default function projectSkills(projects: Project[]) {
	// this is all constant so we don't need to use $derived
	const groupedBySkill = projects.reduce<Record<string, Project[]>>((acc, cur) => {
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

	const availableSkills = Object.keys(groupedBySkill).sort((a, b) =>
		// sort alphabetically if tied, otherwise most used goes first
		groupedBySkill[b].length === groupedBySkill[a].length
			? a.localeCompare(b)
			: groupedBySkill[b].length - groupedBySkill[a].length,
	);

	// use availableKeys so the record is already sorted
	const skillData = availableSkills.reduce<Record<string, SkillRecord[]>>(
		(acc, cur) => {
			const record: SkillRecord = { name: cur, count: groupedBySkill[cur].length };
			if (projects.some((p) => (p.langs || []).includes(cur))) acc.Languages.push(record);
			if (projects.some((p) => (p.frameworks || []).includes(cur))) acc.Frameworks.push(record);
			return acc;
		},
		{ Languages: [], Frameworks: [] },
	);

	return { availableSkills, skillData, groupedBySkill };
}
