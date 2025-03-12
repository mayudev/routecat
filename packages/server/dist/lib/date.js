export const parseStationWhen = (queryData) => queryData.when ? { when: new Date(queryData.when) } : {};
