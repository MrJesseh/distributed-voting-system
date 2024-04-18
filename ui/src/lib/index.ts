// place files you want to import through the `$lib` alias in this folder.

import type { Color } from '@sveltestrap/sveltestrap';

/**
 * Sum the contents of an array of numbers.
 * @param arr The array to sum.
 * @return The sum of all the values in the array.
 */
export const sum = (...arr: number[]) => [...arr].reduce((acc, val) => acc + val, 0);

export const findMaxIndex = (results: number[]): number => results.indexOf(Math.max(...results));

/**
 * The endpoint to fetch polls from.
 */
export const endpoint: string = "http://localhost:3000";

/**
 * Colors to use for each poll on the screen.
 */
export const colors: Color[] = ['success', 'warning', 'danger', 'primary'];