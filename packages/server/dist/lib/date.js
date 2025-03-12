"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseStationWhen = void 0;
const parseStationWhen = (queryData) => queryData.when ? { when: new Date(queryData.when) } : {};
exports.parseStationWhen = parseStationWhen;
