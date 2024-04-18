// place files you want to import through the `$lib` alias in this folder.

import type { Poll } from '$lib/types';
import type { Color } from '@sveltestrap/sveltestrap';

/**
 * Sum the contents of an array of numbers.
 * @param arr The array to sum.
 * @return The sum of all the values in the array.
 */
export const sum = (...arr: number[]) => [...arr].reduce((acc, val) => acc + val, 0);

export const findMaxIndex = (results: number[]): number => results.indexOf(Math.max(...results));

/**
 * Test polls for showing off functionality.
 */
export const polls: Poll[] = [
	{
		id: 1,
		title: 'What is your favorite season?',
		options: ['Spring', 'Summer', 'Winter'],
		results: [123, 789, 456],
		isOpen: true
	},
	{
		id: 2,
		title: 'What is your preferred pet?',
		options: ['Dog', 'Cat', 'Bird'],
		results: [100, 50, 10],
		isOpen: true
	},
	{
		id: 3,
		title: 'Which cuisine do you prefer?',
		options: ['Italian', 'Chinese', 'Mexican'],
		results: [75, 50, 150],
		isOpen: true
	},
	{
		id: 4,
		title: 'What type of music do you prefer?',
		options: ['Rock', 'Pop', 'Jazz'],
		results: [100, 90, 50],
		isOpen: true
	},
	{
		id: 5,
		title: 'What kind of movies do you prefer?',
		options: ['Action', 'Comedy', 'Drama'],
		results: [90, 100, 70],
		isOpen: false
	}
];

/**
 * Colors to use for each poll on the screen.
 */
export const colors: Color[] = ['success', 'warning', 'danger', 'primary'];