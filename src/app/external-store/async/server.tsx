"use server";

export const dummySearch = async (search: string): Promise<string[]> => {
	await new Promise((resolve) => setTimeout(resolve));
	return [
		`${search} - ${Math.random().toFixed(4)}`,
		`${search} - ${Math.random().toFixed(4)}`,
		`${search} - ${Math.random().toFixed(4)}`,
	];
};
