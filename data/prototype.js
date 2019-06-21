///////////////////////////////////////////////////////////////////////////////
///// CONSTANTS & UTILS

const currentYear = "1996";
const seasonStats = new SeasonStats();

///////////////////////////////////////////////////////////////////////////////
///// LOADING DATA

var loadData = new Promise(function (resolve, reject) {
  var regSeasonData = d3.csv("team-stats.csv", ({ Year, Rk, Team, W, L, ORtg, DRtg }) => {
    seasonStats.addData({ Year, Rk, Team, W, L, ORtg, DRtg }, 'season');
  });

  var playoffData = d3.csv("playoff-stats.csv", ({ Year, Rk, Team, W, L, ORtg, DRtg }) => {
    seasonStats.addData({ Year, Rk, Team, W, L, ORtg, DRtg }, 'playoffs');
  });

  Promise.all([regSeasonData, playoffData]).then(function (values) {
    resolve(seasonStats);
  });
});

///////////////////////////////////////////////////////////////////////////////
///// RENDERING WITH D3

loadData.then(function (dataValue) {
  dataset = dataValue.stats[currentYear];
  console.log(dataValue, dataset);

  var diameter = 710;
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

  var svg = d3.select("body")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  var nodes = d3.hierarchy(dataset)
    .sum(function (d) {
      return Math.pow(d.overallRtg, 3);
    });

  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
      return !d.children;
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  node.append("title")
    .text(function (d) {
      return d.teamAbbrev + ": " + d.overallRtg;
    });

  node.append("circle")
    .attr("r", function (d) {
      return d.r;
    })
    .style("fill", function (d, i) {
      return color(i);
    });

  node.append("text")
    .attr("dy", ".4em")
    .style("text-anchor", "middle")
    .text(function (d) {
      return d.data.teamAbbrev;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function (d) {
      return d.r / 1.5;
    })
    .attr("fill", "white");

  // node.append("text")
  //   .attr("dy", "1.3em")
  //   .style("text-anchor", "middle")
  //   .text(function (d) {
  //     return d.data.winRate + "%";
  //   })
  //   .attr("font-family", "Gill Sans", "Gill Sans MT")
  //   .attr("font-size", function (d) {
  //     return d.r / 5;
  //   })
  //   .attr("fill", "white");

  d3.select(self.frameElement)
    .style("height", diameter + "px");
});
