import type { Color } from '@sveltestrap/sveltestrap';

export interface Poll {
  id: number;
  title: string;
  options: string[];
  results: number[];
  isOpen: boolean;
  // Ignored ID from the database
  _id: string;
}

export interface AlertMessage {
  id: number,
  message: string,
  icon: string,
  color: Color | string
}