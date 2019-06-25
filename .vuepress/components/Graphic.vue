<template>
  <div class="graphic-container">
    <div class="scroll-btn scroll-btn--left" v-on:click="scrollPrev">
      <!-- <img class="scroll-btn-icon"src="/icons/left-arrow.svg" /> -->
      <LeftArrow class="scroll-btn-icon" :hidden="currentSlide === 1"></LeftArrow>
    </div>
    <div class="graphic-wrapper"></div>
    <div class="scroll-btn scroll-btn--right" v-on:click="scrollNext">
      <!-- <img class="scroll-btn-icon"src="/icons/right-arrow.svg" /> -->
      <RightArrow class="scroll-btn-icon" :hidden="currentSlide === 25"></RightArrow>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import SeasonStats from "../utils/season-stats";
import LeftArrow from "./LeftArrow.vue";
import RightArrow from "./RightArrow.vue";

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
    updateGraphic: function() {
      this.redraw(this.seasonStats.stats[this.currentYear].children);

      let titles = document.querySelectorAll('.main-title');
      let texts = document.querySelectorAll('.main-text');

      for(let title of titles) {
        title.classList.remove("active");
        if(title.dataset.slide == this.currentSlide) {
          title.classList.add("active");``
        }
      }
      for(let text of texts) {
        text.classList.remove("active");
        if(text.dataset.slide == this.currentSlide) {
          text.classList.add("active");``
        }
      }
    },
    scrollPrev: function(evt) {
      if(this.currentSlide > 1) {
        this.currentSlide = this.currentSlide - 1;
      }
      this.updateGraphic();
    },
    scrollNext: function(evt) {
      if(this.currentSlide < 25) {
        this.currentSlide = this.currentSlide + 1;
      }
      this.updateGraphic();
    },
    getGraphicDimensions: function() {
      const width = this.$el.clientWidth;
      const height = this.$el.clientHeight;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const isMobile = viewportWidth <= 750;

      const buttonWidth = isMobile ? 40 : 60;
      const shorter = viewportHeight > width ? width : viewportHeight;
      const maxGraphicWidth = shorter + (2 * buttonWidth);
      const appliedWidth = shorter - (2 * buttonWidth);

      let debugMsg = `width = ${width}\n`;
      debugMsg += `height = ${height}\n`;
      debugMsg += `viewportHeight = ${viewportHeight}\n`;
      debugMsg += `shorter = ${shorter}\n`;
      debugMsg += `isMobile = ${isMobile}\n`;
      debugMsg += `buttonWidth = ${buttonWidth}\n`;
      debugMsg += `maxGraphicWidth = ${maxGraphicWidth}\n`;
      debugMsg += `appliedWidth = ${appliedWidth}`;
      console.log(debugMsg);

      return appliedWidth;
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
          const champMod = d.data.champion ? 'circle--champion' : '';
          return `circle circle--${d.data.teamAbbrev} ${champMod}`;
        })
        .style("stroke", function(d) {
          // if(d.data.champion) {
            return `#${d.data.colours.text}`
          // }
        })
        .style("stroke-width", function(d) {
          if(d.data.champion) {
            return "9"
          } else {
            return "2"
          }
        })
        .style("fill", function(d) {
          if(d.data.teamAbbrev === "TOR") {
            console.log(d.data.colours);
          }
          return `#${d.data.colours.bg}`
        })
        .attr("opacity", function(d) {
          if(d.data.playoffs) {
            return 1;
          } else {
            if(d.data.teamAbbrev === "TOR") {
              return 0.4;
            }
            return 0.25;
          }
        })
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; });

      text
        .transition(t)
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .style("fill", function(d) {
          return `#${d.data.colours.text}`
        })
        .attr("opacity", function(d) {
          if(d.data.playoffs) {
            return 1;
          } else {
            if(d.data.teamAbbrev === "TOR") {
              return 0.4;
            }
            return 0.25;
          }
        })
        .style("font-size", function (d) {
          return `${ d.r / 1.33 }px`;
        });


      //ENTER
      circle.enter().append("circle")
        .attr("r", 1e-6)
        .attr("opacity", 1e-6)
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function (d) { return d.y; })
        .style("fill", "#fff")
        .transition(t)
        .attr("r", function (d) {
          return d.r
        })
        .style("stroke", function(d) {
          // if(d.data.champion) {
            return `#${d.data.colours.text}`
          // }
        })
        .style("stroke-width", function(d) {
          if(d.data.champion) {
            return "9"
          } else {
            return "2"
          }
        })
        .style("fill", function(d) {
          return `#${d.data.colours.bg}`
        })
        .attr("opacity", function(d) {
          if(d.data.playoffs) {
            return 1;
          } else {
            if(d.data.teamAbbrev === "TOR") {
              return 0.4;
            }
            return 0.25;
          }
        })
        .attr("class", function (d) {
          const champMod = d.data.champion ? 'circle--champion' : '';
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
        .style("fill", function(d) {
          return `#${d.data.colours.text}`
        })
        .attr("font-family", "sans-serif")
        .style("text-anchor", "middle")
        .attr("dy", ".4em")
        .style("font-weight", "bold")
        .style("font-size", function (d) {
          return `${ d.r / 1.33 }px`;
        })
        .transition(t)
        .attr("opacity", function(d) {
          if(d.data.playoffs) {
            return 1;
          } else {
            if(d.data.teamAbbrev === "TOR") {
              return 0.4;
            }
            return 0.25;
          }
        });
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

    const appliedWidth = this.getGraphicDimensions();
    this.svg = d3.select(".graphic-wrapper")
      .append("svg")
      .style("margin", "0 auto")
      .style("display", "block")
      .attr("width", appliedWidth)
      .attr("height", appliedWidth);

    this.pack = d3.pack()
      .size([appliedWidth, appliedWidth])
      .padding(5);

    seasonData.then(function (values) {
      that.updateGraphic();
    });

    ///////////////////////////////////////////////////////////////////////////////
    //   HANDLING WINDOW RESIZES

    const resizeHandler = evt => {
      const appliedWidth = this.getGraphicDimensions();
      this.svg.attr("width", appliedWidth);
      this.svg.attr("height", appliedWidth);
      this.pack = d3.pack()
        .size([appliedWidth, appliedWidth])
        .padding(1.5);
      this.redraw(this.seasonStats.stats[this.currentYear].children);
    };
    
    const delay = 100;  // Your delay here
    (() => {
      let resizeTaskId = null;
      window.addEventListener('resize', evt => {
        if (resizeTaskId !== null) {
          clearTimeout(resizeTaskId);
        }
        resizeTaskId = setTimeout(() => {
          resizeTaskId = null;
          resizeHandler(evt);
        }, delay);
      });
    })();
  },
  components: {
    LeftArrow,
    RightArrow,
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/vars.scss";

  .graphic-container {
    position: relative;
    background-color: #111111;
    min-height: 400px;

    display: flex;
    justify-content: center;
  }

  .scroll-btn {
    width: 40px;
    z-index: 11;

    display: flex;
    flex-direction: column;
    justify-content: center;

    &-icon {
      flex: 0 0 auto;
    }
  }

  .graphic-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    svg {
      width: 100%;
      flex: 0 1 auto;
    }
  }

  /* Larger than tablet */
  @media (min-width: 750px) {
    .graphic-container {
      position: fixed;
      width: calc(70% - 40px);
      left: 0;
      top: 0;
      bottom: 0;
      z-index: 10;
    }

    .scroll-btn {
      width: 60px;
    }
  }
</style>
