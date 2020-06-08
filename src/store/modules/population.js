// import axios from 'axios';
// import { API } from '@/utilities/constants';
import mockedPopulation from './mockedPopulation.json';

// import { getAllProfessionsAvailable, getAgeRange, getWeightRange, getHeightRange } from '@/utilities/helperFunctions';

const getDefaultState = () => (
  {
    allTownsPopulation: [],
    populationIsLoading: false,
    populationError: '',
  }
);

const state = getDefaultState();

const getters = {
  populationByTown: (state) => (town) => state.allTownsPopulation[town.id],
  populationStatus: (state) => ({ error: state.populationError, isLoading: state.populationIsLoading }),

};

const actions = {
  fetchPopulation({ commit }, townObjectSelected) {
    commit('SET_POPULATION_PENDING');
    // let population = {};
    // if (townObjectSelected.name.toLowerCase() === 'brastlewark') {
    //   return axios.get(
    //     `${API.baseUrl}/${API.branch}/data.json`,
    //   ).then((response) => {
    //     population = response.data;
    //     commit('SET_POPULATION_SUCCESS', { population: population[townObjectSelected.name], townId: townObjectSelected.id });
    //   }).catch((error) => {
    //     commit('SET_POPULATION_ERROR', error);
    //   });
    // }
    // Delay for now. If we want to test what happens if adding more than one town
    const delayMS = Math.round((Math.random() * (1100 - 400) + 400));
    return new Promise((res) => {
      setTimeout(() => {
        // mockedPopulation is same as response from request to url but first 22 items. - NewTown is hardocded for now for mocking purposes
        commit('SET_POPULATION_SUCCESS', { population: mockedPopulation.NewTown, townId: townObjectSelected.id });
        res();
      }, delayMS);
    });
  },
  resetState: ({ commit }) => commit('RESET_STATE'),
};

const mutations = {
  SET_POPULATION_SUCCESS: (state, { population, townId }) => {
    state.allTownsPopulation[townId] = population;
    state.populationIsLoading = false;
    state.populationError = '';
  },
  SET_POPULATION_PENDING: (state) => {
    state.populationIsLoading = true;
    state.populationError = '';
  },
  SET_POPULATION_ERROR: (state, error) => {
    state.populationIsLoading = false;
    state.populationError = error;
  },
  RESET_STATE: (state) => Object.assign(state, getDefaultState()),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
