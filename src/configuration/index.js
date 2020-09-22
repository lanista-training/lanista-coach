const ENV = 'prod';
const version = '0.17';
export const env = (ENV == 'prod') ? {
  env: ENV,
  server: 'https://' + (typeof window !== 'undefined' ? window.document.location.host : '') + '/',
  version: version,
} : ENV == 'dev' ? {
  env: ENV,
  server: 'http://localhost:4000/',
  version: version,
} : {
  env: ENV,
  server: 'https://mobile.lanista-training.com/',
  version: version,
};
