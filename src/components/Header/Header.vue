<template>
    <div class="header-container">
    <header class="header">
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>

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

</style>
