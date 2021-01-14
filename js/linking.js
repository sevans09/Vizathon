function unhighlight() {
    selected_fips = null;

    svg.selectAll(".counties path")
      .transition()
      .duration(500)
      .style("opacity", 0.95)
      .style("stroke", "transparent")

    var bubbles = d3.select(".bubble_svg")
    bubbles.selectAll("circle")
      .transition()
      .duration(500)
      .style("opacity", 0.75)
      .style("stroke", "transparent")
}

function highlight_single(county) {
    selected_fips = county;
    console.log(county);

    svg.selectAll(".counties path")
      .transition()
      .duration(500)
      .style("opacity", function(d) {
        return (county == d.id) ? 1.2 : 0.3
      })
      .style("stroke", function(d) {
        return county == d.id ? "black" : "transparent"
      });

    var bubbles = d3.select(".bubble_svg")
    bubbles.selectAll("circle")
      .transition()
      .duration(500)
      .style("opacity", function(d) {
        return (county == d.fips) ? 0.75 : 0.2
      })
      .style("stroke", function(d) {
        return (county == d.fips) ? "black" : "transparent"
      })
  }

  function handleClick(fips) {
    unhighlight();
    highlight_single(fips);
  }


  function handleHover(county, from_bubbles) {
    console.log(selected_fips, from_bubbles);
    if (selected_fips === null) {
      console.log(county);
      svg.selectAll(".counties path")
        .transition()
        .duration(500)
        .style("opacity", function(d) {
          if (from_bubbles)
            return (county == d.id) ? 1.2 : 0.3;
          else
            return 1;
        })
        .style("stroke", function(d) {
          return county == d.id ? "black" : "transparent"
        });

      var bubbles = d3.select(".bubble_svg")
      bubbles.selectAll("circle")
        .transition()
        .duration(500)
        .style("opacity", function(d) {
          if (!from_bubbles)
            return (county == d.fips) ? 0.75 : 0.2;
          else
            return 1;
        })
        .style("stroke", function(d) {
          return (county == d.fips) ? "black" : "transparent"
        })
      }
  }