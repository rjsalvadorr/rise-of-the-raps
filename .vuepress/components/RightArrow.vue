<template>
  <svg height='300px' width='300px' class="right-arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" style="shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;" viewBox="0 0 375 668" x="0px" y="0px" fill-rule="evenodd" clip-rule="evenodd"><defs></defs><g><path class="fil0" d="M363 304l-292 -292c-17,-16 -43,-16 -59,0 -16,16 -16,42 0,59l263 263 -263 263c-16,16 -16,43 0,59 16,16 42,16 59,0l292 -293c16,-16 16,-42 0,-59z"></path></g></svg>
</template>

<script>
export default {
  name: 'RightArrow',
}
</script>

<style scoped lang="scss">
  @import "../styles/vars.scss";

  .right-arrow {
    width: 40px;
    cursor: pointer;
    fill: #666666;
    opacity: 0.5;

    &:hover {
      fill: #888888;
    }
  }

  /* Larger than tablet */
  @media (min-width: 750px) {
    .right-arrow {
      width: 60px;
    }
  }
</style>
