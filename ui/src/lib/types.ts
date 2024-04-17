export interface Poll {
	id: number;
	title: string;
	options: string[];
	results: number[];
	isOpen: boolean;
	vote?: number | undefined;
}

export interface PollsResponse {
	polls: Poll[];
}
