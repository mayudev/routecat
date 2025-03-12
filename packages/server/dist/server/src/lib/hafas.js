"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hafas_client_1 = require("hafas-client");
const oebb_1 = require("hafas-client/p/oebb");
const userAgent = process.env.APP_HAFAS_USER_AGENT || 'bwaa';
const client = (0, hafas_client_1.createClient)(oebb_1.profile, userAgent);
exports.default = client;
