<template>
  <div class="graphic-container">
    <div class="scroll-btn scroll-btn--left" v-on:click="scrollPrev">
      <!-- <img class="scroll-btn-icon"src="/icons/left-arrow.svg" /> -->
      <LeftArrow class="scroll-btn-icon" :hidden="currentSlide === 1"></LeftArrow>
    </div>
    <div class="graphic-wrapper"></div>
    <div class="scroll-btn scroll-btn--right" v-on:click="scrollNext">
      <!-- <img class="scroll-btn-icon"src="/icons/right-arrow.svg" /> -->
      <RightArrow class="scroll-btn-icon" :hidden="currentSlide === 26"></RightArrow>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import SeasonStats from "../utils/season-stats";
import LeftArrow from "./LeftArrow.vue";
import RightArrow from "./RightArrow.vue";

const getTeamOpacity = (teamAbbrev, isText) => {
  if(teamAbbrev === "TOR") {
    return 1;
  } else {
    if(isText) {
      return 0.5;
    }
    else {
      return 0.2;
    }
  }
}

export default {
  name: 'Graphic',
  data: function() {
    return {
      currentSlide: 1,
      seasonStats: null,
      torontoStats: null,
      svg: null,
      pack: null,
    }
  },
  computed: {
    currentYear: function() {
      if(this.currentSlide === 1 || this.currentSlide === 26) {
        return 2019;
      }
      return 1996 + this.currentSlide - 2;
    }
  },
  methods: {
    updateGraphic: function() {
      const currentYearStats = this.seasonStats.stats[this.currentYear];
      const torStats = currentYearStats.children.filter(stat => stat.teamAbbrev === 'TOR');
      if(torStats.length > 0) {
        this.torontoStats = torStats[0];
      }

      this.redraw(currentYearStats.children);

      let titles = document.querySelectorAll('.main-title');
      let texts = document.querySelectorAll('.main-text');

      for(let title of titles) {
        title.classList.remove("active");
        if(title.dataset.slide == this.currentSlide) {
          title.classList.add("active");
        }
      }
      for(let text of texts) {
        text.classList.remove("active");
        if(text.dataset.slide == this.currentSlide) {
          text.classList.add("active");
        }
      }

      const winsText = document.querySelector('.main-text.active .text-wins');
      const lossesText = document.querySelector('.main-text.active .text-losses');
      const wrText = document.querySelector('.main-text.active .text-winrate');

      if(winsText) {
        winsText.textContent = this.torontoStats.regWins;
      }
      if(lossesText) {
        lossesText.textContent = this.torontoStats.regLosses;
      }
      if(wrText) {
        wrText.textContent = Number(Math.round(this.torontoStats.wr + 'e3') + 'e-3');
      }
    },
    scrollPrev: function(evt) {
      if(this.currentSlide > 1) {
        this.currentSlide = this.currentSlide - 1;
      }
      this.updateGraphic();
    },
    scrollNext: function(evt) {
      if(this.currentSlide < 26) {
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

      // let debugMsg = `width = ${width}\n`;
      // debugMsg += `height = ${height}\n`;
      // debugMsg += `viewportHeight = ${viewportHeight}\n`;
      // debugMsg += `shorter = ${shorter}\n`;
      // debugMsg += `isMobile = ${isMobile}\n`;
      // debugMsg += `buttonWidth = ${buttonWidth}\n`;
      // debugMsg += `maxGraphicWidth = ${maxGraphicWidth}\n`;
      // debugMsg += `appliedWidth = ${appliedWidth}`;
      // console.log(debugMsg);

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
        .style("fill", "#666666")
        .style("stroke", "#666666")
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
          return `#${d.data.colours.trim}`
        })
        .style("stroke-width", function(d) {
          if(d.data.champion) {
            return "9"
          } else {
            return "3"
          }
        })
        .style("fill", function(d) {
          return `#${d.data.colours.bg}`
        })
        .attr("opacity", function(d) {
          return getTeamOpacity(d.data.teamAbbrev);
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
          return getTeamOpacity(d.data.teamAbbrev, true);
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
          return `#${d.data.colours.trim}`
        })
        .style("stroke-width", function(d) {
          if(d.data.champion) {
            return "9"
          } else {
            return "3"
          }
        })
        .style("fill", function(d) {
          return `#${d.data.colours.bg}`
        })
        .attr("opacity", function(d) {
          return getTeamOpacity(d.data.teamAbbrev);
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
          return getTeamOpacity(d.data.teamAbbrev, true);
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
      .padding(10);

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
      position: absolute;
      width: calc(67% - 20px);
      left: $space-unit;
      top: $space-unit;
      bottom: $space-unit;
      z-index: 10;
    }

    .scroll-btn {
      width: 60px;
    }
  }
</style>
