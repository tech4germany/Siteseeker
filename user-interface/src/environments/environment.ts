// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { firebaseConfig, reverseGeocodeAPIKey } from './api-keys';

export const environment = {
  production: false,
  apiRLPKataster: '/rlp/kataster',
  apiBERKataster: '/berlin/kataster',
  apiRLPUmwelt: '/rlp/umwelt',
  apiRLPwfsVerwaltungsgrenzen: '/rlp/wfs/verwaltungsgrenzen',
  apiRLPwfsFlurstuecke: '/rlp/wfs/flurstuecke',
  apiRLPTopo: '/rlp/topo',
  courtDataApi: '../assets/geodata/amtsgerichte-in-deutschland.json',
  reverseGeocodeAPI: '',
  reverseGeocodeAPIKey: reverseGeocodeAPIKey,
  firebaseConfig: firebaseConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
