<template>
  <div class="graphic-wrapper">
    <p>D3 graphic placeholder</p>
    <div class="scroll-btn scroll-btn--left">
      <span>⇦</span>
    </div>
    <div class="scroll-btn scroll-btn--right">
      <span>⇨</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Graphic',
}
</script>

<style scoped lang="scss">
  @import "../styles/vars.scss";

  .graphic-wrapper {
    background-color: #FF0000;
    min-height: 400px;
  }

  /* Larger than tablet */
  @media (min-width: 750px) {
    .graphic-wrapper {
      position: fixed;
      width: 70%;
      left: 0;
      top: 0;
      bottom: 0;
      padding: $space-unit;
      z-index: -10;
    }
  }
</style>
