<template>
  <div class="graphic-wrapper">
    <div class="scroll-btn scroll-btn--left" v-on:click="scrollPrev">
      <span class="scroll-btn-icon">⇦</span>
    </div>
    <div class="scroll-btn scroll-btn--right" v-on:click="scrollNext">
      <span class="scroll-btn-icon">⇨</span>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import SeasonStats from "../utils/season-stats";

export default {
  name: 'Graphic',
  data: function() {
    return {
      currentSlide: 1,
      seasonStats: null,
      svg: null,
      pack: null,
    }
  },
  computed: {
    currentYear: function() {
      if(this.currentSlide === 1) {
        return 2019;
      }
      return 1996 + this.currentSlide - 2;
    }
  },
  methods: {
    scrollPrev: function(evt) {
      if(this.currentSlide > 1) {
        this.currentSlide = this.currentSlide - 1;
      }
      this.redraw(this.seasonStats.stats[this.currentYear].children);
      const labelElement = document.querySelector('.main-title');
      labelElement.innerHTML = this.currentYear;

      console.log(`currentSlide: ${this.currentSlide}, currentYear: ${this.currentYear}`);
    },
    scrollNext: function(evt) {
      if(this.currentSlide < 25) {
        this.currentSlide = this.currentSlide + 1;
      }
      this.redraw(this.seasonStats.stats[this.currentYear].children);
      const labelElement = document.querySelector('.main-title');
      labelElement.innerHTML = this.currentYear;

      console.log(`currentSlide: ${this.currentSlide}, currentYear: ${this.currentYear}`);
    },
    redraw: function(classes) {
      // transition
      var t = d3.transition()
        .duration(750);

      // hierarchy
      var h = d3.hierarchy({ children: classes })
        .sum(function (d) { return Math.pow(d.overallRtg, 2.75); })
        .sort((a, b) => b.overallRtg - a.overallRtg);

      //JOIN
      var circle = this.svg.selectAll("circle")
        .data(this.pack(h).leaves(), function (d) { return d.data.teamAbbrev; });

      var text = this.svg.selectAll("text")
        .data(this.pack(h).leaves(), function (d) { return d.data.teamAbbrev; });

      //EXIT
      circle.exit()
        .style("fill", "#b26745")
        .transition(t)
        .attr("r", 1e-6)
        .remove();

      text.exit()
        .style("font-size", 1e-6)
        .transition(t)
        .attr("r", 1e-6)
        .attr("opacity", 1e-6)
        .remove();

      //UPDATE
      circle
        .transition(t)
        // .style("fill", "#3a403d")
        .attr("r", function (d) { return d.r })
        .attr("class", function (d) {
          const champMod = d.data.adjPlayoffWinRate === 100 ? 'circle--champion' : '';
          return `circle circle--${d.data.teamAbbrev} ${champMod}`;
        })
        .style("stroke", function(d) {
          if(d.data.adjPlayoffWinRate === 100) {
            return "FFFFFF"
          }
        })
        .style("stroke-width", function(d) {
          if(d.data.adjPlayoffWinRate === 100) {
            return "6"
          }
        })
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });

      text
        .transition(t)
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .style("font-size", function (d) {
          return `${ d.r / 1.33 }px`;
        });

      //ENTER
      circle.enter().append("circle")
        .attr("r", 1e-6)
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .style("fill", "#fff")
        .transition(t)
        .style("fill", "#45b29d")
        .attr("r", function (d) {
          return d.r
        })
        .style("stroke", function(d) {
          if(d.data.adjPlayoffWinRate === 100) {
            return "FFFFFF"
          }
        })
        .style("stroke-width", function(d) {
          if(d.data.adjPlayoffWinRate === 100) {
            return "6"
          }
        })
        .attr("class", function (d) {
          const champMod = d.data.adjPlayoffWinRate === 100 ? 'circle--champion' : '';
          return `circle circle--${d.data.teamAbbrev} ${champMod}`;
        });

      circle.enter().append("text")
        .attr("opacity", 1e-6)
        .style("font-size", 1e-6)
        .attr("x", function (d) { return d.x })
        .attr("y", function (d) { return d.y })
        .text(function (d) { return d.data.teamAbbrev; })
        .attr("class", function (d) {
          return `text text--${d.data.teamAbbrev}`;
        })
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .attr("dy", ".4em")
        .style("font-size", function (d) {
          return `${ d.r / 1.33 }px`;
        })
        .transition(t)
        .attr("opacity", 1);
    }
  },
  mounted() {
    this.seasonStats = new SeasonStats();
    const that = this;

    ///////////////////////////////////////////////////////////////////////////////
    ///  LOADING DATA

    const seasonData = d3.csv("../data/stats.csv", ({ Type, Year, Rk, Team, W, L, ORtg, DRtg }) => {
      that.seasonStats.addData({ Year, Rk, Team, W, L, ORtg, DRtg }, Type);
    });

    ///////////////////////////////////////////////////////////////////////////////
    ///  RENDERING WITH D3

    const width = this.$el.clientWidth;
    const height = this.$el.clientHeight;
    const shorter = height > width ? width : height;

    this.svg = d3.select(".graphic-wrapper")
      .append("svg")
      .style("margin", "0 auto")
      .style("display", "block")
      .attr("width", shorter)
      .attr("height", shorter);

    this.pack = d3.pack()
      .size([shorter, shorter])
      .padding(1.5);

    seasonData.then(function (values) {
      that.redraw(that.seasonStats.stats[that.currentYear].children);
    });

    const labelElement = document.querySelector('.main-title');
    labelElement.innerHTML = this.currentYear;
  }
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