<template>
  <div :class="mainClass" :data-slide="slide">
    <perfect-scrollbar>
      <slot>
        <!-- if <MainText> has children, they go here -->
      </slot>
    </perfect-scrollbar>
  </div>
</template>

<script>
import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

export default {
  name: 'MainText',
  props: {
    slide: Number,
  },
  components: {
    PerfectScrollbar,
  },
  computed: {
    mainClass: function() {
      return `main-text main-text--${this.slide}`;
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/vars.scss";

  .main-text {
    .ps {
      max-height: 80vh;
    }
  }
</style>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css">
</style>
