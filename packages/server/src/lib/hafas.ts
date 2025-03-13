import { createClient } from 'hafas-client';
import { profile as oebbProfile } from 'hafas-client/p/oebb';

const userAgent = process.env.APP_HAFAS_USER_AGENT || 'routecat';
const client = createClient(oebbProfile, userAgent);

export default client;
