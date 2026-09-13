// can add more later
type SnackbarType = "success" | "error";

export interface Snackbar {
	type: SnackbarType;
	title: string;
	description?: string;
	delay?: number;
}

// global snackbar store
export const snackbars = $state<Record<string, Snackbar>>({});

export function pushSnackbar(snackbar: Snackbar) {
	// can surgically remove keys without affecting other indices so we use a record
	snackbars[crypto.randomUUID()] = snackbar;
}

export function popSnackbar(id: string) {
	delete snackbars[id];
}

// handy shorthands for like 99% of cases
export const showSuccess = (title: string, description?: string) =>
	pushSnackbar({ title, description, type: "success" });
export const showError = (title: string, description?: string, persist?: boolean) =>
	pushSnackbar({ title, description, type: "error", delay: persist ? -1 : undefined });
