<template>
  <div>
    <div>
      <main class="population-page">
        <div>SIDEBAR</div>
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
      isSidebarVisible: true,
    };
  },
  computed: {
    dataSource() {
      return mockedData;
    },
  },
};
</script>

<style lang="scss" scoped>

.browser-view {
  margin-top: 70px;
  margin-left: 10px;
}

</style>
