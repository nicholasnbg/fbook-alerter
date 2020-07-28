import subMinutes from 'date-fns/subMinutes';
import roundToNearestMinutes from 'date-fns/roundToNearestMinutes';

type postUnix = string;
type matched = boolean;

export const getPostTime = (now: number, minSince: number): number =>
  subMinutes(now, minSince).valueOf();

export const matchStore: Record<postUnix, matched> = {
  testKey: true,
};

export const getFromMatchStore = (key: number): boolean => {
  const result = matchStore[key];
  return result ? result : false;
};

export const genKey = (minString: string, now: number): number => {
  const mins = parseInt(minString.split('m')[0]);
  const postTime = getPostTime(now, mins);
  return roundToNearestMinutes(postTime, { nearestTo: 2 }).valueOf();
};

export const storeMatch = (key: number): void => {
  matchStore[key] = true;
};
