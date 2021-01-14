function highlight_move(move_index) {
    var val = document.getElementById("myRange").value;
    if(document.getElementById("toggleButton").value=="MAP") {
      svg.selectAll(".counties path")
        .style("opacity", function(d) {
          return in_move_range(move_index, d.id, val) ? 1.2 : 0.3
        })
        .style("stroke", function(d) {
          return in_move_range(move_index, d.id, val) ? "white" : "transparent"
        });
    } else {
      var bubbles = d3.select(".bubble_svg")
      bubbles.selectAll("circle")
        .style("opacity", function(d) {
          return in_move_range(move_index, d.fips, val) ? 0.75 : 0.2
        })
        .style("stroke", function(d) {
          return in_move_range(move_index, d.fips, val) ? "black" : "white"
        })
    }
}
  
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


  function handleHover(county) {
    unhighlight();
    svg.selectAll(".counties path")
      .transition()
      .duration(500)
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