///////////////////////////////////////////////////////////////////////////////
///  CONSTANTS & UTILS

let currentYear = "1996";
const seasonStats = new SeasonStats();

///////////////////////////////////////////////////////////////////////////////
///  LOADING DATA

var regSeasonData = d3.csv("team-stats.csv", ({ Year, Rk, Team, W, L, ORtg, DRtg }) => {
  seasonStats.addData({ Year, Rk, Team, W, L, ORtg, DRtg }, 'season');
});

var playoffData = d3.csv("playoff-stats.csv", ({ Year, Rk, Team, W, L, ORtg, DRtg }) => {
  seasonStats.addData({ Year, Rk, Team, W, L, ORtg, DRtg }, 'playoffs');
});

///////////////////////////////////////////////////////////////////////////////
///  RENDERING WITH D3

var width = window.innerWidth * 0.9;
var height = window.innerHeight * 0.9;
const shorter = height > width ? width : height;

var svg = d3.select("body")
  .append("svg")
  .attr("width", shorter)
  .attr("height", shorter);

var pack = d3.pack()
  .size([shorter, shorter])
  .padding(1.5);

Promise.all([regSeasonData, playoffData]).then(function (values) {
  redraw(seasonStats.stats[currentYear].children);
});

///////////////////////////////////////////////////////////////////////////////
///  UPDATING DATA

function redraw(classes) {
  // transition
  var t = d3.transition()
    .duration(750);

  // hierarchy
  var h = d3.hierarchy({ children: classes })
    .sum(function (d) { return Math.pow(d.overallRtg, 2.33); })

  //JOIN
  var circle = svg.selectAll("circle")
    .data(pack(h).leaves(), function (d) { return d.data.teamAbbrev; });

  var text = svg.selectAll("text")
    .data(pack(h).leaves(), function (d) { return d.data.teamAbbrev; });

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
      console.log(d);
      const champMod = d.data.adjPlayoffWinRate === 100 ? 'circle--champion' : '';
      return `circle circle--${d.data.teamAbbrev} ${champMod}`;
    })
    .style("stroke", function(d) {
      if(d.data.adjPlayoffWinRate === 100) {
        return "black"
      }
    })
    .style("stroke-width", function(d) {
      if(d.data.adjPlayoffWinRate === 100) {
        return "5"
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
        return "black"
      }
    })
    .style("stroke-width", function(d) {
      if(d.data.adjPlayoffWinRate === 100) {
        return "5"
      }
    })
    .attr("class", function (d) {
      console.log(d);
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

///////////////////////////////////////////////////////////////////////////////
///  USER INTERACTION

document.addEventListener('click', function (event) {

  // If the clicked element doesn't have the right selector, bail
  if (!event.target.matches('.btn-scroll')) return;

  // Don't follow the link
  event.preventDefault();

  if (event.target.matches('.btn-scroll--prev')) {
    currentYear--;
  }

  if (event.target.matches('.btn-scroll--next')) {
    currentYear++;
  }

  console.log(currentYear);
  redraw(seasonStats.stats[currentYear].children);

}, false);
