import { type ClassValue, clsx } from 'clsx';
import { metaData, SubjectMetaType } from 'src/data/meta';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSortedYears = (years: string[]) =>
  years
    .map(y => y.replace('al', ''))
    .filter(Number)
    .sort((a, b) => +a - +b);

export const getMeta = (subjects: string[]) =>
  subjects.map(sub =>
    metaData.find(item => item.key === sub)
  ) as SubjectMetaType[];
