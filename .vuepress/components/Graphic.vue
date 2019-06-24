<template>
  <div class="graphic-wrapper">
    <p>D3 graphic placeholder</p>
    <div class="scroll-btn scroll-btn--left" v-on:click="scrollPrev">
      <span class="scroll-btn-icon">⇦</span>
    </div>
    <div class="scroll-btn scroll-btn--right" v-on:click="scrollNext">
      <span class="scroll-btn-icon">⇨</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Graphic',
  data: function() {
    return {
      currentSlide: 1,
      currentYear: 2019,
    }
  },
  methods: {
    scrollPrev: function(evt) {
      if(this.currentSlide > 1) {
        this.currentSlide = this.currentSlide - 1;
      }
      console.log(`currentSlide: ${this.currentSlide}`);
    },
    scrollNext: function(evt) {
      if(this.currentSlide < 25) {
        this.currentSlide = this.currentSlide + 1;
      }
      console.log(`currentSlide: ${this.currentSlide}`);
    }
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/vars.scss";

  .graphic-wrapper {
    position: relative;
    background-color: #111111;
    min-height: 400px;
  }

  .scroll-btn {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 15%;
    cursor: pointer;
    z-index: 11;
    transition: background-color 0.25s;

    &--left {
      left: 0;
    }

    &--right {
      right: 0;
    }

    &-icon {
      position: relative;
      color: #FFFFFF;
      z-index: 12;
    }

    &:hover {
      background-color: rgba(64, 64, 64, 0.25);
    }
  }

  /* Larger than tablet */
  @media (min-width: 750px) {
    .graphic-wrapper {
      position: fixed;
      width: calc(70% - 40px);
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 10;
    }
  }
</style>
