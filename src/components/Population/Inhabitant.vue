<template>
  <div>
    <div class="inhabitant-card">
      <figure class="inhabitant__image-wrapper">
        <img class="inhabitant__image" :src="`${inhabitant.thumbnail}`" :alt="inhabitant.name" itemprop="image" />
      </figure>
      <div class="inhabitant__details inhabitant__card-content">
        <div class="inhabitant__name">
          <h1>{{ inhabitant.name }}</h1>
        </div>
        <div class="inhabitant-info">
          <div class="inhabitant__age">
            <b>Age:</b>
            <p>{{ inhabitant.age }}</p>
          </div>
          <div class="inhabitant__gender">
            <b>Gender:</b>
            <p>{{ generateGender(inhabitant.name) }}</p>
          </div>
        </div>
        <div class="inhabitant-info-details">
          <div class="inhabitant__hei-wei-hair">
            <ul class="three-columns">
              <b>Weight</b> <p>{{ parseFloat(inhabitant.weight).toFixed(2) }} {{ weightUnit }}</p>
              <b>Height</b> <p>{{ parseFloat(inhabitant.height).toFixed(2) }} {{ heightUnit }}</p>
              <b>Hair Color</b> <p>{{ inhabitant.hair_color }}</p>
            </ul>
          </div>
          <div class="inhabitant__social-info">
            <ul class="lists-wrapper">
              <div class="inhabitant__profession-list">
                <ul>
                  <b>Professions ({{inhabitant.professions.length}}) </b>
                  <div v-if="inhabitant.professions.length > 0">
                    <li v-for="profession in inhabitant.professions" :key="profession">
                      {{ profession }}
                    </li>
                  </div>
                  <div v-else>No Profession &#128533;</div>
                </ul>
              </div>
              <div class="inhabitant__friend-list">
                <ul>
                  <b>Friends ({{inhabitant.friends.length}}) </b>
                  <div v-if="inhabitant.friends.length > 0">
                    <li v-for="friend in inhabitant.friends" :key="friend">
                      {{ friend }}
                    </li>
                  </div>
                  <div v-else>No Friends &#128546;</div>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { WEIGHT_UNIT, HEIGHT_UNIT } from '@/utilities/constants';
import { getGender } from '@/utilities/helperFunctions';

/**
  * @module Population/Inhabitant
  * @desc Inhabitant Item component
  * @vue-prop {Object} inhabitant - Inhabitant object to be displayed
  * @vue-data {Number} weightUnit - Weight unit to be used across the app
  * @vue-data {Number} heightUnit - Height unit to be used across the app
*/

export default {
  name: 'Inhabitant',
  props: {
    inhabitant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      weightUnit: WEIGHT_UNIT,
      heightUnit: HEIGHT_UNIT,
    };
  },
  methods: {
    /**
     * Gets gender of inhabitant by its name
     * @param {String} name - Name of the ininhabitant for whom to obtain the gender
    */
    generateGender(name) {
      return getGender(name);
    },
  },
};
</script>

<style lang="scss">

$profile-image-height: 220px;


/* ==========================================================================
   Inhabitant Image
   ========================================================================== */

.inhabitant__image-wrapper {
  position: relative;
  text-align: center;
  background-color: #d3d3d3;
  height: $profile-image-height;
  z-index: -10;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.2);
}

.inhabitant__image {
  position: relative;
  z-index: -1;
  max-width: 100%;
  height: $profile-image-height;
}

/* ==========================================================================
   Card
   ========================================================================== */

.inhabitant-card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
}

.inhabitant__card-content {
  /* height: 500px; */
}

.inhabitant__card-content b {
  font-size: 14px;
}

.inhabitant__card-content p {
  color: #808080;
}

.inhabitant__details {
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  text-align: center;
}

.inhabitant__name {
  font-size: 12px;
  height: 56px;
  text-align: center;
  display: table;
}

.inhabitant__name h1 {
  display: table-cell;
  vertical-align: middle;
}

.inhabitant-info {
  display: inline-block;
}

.inhabitant__age, .inhabitant__gender {
  display: inline-block;
  padding-bottom: 10px;
}

.inhabitant__age {
  padding-right: 18px;
}

.inhabitant__age>b, .inhabitant__gender>b {
  float: left;
}

.inhabitant__age>p, .inhabitant__gender>p {
  padding-left: 4px;
  overflow: hidden;
  font-size: 15px;
}

.inhabitant__age>b, .inhabitant__gender>b,
.inhabitant__age>p, .inhabitant__gender>p {
  font-size: 15px;
}
.inhabitant-info-details {
  min-height: 165px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.inhabitant-info-details::-webkit-scrollbar {
  display: none;
}

.inhabitant__hei-wei-hair {
  padding-bottom: 10px;
}

.inhabitant__social-info {
  padding: 0 10px;
}

/* ==========================================================================
   Layout
   ========================================================================== */

.lists-wrapper {
  overflow: hidden;
}

.lists-wrapper ul div {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: #808080;
}

.inhabitant__profession-list {
  float:left;
}

.inhabitant__friend-list {
  overflow: hidden;
}

.three-columns {
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  -moz-column-fill: auto;
  column-fill: auto;
}


</style>
