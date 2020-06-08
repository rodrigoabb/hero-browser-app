<template>
    <div class="checkbox-list-container">
      <ul class="cd-filter-content cd-filters list two-columns">
        <li v-for="option in dataOptions" :key="option.id">
          <input class="filter" type="checkbox" :id="option.id" :value="option.isChecked" v-model="option.isChecked" @change="onChangeCheckbox(option)">
          <label class="checkbox-label" :for="option.id">{{option.value}}</label>
        </li>
      </ul>
      <ul class="cd-filter-content cd-filters list two-columns extra-row">
        <li v-if="allowNoneOption">
          <input class="filter" type="checkbox" id="none" value="None" v-model="selectNone.isChecked" @change="onChangeSelectJustNoneCheckbox(selectNone)">
          <label class="checkbox-label" for="none">None</label>
        </li>
        <li v-if="allowSelectAll">
          <input class="filter" type="checkbox" id="select-all" value="Select All" v-model="selectThemAll.isChecked" @change="onChangeSelectAllCheckbox(selectThemAll)" >
          <label class="checkbox-label" for="select-all">Select All</label>
        </li>
      </ul>
    </div>
</template>

<script>

/**
  * @module Sidebar/CheckboxList
  * @desc Select Item component
  * @vue-prop {Array<Object>} source - Array of objects to be displayed as options
  * @vue-prop {Boolean} allowNoneOption - Determines whether showing checkbox for option 'None'
  * @vue-prop {Boolean} allowSelectAll - Determines whether showing checkbox for option 'Select all'
  *
  * @vue-data {Array<Object>} dataOptions - Array of objects to be displayed as options (mapped from props)
  * @vue-data {Object} allowNoneOption - Determines whether showing checkbox for option 'None' (mapped from props)
  * @vue-data {Object} allowSelectAll - Determines whether showing checkbox for option 'Select all' (mapped from props)

  * @vue-computed {String} selectedName - Gets name (value of selected option. (Not implemented)

  * @vue-event {Object} selectedCheckbox - Emits change of checked/unchecked object in checkbox
*/

export default {
  name: 'CheckboxList',
  props: {
    source: {
      type: Array,
      required: true,
    },
    allowNoneOption: {
      type: Boolean,
      required: true,
    },
    allowSelectAll: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    const sourceObject = this.source.map((value, idx) => (
      {
        id: idx,
        value,
        isChecked: false,
      }
    ));
    const selectNone = {
      visible: this.allowNoneOption,
      value: 'none',
      isChecked: false,
    };
    const selectThemAll = {
      visible: this.allowSelectAll,
      value: 'all',
      isChecked: false,
    };

    return {
      dataOptions: sourceObject,
      selectNone,
      selectThemAll,
    };
  },
  methods: {
    /**
     * Emits a 'selectedCheckbox' event depending on the checked/unchecked option - Keeps consistently the on other checkboxes
     * @param {Object} selectedOption - Object selected
    */
    onChangeCheckbox(selectedOption) {
      this.selectNone.isChecked = false;
      let checkedCount = 0;
      for (let i = 0; i < this.dataOptions.length; i += 1) {
        if (this.dataOptions[i].isChecked) {
          checkedCount += 1;
        } else {
          break;
        }
      }
      this.selectThemAll.isChecked = checkedCount === this.dataOptions.length;
      this.$emit('selectedCheckbox', selectedOption);
    },
    /**
     * Emits a 'selectedCheckbox' event when 'None' checkbox is checked/unchecked - Keeps consistently the on other checkboxes
     * @param {Object} value - Object selected
    */
    onChangeSelectJustNoneCheckbox(value) {
      if (value.isChecked) {
        for (let i = 0; i < this.dataOptions.length; i += 1) {
          this.dataOptions[i].isChecked = false;
        }
        this.selectThemAll.isChecked = false;
      }
      this.$emit('selectedCheckbox', value);
    },
    /**
     * Emits a 'selectedCheckbox' event when 'Select all' checkbox is checked/unchecked - Keeps consistently the on other checkboxes
     * @param {Object} value - Object selected
    */
    onChangeSelectAllCheckbox(value) {
      if (value.isChecked) {
        for (let i = 0; i < this.dataOptions.length; i += 1) {
          this.dataOptions[i].isChecked = true;
        }
      } else {
        for (let i = 0; i < this.dataOptions.length; i += 1) {
          this.dataOptions[i].isChecked = false;
        }
      }
      this.selectNone.isChecked = false;
      this.$emit('selectedCheckbox', value);
    },
  },
};
</script>

<style lang="scss">

.checkbox-list-container {
  overflow: hidden;
  padding:10px;
  margin-top:10px;
  height:auto;
}

.two-columns {
  -webkit-columns: 60px 2;
  -moz-columns: 60px 2;
  columns: 60px 2;
  -moz-column-fill: auto;
  column-fill: auto;
}

.extra-row {
  padding-top: 5px;
}

</style>
