import { GENDER_OPTIONS } from '@/utilities/constants';

/**
 *  @module utilities/helperFunctions
*/

/**
  * Parses source array of population and retrieves all different professions
  * @param {Array<Object>} sourceArray Array of objects for population
*/
export const getAllProfessionsAvailable = (sourceArray) => {
  const professions = new Set();
  if (sourceArray) {
    for (let i = 0; i < sourceArray.length; i += 1) {
      if (sourceArray[i].professions.length > 0) {
        professions.add(...sourceArray[i].professions);
      }
    }
  }
  const professionsArray = [...professions];
  return professionsArray;
};

/**
  * Parses source array of population and retrieves min and max ages
  * @param {Array<Object>} sourceArray Array of objects for population
*/
export const getAgeRange = (sourceArray) => {
  let min = 0;
  let max = 0;
  if (sourceArray) {
    for (let i = 0; i < sourceArray.length; i += 1) {
      if (sourceArray[i].age < min) {
        min = sourceArray[i].age;
      }
      if (sourceArray[i].age > max) {
        max = sourceArray[i].age;
      }
    }
  }
  return [min, max];
};

/**
  * Parses source array of population and retrieves min and max weight
  * @param {Array<Object>} sourceArray Array of objects for population
*/
export const getWeightRange = (sourceArray) => {
  let min = 0;
  let max = 0;
  if (sourceArray) {
    for (let i = 0; i < sourceArray.length; i += 1) {
      if (sourceArray[i].weight < min) {
        min = sourceArray[i].weight;
      }
      if (sourceArray[i].weight > max) {
        max = sourceArray[i].weight;
      }
    }
  }
  return [min, max];
};

/**
  * Parses source array of population and retrieves min and max height
  * @param {Array<Object>} sourceArray Array of objects for population
*/
export const getHeightRange = (sourceArray) => {
  let min = 0;
  let max = 0;
  if (sourceArray) {
    for (let i = 0; i < sourceArray.length; i += 1) {
      if (sourceArray[i].height < min) {
        min = sourceArray[i].height;
      }
      if (sourceArray[i].height > max) {
        max = sourceArray[i].height;
      }
    }
  }
  return [min, max];
};

/**
  * Gets (guess) gender of inhabitant based on its name
  * @param {String} name Name of inhabitant
*/
export const getGender = (name) => {
  const nameLength = name.length;
  return GENDER_OPTIONS[nameLength % GENDER_OPTIONS.length];
};

/**
  * Returns given string with its first letter capitalized
  * @param {String} string String to capitalize first letter
*/
export const capitalizeFirstLetter = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();
