"use server";

export const dummySearch = async (search: string): Promise<string[]> => {
	return [
		`${search} - ${Math.random().toFixed(4)}`,
		`${search} - ${Math.random().toFixed(4)}`,
		`${search} - ${Math.random().toFixed(4)}`,
	];
};
