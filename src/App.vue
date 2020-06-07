<template>
  <div id="app">
    <Header />
    <BrowserView />
  </div>
</template>

<script>
import Header from './components/Header/Header.vue';
import BrowserView from './views/BrowserView.vue';

export default {
  name: 'App',
  components: {
    Header,
    BrowserView,
  },
};
</script>

<style lang="scss">
</style>
