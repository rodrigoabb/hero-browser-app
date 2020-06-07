<template>
  <div>
    <div>
      <main class="population-page">
        <div>SIDEBAR</div>
        <div class="container" :class="isSidebarVisible ? 'content-with-sidebar' : 'content-without-sidebar'">
          <div class="">
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
  </div>
</template>

<script>
import Inhabitant from '@/components/Population/Inhabitant.vue';
import mockedData from '../store/__mockedPopulation__';

export default {
  name: 'BrowserView',
  components: {
    Inhabitant,
  },

  data() {
    return {
      isSidebarVisible: false,
    };
  },
  computed: {
    dataSource() {
      return mockedData;
    },
  },
};
</script>

<style lang="scss">

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
