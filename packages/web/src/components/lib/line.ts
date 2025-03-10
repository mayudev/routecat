import { TransitLine } from 'types';

export const normalizedLineName = (line: TransitLine) => {
  const firstSegment = line.name?.split('(')[0];
  return firstSegment?.trim();
};
