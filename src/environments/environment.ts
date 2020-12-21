// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false
// };


export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:4200/dieta-api'


};

// import { KeycloakConfig } from 'keycloak-angular';

// const keycloakConfig: KeycloakConfig = {
//   url: 'https://100.106.102.22/keycloak/auth',
//   realm: 'mm-dev-lb',
//   clientId: 'mm-dev-lb-public'
// };

// export const environment = {
//   envName: 'dev',
//   production: false,
//   keycloak: keycloakConfig,
//   mmURI: 'http://localhost:4201',
//   accountURI: 'http://localhost:4200',
//   recaptchaSiteKey: '6LcvUIUUAAAAAKMpa64gRcgYfE5lNG1unBVfR5M7',
//   mapKey: '',
//   account: {
//     baseApiURI: 'http://localhost:4203/api'
//   },
//   eServices: {
//     baseApiURI: 'http://localhost:4203/eservices-api'
//   },
//   questionnaire: {
//     baseApiURI: 'http://localhost:4203/questionnaire-api'
//   },
//   teryt: {
//     baseApiURI: 'http://localhost:4203/teryt'
//   },
//   iobox: {
//     baseApiURI: 'http://localhost:4203/iobox-api'
//   },
//   notification: {
//     baseApiURI: 'http://localhost:4203/notification-api'
//   },
//   calendar: {
//     baseApiURI: 'http://localhost:4203/calendar-api'
//   },
//   processes: {
//     baseApiURI: 'http://localhost:4203/processes-api'
//   },
//   accessManagement: {
//     baseApiURI: 'http://localhost:4203/am-api'
//   },
//   wibo: {
//     baseApiURI: 'http://localhost:4203/wibo-api',
//   },
//   socialSupport: {
//     baseApiURI: 'http://localhost:4203/social-support-api'
//   },
//   dms: {
//     baseApiURI: 'http://localhost:4203/dms-api'
//   }
// };


// "/social-support-api/*": {
//   "target": "http://localhost:9319",
//   "secure": false,
//   "logLevel": "debug",
//   "changeOrigin": true,
//   "pathRewrite": {
//     "^/social-support-api": ""
//   }
// }
