import { firebaseConfig, reverseGeocodeAPIKey } from './api-keys';

export const environment = {
  production: true,
  apiRLPKataster: 'https://geo5.service24.rlp.de/wms/liegenschaften_rp.fcgi',
  apiBERKataster:
    'https://fbinter.stadt-berlin.de/fb/wms/senstadt/wmsk_alkis?request=getcapabilities&service=wms&version=1.3.0',
  apiRLPUmwelt:
    'https://geodaten.naturschutz.rlp.de/kartendienste_naturschutz/mod_ogc/wms_getmap.php?mapfile=naturschutzgebiet&service=WMS&version=1.1.1&Request=GetCapabilities',
  courtDataApi: '../assets/geodata/amtsgerichte-in-deutschland.json',
  reverseGeocodeAPI: '',
  reverseGeocodeAPIKey: reverseGeocodeAPIKey,
  firebaseConfig: firebaseConfig,
};
