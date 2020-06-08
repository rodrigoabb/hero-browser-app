<template>
    <div>
      <main class="population-page">
        <Sidebar
          :class="populationStatus.error || populationStatus.isLoading || fakeIsLoading ? 'disabler' : ''"
          :baseAgeRangeArray="baseAgeRange"
          :baseWeightRangeArray="baseWeightRange"
          :baseHeightRangeArray="baseHeightRange"
          :towns="townsArray"
          :professionsArray="professions"
          :initialTown="initialTownSelected"
          @ageRangeChange="handleAgeRangeChange"
          @weightRangeChange="handleWeightRangeChange"
          @heightRangeChange="handleHeightRangeChange"
          @townChange="handleSelectedTownChange"
          @professionsFilterChange="handleProfessionsFilterChange"
          @searchBoxChange="handleSearchBoxChange"
          @showSideBar="handleSidebarShowing"
        />
        <div class="container" :class="isSidebarVisible ? 'content-with-sidebar' : 'content-without-sidebar'">
          <div v-if="populationStatus.isLoading || fakeIsLoading" class="population-page container">
            <LoadingSpinner :spinnerType=1 class="spinner"/>
          </div>
           <div v-else-if="populationStatus.error" class="error">
            <span>{{ populationStatus.error }}</span>
          </div>
          <div v-else class="">
            <div class="found-text">
              <h4 v-if="dataSource.length > 0"> We have found {{ dataSource.length }} matches!</h4>
              <h4 v-else> We haven't found any matches &#128547;</h4>
            </div>
            <ul class="population-list">
              <li :class="isSidebarVisible ? 'population-list__item-with-sidebar' : 'population-list__item-no-sidebar'" v-for="inhabitant in dataSource" :key="inhabitant.id">
                <Inhabitant
                :inhabitant="inhabitant"
              />
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import Inhabitant from '@/components/Population/Inhabitant.vue';
import LoadingSpinner from '@/components/Utils/LoadingSpinner.vue';
import {
  PROFESSIONS_ARRAY,
  TOWNS_ARRAY,
  AGE_RANGE,
  WEIGHT_RANGE,
  HEIGHT_RANGE,
  FAKE_WAIT_TIME_MS,
} from '@/utilities/constants';
import {
  getAllProfessionsAvailable,
  getAgeRange,
  getWeightRange,
  getHeightRange,
} from '@/utilities/helperFunctions';

/**
  * @module views/PopulationListPage
  * @desc Population List Page

  * @vue-data {Boolean} [isSidebarVisible=true] - Determine if sidebar is visible or not
  * @vue-data {Array<Number>} [baseAgeRange=AGE_RANGE] - Base array with limits for age filter
  * @vue-data {Array<Number>} [selectedAgeRange=AGE_RANGE] - Selected age range for filtering
  * @vue-data {Array<Number>} [baseWeightRange=WEIGHT_RANGE] - Base array with limits for weight filter
  * @vue-data {Array<Number>} [selectedWeightRange=WEIGHT_RANGE] - Selected weight range for filtering
  * @vue-data {Array<Number>} [baseHeightRange=HEIGHT_RANGE] -  Base array with limits for height filter
  * @vue-data {Array<Number>} [selectedHeightRange=HEIGHT_RANGE] - Selected heigh range for filtering
  * @vue-data {Array<Object>} [professionsSelected=[]] - Array of professions selected for filtering
  * @vue-data {String} [searchString=''] - String entered to filter by name
  * @vue-data {Array<Object>} [professions=PROFESSIONS_ARRAY - Array of all professions to be displayed as options
  * @vue-data {Array<Object>} [townsArray=TOWNS_ARRAY] - Array of all towns to be displayed as options
  * @vue-data {Object} [initialTownSelected=TOWNS_ARRAY[0]] - Town to be initially selected
  * @vue-data {Object} [selectedTown=TOWNS_ARRAY[0]] - Town selected
  * @vue-data {Boolean} [fakeIsLoading=false] - Determines if a fake loading spinner will be rendered or not

  * @vue-computed {Array<Object>} dataSource - Source of objects after being applied all filters
*/


export default {
  name: 'BrowerView',
  components: {
    Inhabitant,
    Sidebar,
    LoadingSpinner,
  },

  created() {
    this.askForPopulation(this.selectedTown);
  },
  data() {
    return {
      isSidebarVisible: true,
      baseAgeRange: AGE_RANGE,
      selectedAgeRange: AGE_RANGE,
      baseWeightRange: WEIGHT_RANGE,
      selectedWeightRange: WEIGHT_RANGE,
      baseHeightRange: HEIGHT_RANGE,
      selectedHeightRange: HEIGHT_RANGE,
      professionsSelected: [],
      searchString: '',
      professions: PROFESSIONS_ARRAY,
      townsArray: TOWNS_ARRAY,
      initialTownSelected: TOWNS_ARRAY[0],
      selectedTown: TOWNS_ARRAY[0],
      fakeIsLoading: false,
    };
  },
  computed: {
    ...mapGetters([
      'populationByTown',
      'populationStatus',
    ]),
    dataSource() {
      let filteredArray = [];
      const {
        selectedTown,
        searchString,
        selectedAgeRange,
        professionsSelected,
        selectedWeightRange,
        selectedHeightRange,
      } = this;

      if (this.populationByTown(selectedTown)) {
        filteredArray = this.filterByAll(this.populationByTown(this.selectedTown), searchString, selectedAgeRange, professionsSelected, selectedWeightRange, selectedHeightRange);
      }
      return filteredArray;
    },
  },
  methods: {
    ...mapActions([
      'fetchPopulation',
    ]),
    /**
     * Requets for population by town
     * @param {Object} townObjectSelected - Town object asked to be displayed
    */
    async askForPopulation(townObjectSelected) {
      this.fakeIsLoading = true;
      setTimeout(() => {
        this.fakeIsLoading = false;
      }, FAKE_WAIT_TIME_MS);
      if (!this.populationByTown(townObjectSelected)) {
        await this.fetchPopulation(townObjectSelected);
      }
    },
    /**
     * Toggles the sidebar component
    */
    toggleSideBar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    /**
     * Updates selectedAgeRange data array with the selected age range
     * @param {Array} ageRange - New age range selected
    */
    handleAgeRangeChange(ageRange) {
      this.selectedAgeRange = ageRange;
    },
    /**
     * Updates selectedWeightRange data array with the selected weight range
     * @param {Array} weightRange - New weight range selected
    */
    handleWeightRangeChange(weightRange) {
      this.selectedWeightRange = weightRange;
    },
    /**
     * Updates selectedHeightRange data array with the selected height range
     * @param {Array} heightRange - New height range selected
    */
    handleHeightRangeChange(heightRange) {
      this.selectedHeightRange = heightRange;
    },
    /**
     * Updates professionsSelected data array with the selected professions
     * @param {Array} professionsSelected - Professions selected
    */
    handleProfessionsFilterChange(professionsSelected) {
      this.professionsSelected = professionsSelected;
    },
    /**
     * Updates searchString data string with the selected name as search string
     * @param {String} searchString - Name entered as the search string
    */
    handleSearchBoxChange(searchString) {
      this.searchString = searchString;
    },
    /**
     * Updates selectedTown data object with the selected town, and calls askForPopulation method
     * @param {Object} town - New town object selected
    */
    handleSelectedTownChange(town) {
      this.selectedTown = town;
      this.askForPopulation(town);
    },
    /**
     * Applies all possible filters to the town population array for current selected values
     * @param {Array<Object>} populationByTown - All population by town (no filtered)
     * @param {String} searchString - Name (as search string) entered
     * @param {Array<Number>} selectedAgeRange - New selected age range
     * @param {Array<String>} professionsSelected - Selected professions
     * @param {Array<Number>} selectedWeightRange - New selected weight range
     * @param {Array<Number>} selectedHeightRange - New selected height range
    */
    filterByAll(populationByTown, searchString, selectedAgeRange, professionsSelected, selectedWeightRange, selectedHeightRange) {
      this.fakeIsLoading = true;
      let filteredByName = [];
      let filteredByAge = [];
      let filteredByProfession = [];
      let filteredByWeight = [];
      let filteredByHeight = [];
      let filteredByAll = [];
      filteredByName = this.filterByName(populationByTown, searchString);
      filteredByAge = this.filterByAge(filteredByName, selectedAgeRange);
      filteredByProfession = this.filterByProfession(filteredByAge, professionsSelected);
      filteredByWeight = this.filterByWeight(filteredByProfession, selectedWeightRange);
      filteredByHeight = this.filterByHeight(filteredByWeight, selectedHeightRange);
      filteredByAll = filteredByHeight;
      setTimeout(() => {
        this.fakeIsLoading = false;
      }, FAKE_WAIT_TIME_MS);
      return filteredByAll;
    },
    /**
     * Applies age filtering to provided population array
     * @param {Array<Object>} source - Population source array
     * @param {Array<Number>} selectedAgeRange - New selected age range
    */
    filterByAge(source, selectedAgeRange) {
      const filteredArray = source.filter((inhabitant) => inhabitant.age >= selectedAgeRange[0] && inhabitant.age <= selectedAgeRange[1]);
      return filteredArray;
    },
    /**
     * Applies age filtering to provided population array
     * @param {Array<Object>} source - Population source array
     * @param {Array<Number>} selectedWeightRange - New selected weight range
    */
    filterByWeight(source, selectedWeightRange) {
      const filteredArray = source.filter((inhabitant) => inhabitant.weight >= selectedWeightRange[0] && inhabitant.weight <= selectedWeightRange[1]);
      return filteredArray;
    },
    /**
     * Applies age filtering to provided population array
     * @param {Array<Object>} source - Population source array
     * @param {Array<Number>} selectedHeightRange - New selected height range
    */
    filterByHeight(source, selectedHeightRange) {
      const filteredArray = source.filter((inhabitant) => inhabitant.height >= selectedHeightRange[0] && inhabitant.height <= selectedHeightRange[1]);
      return filteredArray;
    },
    /**
     * Applies age filtering to provided population array
     * @param {Array<Object>} source - Population source array
     * @param {Array<String>} professionsSelected - Selected professions array
    */
    filterByProfession(source, professionsSelected) {
      let filteredArray = source;

      if (professionsSelected) {
        if (professionsSelected.length !== 0) {
          if (professionsSelected.length === 1 && professionsSelected[0].toLowerCase() === 'none') {
            filteredArray = source.filter((inhabitant) => inhabitant.professions.length === 0);
          } else {
            filteredArray = source.filter((inhabitant) => {
              let professionsCount = 0;
              let hasThemAll = false;
              const inhabitantProfessions = JSON.parse(JSON.stringify(inhabitant.professions));
              // This filter is this complex since there's a typo in one profession (' Tinker' with extra space) and I had to whether use the same as source or make a better comparisson (includes)
              for (let i = 0; i < professionsSelected.length; i += 1) {
                if (professionsSelected.length > inhabitantProfessions.length) {
                  break;
                }
                for (let j = 0; j < inhabitantProfessions.length; j += 1) {
                  if (inhabitantProfessions[j].includes(professionsSelected[i])) {
                    professionsCount += 1;
                    inhabitantProfessions.splice(j, 1);
                    break;
                  }
                }
                if (professionsCount === professionsSelected.length) {
                  hasThemAll = true;
                  break;
                }
              }
              return hasThemAll;
            });
          }
        }
      }
      return filteredArray;
    },
    /**
     * Applies age filtering to provided population array
     * @param {Array<Object>} source - Population source array
     * @param {String} searchString - Name (as search string) entered
    */
    filterByName(source, searchString) {
      const filteredArray = source.filter((inhabitant) => (inhabitant.name.toLowerCase().includes(searchString.toLowerCase())));
      return filteredArray;
    },
    /**
     * Updates isSidebarVisible data boolean with new sidebar state
     * @param {Boolean} value - New sidebar state
    */
    handleSidebarShowing(value) {
      this.isSidebarVisible = value;
    },
    /**
     * Parses population array of objects and returns all different professions (could be used instead of PROFESSIONS_ARRAY constant when array is first fetched instead of hardcoding them, in case they change by town)
     * @param {Array<Object>} source - Population source array
    */
    // Professions, Age, Weight and Height are set on constant.js file, but can easily be taken (parsed) with helper functions defined
    getProfessions(sourceData) {
      const professionsArray = getAllProfessionsAvailable(sourceData);
      return professionsArray;
    },
    /**
     * Parses population array of objects and returns age range [min, max] (could be used instead of AGE_RANGE constant when array is first fetched instead of hardcoding them, in case they change by town, or it's desired)
     * @param {Array<Object>} source - Population source array
    */
    getAgeRange(sourceData) {
      const ageRange = getAgeRange(sourceData);
      return ageRange;
    },
    /**
     * Parses population array of objects and returns weight range [min, max] (could be used instead of WEIGHT_RANGE constant when array is first fetched instead of hardcoding them, in case they change by town)
     * @param {Array<Object>} source - Population source array
    */
    getWeightRange(sourceData) {
      const weightRange = getWeightRange(sourceData);
      return weightRange;
    },
    /**
     * Parses population array of objects and returns height range [min, max] (could be used instead of HEIGHT_RANGE constant when array is first fetched instead of hardcoding them, in case they change by town)
     * @param {Array<Object>} source - Population source array
    */
    getHeightRange(sourceData) {
      const heightRange = getHeightRange(sourceData);
      return heightRange;
    },
  },
};

</script>

<style lang="scss" scoped>

@import "@/utilities/variables";

/* ==========================================================================
   Population & Layout
   ========================================================================== */

.population-list {
  display: flex;
  flex: 0 1 auto;
  flex-flow: row wrap;
  margin: 0 -10px;
}

.population-list__item-no-sidebar {
  padding: 10px;
  flex: 1 0 33.33%;
  max-width: 33.33%;
}

// .population-list__item-with-sidebar{
//   padding: 10px;
//   flex: 1 0 100%;
//   max-width: 100%;
// }

.container {
  width: 100%;
  height: 100%;
  z-index: 20;
}

.content-without-sidebar {
  margin-top: 55px;
  // padding: 10px 16px;
  // height: 1000px;
  /* margin-left: 320px; */
  margin-left: 10px;
  z-index: -1;
  -webkit-transform: translateX(0);
  -moz-transform: translateX(0);
  -ms-transform: translateX(0);
  -o-transform: translateX(0);
  transform: translateX(0);
  // box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
}

.content-with-sidebar {
  margin-top: 30px;
  margin-left: 285px;
}

.found-text h4 {
  display:inline;
  position: relative;
  color: #9a9a9a;
  text-transform: uppercase;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.disabler {
  opacity: 0.5;
  pointer-events: none;
}

/* ==========================================================================
   Spinner
   ========================================================================== */
.spinner {
  position: absolute;
  top: 50%;
  left: 61%;
}

/* ==========================================================================
   Media Queries
   ========================================================================== */

  @media (max-width: $phone-upper-boundary - 1) {

    .population-list__item-no-sidebar,
    .population-list__item-with-sidebar {
      /* flex: none; */
      flex: 1 0 100%;
      max-width: 100%;
    }
  }

  @media (min-width: $phone-upper-boundary) {
    .population-list__item-no-sidebar {
      flex: 1 0 50%;
      max-width: 50%;
    }

    .population-list__item-with-sidebar {
      padding: 10px;
      flex: 1 0 100%;
      max-width: 100%;
    }
  }

  @media (min-width: $tablet-portrait-upper-boundary) {
    .population-list__item-no-sidebar {
      padding: 10px;
      flex: 1 0 33.3333%;
      max-width: 33.3333%;
    }

    .population-list__item-with-sidebar {
      padding: 10px;
      flex: 1 0 50%;
      max-width: 50%;
    }
  }

  @media (min-width: $tablet-landscape-upper-boundary) {
    .population-list__item-no-sidebar {
      padding: 10px;
      flex: 1 0 25%;
      max-width: 25%;
    }
    .population-list__item-with-sidebar {
      padding: 10px;
      flex: 1 0 33.33%;
      max-width: 33.33%;
    }
  }


</style>
