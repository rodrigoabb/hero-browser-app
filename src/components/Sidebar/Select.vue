<template>
  <div id="select-component">
    <div class="input-select">
      <select v-model="selected" @change="onChange">
        <option v-for="option in dataOptions" :key="option.id" :value="option" >{{ option.name }}</option>
      </select>
    </div>
    <!-- <h2>
      Selected value: <strong>{{ selected }}</strong>
    </h2> -->
  </div>
</template>

<script>

/**
  * @module Sidebar/Select
  * @desc Select Item component
  * @vue-prop {Array<Object>} source - Array of objects to be displayed as options
  * @vue-prop {Object} initialSelected - Object to be displayed as initial selected option
  *
  * @vue-data {Array<Object>} dataOptions - Array of objects to be displayed as options (mapped from props)
  * @vue-data {Object} selected - Object to be displayed as initial selected option (mapped from props)

  * @vue-computed {String} selectedName - Gets name (value of selected option) - Not implemented

  * @vue-event {Object} newSelectedValue - Emits change of object selected
*/

export default {
  name: 'Select',
  props: {
    source: {
      type: Array,
      required: true,
    },
    initialSelected: {
      type: Object,
      required: true,
    },
  },
  data() {
    const selected = this.initialSelected || this.source[0];
    return {
      dataOptions: this.source,
      selected,
    };
  },

  computed: {
    // selectedName() {
    //   this.source.filter((value) => {
    //     if(value === this.selected) {
    //       name = country.name
    //       return;
    //     }
    //   })
    //   return name;
    // }
  },
  methods: {
    getObjectByValue(value, sourceArray) {
      const result = sourceArray.filter((opt) => (
        opt.value.toLowerCase() === value.toLowerCase()
      ));
      return result[0] || null;
    },
    onChange() {
      this.$emit('newSelectedValue', this.selected);
    },
  },
};
</script>

<style>

#select-component {
  margin: 1em auto;
  max-width: 500px;
}

h2 {
  font-weight: normal;
}

.input-select {
  position: relative;
  display: inline-block;
  width: 100%;
}

label {
  display: inline-block;
  width: 100%;
  font-size: 0.75em;
}

select {
  padding-right: 1.875em;
  cursor: pointer;
  color: #000;
  height: 40px;
  padding-bottom: 8px;
  border-radius: 2px;
  appearance: none;
  position: relative;
  background-color: #fff;
  color: #000;
  font-size: 100%;
  padding: 0.625em 0.5em;
  border: 1px solid #d2d2d2;
  width: 100%;
}

span {
  padding-top: 1em;
}

</style>
