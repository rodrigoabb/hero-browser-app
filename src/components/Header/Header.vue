<template>
    <div class="header-container">
    <header class="header">
      <Logo />
      <div class="slogan">
        Get to know the town!
      </div>
    </header>
  </div>
</template>

<script>
import Logo from '@/components/Utils/Logo.vue';

export default {
  name: 'Header',
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>

@import "@/utilities/variables";

/* ==========================================================================
   Header
   ========================================================================== */

.header-container {
  width: 100%;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  top: 0;
  -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.06);
  padding: 0;
  z-index: 999;
  position: fixed;
  width: 100%;
  background-color: #ffffff;
}

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: 5px;
  // max-width: 1240px;
  margin: auto;
}

.slogan {
  font-family: sans-serif;
  font-weight: bold;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}


/* ==========================================================================
   Media Queries
   ========================================================================== */

@media (max-width: $phone-upper-boundary - 1) {

  .header {
    padding-right: 2em;
    padding-left: 2em;
  }

}

@media (min-width: $phone-upper-boundary) {

  .header {
    padding-right: 5.5em;
    padding-left: 2.5em;
  }

}

@media (min-width: $tablet-landscape-upper-boundary) {

  .header {
    padding-right: 4.5em;
    padding-left: 2.5em;
  }
}

</style>
