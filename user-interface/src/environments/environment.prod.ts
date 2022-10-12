import { firebaseConfig, reverseGeocodeAPIKey } from './api-keys';

export const environment = {
  production: true,
  geoDataApi: '',
  courtDataApi: '../assets/geodata/amtsgerichte-in-deutschland.json',
  reverseGeocodeAPI: '',
  reverseGeocodeAPIKey: reverseGeocodeAPIKey,
  firebaseConfig: firebaseConfig,
};
