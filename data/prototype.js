var currentYear = "2019";
var dataByYear = {};
for (var yr = 1996; yr <= 2019; yr++) {
  dataByYear["" + yr] = {
    "children": [],
  };
}

var ballData = d3.csv("team-stats.csv", ({ Year, Rk, Team, W, L, ORtg, DRtg }) => {
  const wins = parseInt(W, 10);
  const losses = parseInt(L, 10);
  const oRtg = parseFloat(ORtg);
  const dRtg = parseFloat(DRtg);

  const totalGames = wins + losses;
  const winRate = wins / totalGames;
  const netRtg = oRtg - dRtg;

  const newRecord = {
    year: Year,
    rank: Rk,
    team: Team,
    winRate: Number(Math.round((winRate * 100) + 'e2') + 'e-2'),
    netRtg: Number(Math.round(netRtg + 'e2') + 'e-2'),
  };

  const additions = getAdditionalTeamInfo(newRecord);
  console.log(additions);
  newRecord.playoffs = additions.playoffs;
  newRecord.abbrev = additions.abbrev;

  dataByYear[Year].children.push(newRecord);
  return newRecord;
});

ballData.then(function (dataValue) {
  dataset = dataByYear[currentYear];
  console.log(dataset, dataByYear);

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
    .sum(function (d) { return Math.pow(d.winRate, 3.5); });

  var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
      return !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });

  node.append("title")
    .text(function (d) {
      return d.abbrev + ": " + d.winRate;
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
      return d.data.abbrev;
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
