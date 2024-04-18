// place files you want to import through the `$lib` alias in this folder.

import type { Color } from '@sveltestrap/sveltestrap';

/**
 * Calculates the sum of a given set of numbers.
 *
 * @param {...number[]} arr - The numbers to be summed.
 * @returns {number} The sum of the input numbers.
 */
export const sum = (...arr: number[]): number => [...arr].reduce((acc, val) => acc + val, 0);

/**
 * Finds the index of the maximum value in an array of numbers.
 *
 * @param {number[]} results - The array of numbers.
 * @returns {number} - The index of the maximum value.
 */
export const findMaxIndex = (results: number[]): number => results.indexOf(Math.max(...results));

/**
 * Transforms a string to "Sentence case".
 *
 * @param {string} str - The string to be converted to Sentence Case.
 * @returns {string} The string converted to Sentence Case.
 */
export const toSentenceCase = (str: string | undefined): string => {
	if (!str) return "";
	// @ts-expect-error This could be null, but the way we use it won't make that happen.
	const s = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g).join(' ');
	return s.slice(0, 1).toUpperCase() + s.slice(1);
};

/**
 * Returns a random item from the given array.
 *
 * @param {Array} itemArray - The array from which to select a random item.
 * @return {any | undefined} - A random item from the array, or undefined if the array is empty.
 */
export function randomItem<T>(itemArray: T[]): T | undefined {
	if (itemArray.length === 0) return undefined;
	const randomIndex = Math.floor(Math.random() * itemArray.length);
	return itemArray[randomIndex];
}

/**
 * The endpoint to fetch polls from.
 */
export const endpoint: string = "http://localhost:3000";

/**
 * Loading messages from SimCity 4.
 */
export const loadingMessages: string[] = [
	"Adding Hidden Agendas",
	"Adjusting Bell Curves",
	"Aesthesizing Industrial Areas",
	"Aligning Covariance Matrices",
	"Applying Feng Shui Shaders",
	"Applying Theatre Soda Layer",
	"Asserting Packed Exemplars",
	"Attempting to Lock Back-Buffer",
	"Binding Sapling Root System",
	"Breeding Fauna",
	"Building Data Trees",
	"Bureacritizing Bureaucracies",
	"Calculating Inverse Probability Matrices",
	"Calculating Llama Expectoration Trajectory",
	"Calibrating Blue Skies",
	"Charging Ozone Layer",
	"Coalescing Cloud Formations",
	"Cohorting Exemplars",
	"Collecting Meteor Particles",
	"Compounding Inert Tessellations",
	"Compressing Fish Files",
	"Computing Optimal Bin Packing",
	"Concatenating Sub-Contractors",
	"Containing Existential Buffer",
	"Debarking Ark Ramp",
	"Debunching Unionized Commercial Services",
	"Deciding What Message to Display Next",
	"Decomposing Singular Values",
	"Decrementing Tectonic Plates",
	"Deleting Ferry Routes",
	"Depixelating Inner Mountain Surface Back Faces",
	"Depositing Slush Funds",
	"Destabilizing Economic Indicators",
	"Determining Width of Blast Fronts",
	"Deunionizing Bulldozers",
	"Dicing Models",
	"Diluting Livestock Nutrition Variables",
	"Downloading Satellite Terrain Data",
	"Exposing Flash Variables to Streak System",
	"Extracting Resources",
	"Factoring Pay Scale",
	"Fixing Election Outcome Matrix",
	"Flood-Filling Ground Water",
	"Flushing Pipe Network",
	"Gathering Particle Sources",
	"Generating Jobs",
	"Gesticulating Mimes",
	"Graphing Whale Migration",
	"Hiding Willio Webnet Mask",
	"Implementing Impeachment Routine",
	"Increasing Accuracy of RCI Simulators",
	"Increasing Magmafacation",
	"Initializing My Sim Tracking Mechanism",
	"Initializing Rhinoceros Breeding Timetable",
	"Initializing Robotic Click-Path AI",
	"Inserting Sublimated Messages",
	"Integrating Curves",
	"Integrating Illumination Form Factors",
	"Integrating Population Graphs",
	"Iterating Cellular Automata",
	"Lecturing Errant Subsystems",
	"Mixing Genetic Pool",
	"Modeling Object Components",
	"Mopping Occupant Leaks",
	"Normalizing Power",
	"Obfuscating Quigley Matrix",
	"Overconstraining Dirty Industry Calculations",
	"Partitioning City Grid Singularities",
	"Perturbing Matrices",
	"Pixalating Nude Patch",
	"Polishing Water Highlights",
	"Populating Lot Templates",
	"Preparing Sprites for Random Walks",
	"Prioritizing Landmarks",
	"Projecting Law Enforcement Pastry Intake",
	"Realigning Alternate Time Frames",
	"Reconfiguring User Mental Processes",
	"Relaxing Splines",
	"Removing Road Network Speed Bumps",
	"Removing Texture Gradients",
	"Removing Vehicle Avoidance Behavior",
	"Resolving GUID Conflict",
	"Reticulating Splines",
	"Retracting Phong Shader",
	"Retrieving from Back Store",
	"Reverse Engineering Image Consultant",
	"Routing Neural Network Infanstructure",
	"Scattering Rhino Food Sources",
	"Scrubbing Terrain",
	"Searching for Llamas",
	"Seeding Architecture Simulation Parameters",
	"Sequencing Particles",
	"Setting Advisor Moods",
	"Setting Inner Deity Indicators",
	"Setting Universal Physical Constants",
	"Sonically Enhancing Occupant-Free Timber",
	"Speculating Stock Market Indices",
	"Splatting Transforms",
	"Stratifying Ground Layers",
	"Sub-Sampling Water Data",
	"Synthesizing Gravity",
	"Synthesizing Wavelets",
	"Time-Compressing Simulator Clock",
	"Unable to Reveal Current Activity",
	"Weathering Buildings",
	"Zeroing Crime Network",
];

/**
 * Colors to use for each poll on the screen.
 */
export const colors: Color[] = ['success', 'warning', 'danger', 'primary'];