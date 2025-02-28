import { DeparturesArrivalsOptions } from 'hafas-client';
import { StationQuery } from '../types/handlers';

export const parseStationWhen = (
  queryData: StationQuery
): Partial<DeparturesArrivalsOptions> =>
  queryData.when ? { when: new Date(queryData.when) } : {};
