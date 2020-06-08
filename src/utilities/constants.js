/**
 * @module utilities/constants
 *
 */

/**
  * Defines API address to make requests: Base url, branch
*/
export const API = {
  baseUrl: 'https://',
  branch: 'master',
};

/**
  * Hardcoded array of bjects for towns
*/
export const TOWNS_ARRAY = [
  {
    id: 'brastlewark',
    name: 'Brastlewark',
  },
  // // Uncomment below to add another town (or add more if you want...)
  // {
  //   id: 'new-town',
  //   name: 'New Town',
  // },
];

/**
  * Hardcoded array of strings for professions
*/
export const PROFESSIONS_ARRAY = [
  'Metalworker',
  'Brewer',
  'Cook',
  'Carpenter',
  'Smelter',
  'Mason',
  'Baker',
  'Butcher',
  ' Tinker',
  'Tax inspector',
  'Blacksmith',
  'Stonecarver',
  'Prospector',
  'Farmer',
  'Potter',
  'Tailor',
  'Sculptor',
  'Miner',
  'Medic',
  'Gemcutter',
  'Woodcarver',
  'Mechanic',
  'Leatherworker',
  'Marble Carver',
];

/**
  * Hardcoded array of strings for genders
*/
export const GENDER_OPTIONS = [
  'Androginous',
  'Agender',
  'Bigender',
  'Female',
  'Male',
  'Female To Male',
  'Genderqueer',
  'Male to Female',
  'Other',
  'Pangender',
  'Third Gender',
  'Transgender',
  'Transsexual',
  'Two-Spirit',
];

/**
  * Hardcoded array for age range
*/
export const AGE_RANGE = [0, 400];
/**
  * Hardcoded weight for age range
*/
export const WEIGHT_RANGE = [0, 45];
/**
  * Hardcoded height for age range
*/
export const HEIGHT_RANGE = [0, 130];

/**
  * Defines weight unit
*/
export const WEIGHT_UNIT = 'kg';

/**
  * Defines height unit
*/
export const HEIGHT_UNIT = 'cm';

/**
  * Defines fake wait time for spinner
*/
export const FAKE_WAIT_TIME_MS = 400;
