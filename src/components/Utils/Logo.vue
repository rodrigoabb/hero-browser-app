
<template>
  <div >
    <img :src="bigLogoImage" class="big-logo" alt="Hero Population Browser " />
    <img :src="smallLogoImage" class="small-logo" alt="Hero Population Browser" />
  </div>
</template>

<script>
import bigLogo from '@/assets/logo.png';
import smallLogo from '@/assets/mini_logo.png';

export default {
  name: 'Logo',
  data() {
    return {
      bigLogoImage: bigLogo,
      smallLogoImage: smallLogo,
    };
  },

};
</script>

<style lang="scss">
@import "@/utilities/variables";

/* ==========================================================================
  Logo
   ========================================================================== */

.big-logo {
  display: none;
  width: 200px;
  -webkit-transition: all .2s ease-in-out;
  transition: all .2s ease-in-out;
}
.small-logo {
  width: 50px;
  height: 50px;
}

</style>
