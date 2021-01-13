function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function make_bubbles(val, dem) {
  var margin = {top: 50, right: 100, bottom: 50, left: 50};
  $("#bubbles").empty()
  var width = $("#bubbles").width() * 3
  var height = $("#bubbles").height() / 2.5

  var max_income = 123000;
  var min_income = 23000;
  var max_pop = 1000000;
  var min_pop = 169;

  var min_max = {
    "income": {'min': min_income, 'max': max_income},
    "pop"   : {'min': min_pop, 'max': max_pop}
  }

  var dem_text = {
    "income": "Median Income",
    "vote"  : "% Vote for Trump in 2016",
    "cases" : "Cases Per Capita"
  }

  var dem_pos = {
    "income": income_pos
  }

  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var move_dict = d3.map();
  var val = document.getElementById("myRange").value;

  // create different move dict depending on the slider val
  move_dict = d3.map();

  if (val == 1) { console.log("val is 1");data_2011.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 2) { data_2012.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 3) { data_2013.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 4) { data_2014.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 5) { data_2015.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 6) { data_2016.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 7) { data_2017.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 8) { data_2018.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 9) { data_2019.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
  else if (val == 10) { data_2020.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }

  var county_dict = d3.map();
  var sab_dict = d3.map();
  og_data.forEach( function(d){ 
    county_dict.set( d.fips, d.county);
    sab_dict.set(d.fips, d.sab);
  });

  var x = d3.scaleLinear()
    .domain( [min_max[dem].min, min_max[dem].max] )
    .range( [margin.left, width - margin.right] );

  var radquantize = d3.scaleQuantize()
      .domain([min_max['pop'].min, min_max['pop'].max])
      .range([2, 5])


  var yAxis = d3.axisRight(y);

  var yAxisTitle = bubbles.append("text")
    .attr("class", "axisTitle")
    .text(dem_title[dem])
    .style("z-index", 100)

  yAxisTitle
    .attr("x", width - yAxisTitle.node().getBBox().width - width/4.5)
    .attr("y", ( height/2) - yAxisTitle.node().getBBox().height - height/5)

  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-5, 0])
      .html(function(d) {
        return "County: " + toTitleCase(d.county) + " (" + d.sab + 
        ")<br>Obesity Rate: " + d.obesity_rate + "<br>Population: " + 
        numberWithCommas(d.pop) + "<br>Income: $" + numberWithCommas(d.income);
      })

 
  d3.json("./bubble/dem-data.json", function(error, data) {
    if (error) throw error;

 var bubbles = d3.select("#bubbles").append("svg")
    .attr("width", width)
    .attr("height", height * 10)
    .attr("shape-rendering", "geometric-precision");
  bubbles.selectAll(".axis").remove();
  bubbles.call(tip);


  var quantize = d3.scaleQuantize()
      .domain([0, 4])
      .range(d3.range(5).map(function(i) { 
          if (i == 0)
              return "#9adbb5";
          else if (i == 1)
              return "rgb(205, 235, 178)";
          else if (i == 2)
              return "#F6F5AE";
          else if (i == 3)
              return "rgb(253, 223, 158)";
          else
              return "rgb(211, 85, 65)";
      }))

  var y_dict = d3.map();


  y_pos = dem_pos[dem]

  y_pos.forEach( function(d){ y_dict.set( d.fips, (500) - d.y) });

    //add other demographics!
    var nodes = data.map(function(node, index) {
      return {
        index: index,
        move: move_dict.get(node.fips)[val-1],
        fips: node.fips, 
        pop: node.pop_2019,
        income: node.median_income,
        county: node.county,
        sab: node.sab,
        x: x(node.median_income),
        fx: x(node.median_income),
        r: radquantize(node.pop_2019),
      };
    });

    bubbles.append("g")
      .attr("class", "y axis")
      .force("x", d3.forceX(function(d) { return x(d.income); }).strength(1))
      .force("y", d3.forceY(( height/2)))
      .attr("transform", "translate(0," + ( height/2)  + ")")
      .call(yAxis);

    bubbles.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .style("fill", function(d) { return quantize(d.move); })
      .attr("cx", function(d) { return d.x} )
      .attr("cy", function(d) { return d.y} )
      .attr("r", function(d) { return d.r} )
      .style("opacity", 0.8)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)
  });
}