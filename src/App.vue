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


/* ==========================================================================
   Main Styles
   ========================================================================== */

html {
    height: 100%;
}

body {
  min-height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  font-family: MuseoSans, "Helvetica Neue", Helvetica,Arial, sans-serif;
  font-size: 13px;
  text-rendering: optimizeLegibility;
  -moz-osx-font-smoothing: grayscale;  /* Font smoothing tweaks for MacOSx in Gecko */
  -webkit-font-smoothing: antialiased;
  color: #444A59;
  background-color: #f8f8f8;
}

* {
  box-sizing: border-box;
}

header,
footer {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}


</style>
