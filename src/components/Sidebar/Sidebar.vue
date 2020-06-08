<template>
  <div>
    <div class="cd-main-content is-fixed">
        <div class="sidebar-container cd-filter" :class="showSidebar ? 'filter-is-visible' : ''">

          <div class="sidebar-content">
            <div class="cd-filter-block">
              <h4>Filter by Town</h4>
              <Select
                :source="townsArray"
                :initialSelected="initialTownSelectedObject"
                @newSelectedValue="handleTownChange"
              />
            </div>

            <div class="cd-filter-block">
              <h4>Filter by Name</h4>
              <div class="search-wrapper">
                <input type="text" v-model="searchString" placeholder="Insert Name.."/>
                <label>Insert Name:</label>
              </div>
            </div>

            <div class="cd-filter-block">
              <h4>Filter by Age</h4>
              <vue-slider
                ref="age-slider"
                v-model="selectedAgeRange"
                :enable-cross="false"
                :min="baseAgeRange[0]"
                :max="baseAgeRange[1]"
                :tooltip="'active'"
                @drag-end="handleAgeDragEnd"
                drag-on-click
              />
              Between {{ selectedAgeRange[0] }} and {{ selectedAgeRange[1] }} years old
            </div>
            <div class="cd-filter-block">
              <h4>Filter by Weight</h4>
              <vue-slider
                ref="weight-slider"
                v-model="selectedWeightRange"
                :enable-cross="false"
                :min="baseWeightRange[0]"
                :max="baseWeightRange[1]"
                :tooltip="'active'"
                @drag-end="handleWeightDragEnd"
                drag-on-click
              />
              Between {{ selectedWeightRange[0] }} and {{ selectedWeightRange[1] }} {{ weightUnit }}
            </div>
            <div class="cd-filter-block">
              <h4>Filter by Height</h4>
              <vue-slider
                ref="height-slider"
                v-model="selectedHeightRange"
                :enable-cross="false"
                :min="baseHeightRange[0]"
                :max="baseHeightRange[1]"
                :tooltip="'active'"
                @drag-end="handleHeightDragEnd"
                drag-on-click
              />
              Between {{ selectedHeightRange[0] }} and {{ selectedHeightRange[1] }} {{ heightUnit }}
            </div>
            <div class="cd-filter-block">
              <h4>Filter by Professions</h4>
              <CheckboxList
                :source="professions"
                :allowNoneOption="true"
                :allowSelectAll="true"
                @selectedCheckbox="handleCheckboxChange"
              />
            </div>
          </div>
          <div class="cd-close" @click="onHideSidebarClick"><i class=""></i> X </div>
        </div>
        <div class="trigger-container">
          <div class="cd-filter-trigger floating-button" @click="onShowSidebarClick">Filters</div>
        </div>
    </div>
  </div>
</template>

<script>

import VueSlider from 'vue-slider-component';
import CheckboxList from '@/components/Sidebar/CheckboxList.vue';
import Select from '@/components/Sidebar/Select.vue';
import { WEIGHT_UNIT, HEIGHT_UNIT } from '@/utilities/constants';
import 'vue-slider-component/theme/default.css';

/**
  * @module Sidebar/Sidebar
  * @desc Sidebar component
 *
  * @vue-prop {Array<Number>} baseAgeRangeArray - Array with limits for age filter
  * @vue-prop {Array<Number>} [baseWeightRangeArray=[0,400]] - Array with limits for weight filter
  * @vue-prop {Array<Number>} [baseHeightRangeArray=[0,400]] - Array with limits for height filter
  * @vue-prop {Array<Number>} towns - Array with towns for the filter
  * @vue-prop {Array<Number>} professionsArray - Array with professions for the filter
  * @vue-prop {Object} initialTown - Initial town object to be used by filter

  * @vue-data {Array<Number>} baseAgeRange - Array with limits for age filter (mapped from props)
  * @vue-data {Array<Number>} selectedAgeRange - Selected age range for filtering (mapped from props)
  * @vue-data {Array<Number>} baseWeightRange - Array with limits for weight filter (mapped from props)
  * @vue-data {Array<Number>} selectedWeightRange - Selected weight range for filtering (mapped from props)
  * @vue-data {Array<Number>} baseHeightRange -  Array with limits for height filter (mapped from props)
  * @vue-data {Array<Number>} selectedHeightRange - Selected heigh range for filtering (mapped from props)
  * @vue-data {String} [searchString=''] - String entered to filter by name
  * @vue-data {Array<String>} [professionsChecked=[]] - Array of professions selected for filtering
  * @vue-data {Boolean} [shouldSelectAll=false] - Determines if all professions should be checked
  * @vue-data {Boolean} [selectNone=false] - Determines if user ask for no professions
  * @vue-data {Number} professions - Array with professions for the filter (mapped from props)
  * @vue-data {Array<Number>} townsArray - Array with towns for the filter (mapped from props)
  * @vue-data {Number} initialTownSelectedObject - Initial town object to be used by filter (mapped from props)
  * @vue-data {String} [weightUnit=WEIGHT_UNIT] - Weight unit to be used across the app
  * @vue-data {String} [heightUnit=HEIGHT_UNIT] - Height unit to be used across the app
  * @vue-data {Boolean} [showSidebar=true] - Determine if sidebar is shown or not

  * @vue-event {Object} townChange - Emits change of town selected
  * @vue-event {Array<Number>} ageRangeChange - Emits change of age range selected
  * @vue-event {Array<Number>} weightRangeChange - Emits change of weight range selected
  * @vue-event {Array<Number>} heightRangeChange - Emits change of height range selected
  * @vue-event {Array<String>} professionsFilterChange - Emits change of professions selected
  * @vue-event {Boolean} showSideBar - Emits change of state of sidebar (shown or hidden)
  * @vue-event {String} searchBoxChange - Emits change of name entered
*/

export default {
  name: 'Sidebar',
  components: {
    VueSlider,
    CheckboxList,
    Select,
  },
  props: {
    baseAgeRangeArray: {
      type: Array,
      required: true,
    },
    baseWeightRangeArray: {
      type: Array,
      required: true,
      default() {
        return [0, 400];
      },
    },
    baseHeightRangeArray: {
      type: Array,
      required: true,
      default() {
        return [0, 400];
      },
    },
    towns: {
      type: Array,
      required: true,
    },
    professionsArray: {
      type: Array,
      required: true,
    },
    initialTown: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      baseAgeRange: this.baseAgeRangeArray,
      selectedAgeRange: this.baseAgeRangeArray,
      baseWeightRange: this.baseWeightRangeArray,
      selectedWeightRange: this.baseWeightRangeArray,
      baseHeightRange: this.baseHeightRangeArray,
      selectedHeightRange: this.baseHeightRangeArray,
      searchString: '',
      professionsChecked: [],
      shouldSelectAll: false,
      selectNone: '',
      professions: this.professionsArray,
      townsArray: this.towns,
      initialTownSelectedObject: this.initialTown,
      weightUnit: WEIGHT_UNIT,
      heightUnit: HEIGHT_UNIT,
      showSidebar: true,
    };
  },
  methods: {
    /**
     * Emits a 'townChange' event when Select component for town changes
     * @param {Object} value - New town selected
    */
    handleTownChange(value) {
      this.$emit('townChange', value);
    },
    /**
     * Emits a 'ageRangeChange' event when age slider values are updated (when drag ends)
    */
    handleAgeDragEnd() {
      const values = this.$refs['age-slider'].getValue();
      this.$emit('ageRangeChange', values);
    },
    /**
     * Emits a 'weightRangeChange' event when weight slider values are updated (when drag ends)
    */
    handleWeightDragEnd() {
      const values = this.$refs['weight-slider'].getValue();
      this.$emit('weightRangeChange', values);
    },
    /**
     * Emits a 'heightRangeChange' event when height slider values are updated (when drag ends)
    */
    handleHeightDragEnd() {
      const values = this.$refs['height-slider'].getValue();
      this.$emit('heightRangeChange', values);
    },
    /**
     * Emits a 'professionsFilterChange' event when professions checkboxes' state are updated, depending on the change
     * @param {Object} professionObj - Profession object that is checked/unchecked
    */
    handleCheckboxChange(professionObj) {
      if (professionObj.value.toLowerCase() === 'all') {
        if (professionObj.isChecked) {
          this.professionsChecked = this.professions.slice();
        } else {
          this.professionsChecked.splice(0, this.professionsChecked.length);
        }
      } else if (professionObj.value.toLowerCase() === 'none') {
        if (professionObj.isChecked) {
          this.professionsChecked.splice(0, this.professionsChecked.length);
          this.professionsChecked.push(professionObj.value);
        } else {
          this.professionsChecked.splice(0, this.professionsChecked.length);
        }
      } else if (professionObj.isChecked) {
        this.professionsChecked.push(professionObj.value);
      } else {
        const idx = this.professionsChecked.indexOf(professionObj.value);
        if (idx > -1) {
          this.professionsChecked.splice(idx, 1);
        }
      }
      this.$emit('professionsFilterChange', this.professionsChecked);
    },
    /**
     * Emits a 'showSideBar' event when Open Filter button is clicked
    */
    onShowSidebarClick() {
      this.showSidebar = true;
      this.$emit('showSideBar', true);
    },
    /**
     * Emits a 'showSideBar' event when Close Filter button is clicked
    */
    onHideSidebarClick() {
      this.showSidebar = false;
      this.$emit('showSideBar', false);
    },
  },
  watch: {
    searchString(value) {
      if (value.length < 1 || value.length >= 3) {
        this.$emit('searchBoxChange', value);
      }
    },
  },
};
</script>

<style lang="scss">

.sidebar-container {
}

.sidebar-visible {
  width: 320px;
}

.sidebar-hidden {
  width: 20px;
}

.search-wrapper {
    position: relative;

    label {
      position: absolute;
      font-size: 12px;
      color: rgba(0,0,0,.50);
      top: 8px;
      left: 12px;
      z-index: -1;
      transition: .15s all ease-in-out;
    }

    input {
      padding: 4px 12px;
      color: rgba(0,0,0,.70);
      border: 1px solid rgba(0,0,0,.12);
      transition: .15s all ease-in-out;
      background: white;

      &:focus {
        outline: none;
        transform: scale(1.05);
        & + label  {
          font-size: 10px;
          transform: translateY(-24px) translateX(-12px);
        }
      }
      &::-webkit-input-placeholder {
          font-size: 12px;
          color: rgba(0,0,0,.50);
          font-weight: 100;
      }
    }
  }

.trigger-container {
  background-color: transparent;
  z-index: 10;
  width: 100%;
  height: 50px;
}

.sidebar-content {
  padding: 50px 40px;
  position: fixed;
  height: 100%;
  overflow: auto;
  -ms-overflow-style: none;  // Internet Explorer 10+
  scrollbar-width: none;  // Firefox
}
.sidebar-content::-webkit-scrollbar {
    display: none;  // Safari and Chrome
}

.floating-button {
  border-radius: 8px;
  border: 1.5px solid #ccc;
  background-color: #444444;
  opacity: 0.75;
}

/* --------------------------------
xfilter
-------------------------------- */
.cd-filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 280px;
  height: 100%;
  background: #ffffff;
  box-shadow: 4px 4px 20px transparent;
  z-index: 2;
  /* Force Hardware Acceleration in WebKit */
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transform: translateX(-100%);
  -moz-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  -o-transform: translateX(-100%);
  transform: translateX(-100%);
  -webkit-transition: -webkit-transform 0.3s, box-shadow 0.3s;
  -moz-transition: -moz-transform 0.3s, box-shadow 0.3s;
  transition: transform 0.3s, box-shadow 0.3s;
}
.cd-filter::before {
  /* top colored bar */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: #444444;
  z-index: 2;
}

.cd-filter .cd-close {
  position: absolute;
  top: 0;
  right: 0;
  height: 50px;
  line-height: 50px;
  width: 60px;
  color: #ffffff;
  text-align: center;
  background: #444444;
  opacity: 0;
  -webkit-transition: opacity 0.3s;
  -moz-transition: opacity 0.3s;
  transition: opacity 0.3s;
  z-index: 3;
}

.cd-close:hover {
  cursor: pointer;
  background: #666666;
}

.no-touch .cd-filter .cd-close:hover {
  background: #666666;
}
.cd-filter.filter-is-visible {
  -webkit-transform: translateX(0);
  -moz-transform: translateX(0);
  -ms-transform: translateX(0);
  -o-transform: translateX(0);
  transform: translateX(0);
  background-color: #f1f1f1;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.2);
}
.cd-filter.filter-is-visible .cd-close {
  opacity: 1;
}
@media only screen and (min-width: 1170px) {
  .cd-filter {
    width: 20%;
  }
  // .cd-filter form {
  //   padding: 70px 10%;
  // }
}

.cd-filter-trigger {
  position: absolute;
  // top: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  // width: 60px;
  /* image replacement */
  overflow: hidden;
  text-indent: 100%;
  color: transparent;
  white-space: nowrap;
  background: transparent url("../../assets/cd-icon-filter.svg") no-repeat center center;
  z-index: 3;

  width: auto;
  left: 2%;
  text-indent: 0;
  color: #9a9a9a;
  text-transform: uppercase;
  padding-left: 24px;
  background-position: left center;
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  transition: color 0.3s;
}

.cd-filter-trigger:hover {
  cursor: pointer;
}

.filter-is-visible + .cd-filter-trigger {
  pointer-events: none;
}

.filter-is-visible + .trigger-container > .cd-filter-trigger {
  pointer-events: none;
  opacity: 1;
  border: none;
}


@media only screen and (min-width: 1170px) {
  .cd-filter-trigger {

  }
  .no-touch .cd-filter-trigger:hover {
    color: #f03d6c;
  }
  .cd-filter-trigger.filter-is-visible, .cd-filter-trigger.filter-is-visible:hover {
    color: #ffffff;
  }
}

/* --------------------------------

xcustom form elements

-------------------------------- */
.cd-filter-block {
  margin-bottom: 1.6em;
}
.cd-filter-block h4 {
  /* filter block title */
  position: relative;
  margin-bottom: .2em;
  padding: 10px 0 10px 20px;
  color: #9a9a9a;
  text-transform: uppercase;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}
.no-touch .cd-filter-block h4:hover {
  color: #f03d6c;
}
.cd-filter-block h4::before {
  /* arrow */
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 16px;
  height: 16px;
  background: url("../../assets/cd-icon-arrow.svg") no-repeat center center;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  -webkit-transition: -webkit-transform 0.3s;
  -moz-transition: -moz-transform 0.3s;
  transition: transform 0.3s;
}
.cd-filter-block h4.closed::before {
  -webkit-transform: translateY(-50%) rotate(-90deg);
  -moz-transform: translateY(-50%) rotate(-90deg);
  -ms-transform: translateY(-50%) rotate(-90deg);
  -o-transform: translateY(-50%) rotate(-90deg);
  transform: translateY(-50%) rotate(-90deg);
}
.cd-filter-block input, .cd-filter-block select,
.cd-filter-block .checkbox-label::before {
  /* shared style for input elements */  border-radius: 0;
  background-color: #ffffff;
  border: 2px solid #e6e6e6;
}
.cd-filter-block input[type='search'],
.cd-filter-block input[type='text'],
.cd-filter-block select {
  width: 100%;
  padding: .8em;
  -webkit-appearance: none;
  -moz-appearance: none;
  -ms-appearance: none;
  -o-appearance: none;
  appearance: none;
  box-shadow: none;
}
.cd-filter-block input[type='search']:focus,
.cd-filter-block input[type='text']:focus,
.cd-filter-block select:focus {
  outline: none;
  background-color: #ffffff;
  border-color: #008000;
}
.cd-filter-block input[type='search'] {
  /* custom style for the search element */
  border-color: transparent;
  background-color: #e6e6e6;
  /* prevent jump - ios devices */
  font-size: 1rem !important;
}
.cd-filter-block input[type='search']::-webkit-search-cancel-button {
  display: none;
}
.cd-filter-block .cd-select {
  /* select element wrapper */
  position: relative;
}
.cd-filter-block .cd-select::after {
  /* switcher arrow for select element */
  content: '';
  position: absolute;
  z-index: 1;
  right: 14px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
  display: block;
  width: 16px;
  height: 16px;
  background: url("../../assets/cd-icon-arrow.svg") no-repeat center center;
  pointer-events: none;
}
.cd-filter-block select {
  cursor: pointer;
}
.cd-filter-block select::-ms-expand {
  display: none;
}
.cd-filter-block .list li {
  height: 20px;
  position: relative;
  margin-bottom: .8em;
}
.cd-filter-block .list li:last-of-type {
  margin-bottom: 0;
}
.cd-filter-block input[type=radio],
.cd-filter-block input[type=checkbox] {
  /* hide original check and radio buttons */
  position: absolute;
  left: 0;
  top: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 2;
}
.cd-filter-block .checkbox-label,
.cd-filter-block .radio-label {
  padding-left: 24px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cd-filter-block .checkbox-label::before, .cd-filter-block .checkbox-label::after,
.cd-filter-block .radio-label::before,
.cd-filter-block .radio-label::after {
  /* custom radio and check boxes */
  content: '';
  display: block;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}
.cd-filter-block .checkbox-label::before,
.cd-filter-block .radio-label::before {
  width: 16px;
  height: 16px;
  left: 0;
}
.cd-filter-block .checkbox-label::after,
.cd-filter-block .radio-label::after {
  /* check mark - hidden */
  display: none;
}
.cd-filter-block .checkbox-label::after {
  /* check mark style for check boxes */
  width: 16px;
  height: 16px;
  left: 0;
  background: url("../../assets/cd-icon-check.svg") no-repeat center center;
}
.cd-filter-block .radio-label::before,
.cd-filter-block .radio-label::after {
  border-radius: 50%;
}
.cd-filter-block .radio-label::after {
  /* check mark style for radio buttons */
  width: 6px;
  height: 6px;
  background-color: #ffffff;
  left: 5px;
}
.cd-filter-block input[type=radio]:checked + label::before,
.cd-filter-block input[type=checkbox]:checked + label::before {
  border-color: #6495ED;
  background-color: #6495ED;
}
.cd-filter-block input[type=radio]:checked + label::after,
.cd-filter-block input[type=checkbox]:checked + label::after {
  display: block;
}

@-moz-document url-prefix() {
  /* hide custom arrow on Firefox - select element */
  .cd-filter-block .cd-select::after {
    display: none;
  }
}


.cd-main-content.is-fixed {
  // position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  position: fixed;
  height: 100%;
  // overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.cd-main-content.is-fixed .cd-filter-trigger {
  position: fixed;
}
@media only screen and (min-width: 768px) {
  .cd-main-content.is-fixed .cd-gallery {
    padding-top: 90px;
  }
}
@media only screen and (min-width: 1170px) {
  .cd-main-content.is-fixed .cd-gallery {
    padding-top: 100px;
  }
}


/* @media screen and (max-width: 700px) {
  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }
  .sidebar a {float: left;}
  div.content {margin-left: 0;}
}

@media screen and (max-width: 400px) {
  .sidebar a {
    text-align: center;
    float: none;
  }
} */

</style>
