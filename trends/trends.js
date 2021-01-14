var max_income = 123000;
var min_income = 18000;
var max_pop = 1000000;
var min_pop = 169;
var min_vote = 0;
var max_vote = 1;
var min_unemp = 0;
var max_unemp = .26;
var min_cpr = 2.5;
var max_cpr = 68.3;
var min_smoke = 5;
var max_smoke = 42;
var min_exercise = 0;
var max_exercise = 100;
var min_drinking = 7;
var max_drinking = 29;

var min_max = {
  "income": {'min': min_income, 'max': max_income},
  "pop"   : {'min': min_pop, 'max': max_pop},
  "unemp" : {'min': min_unemp, 'max': max_unemp},
  "cpr"   : {'min': min_cpr, 'max': max_cpr},
  "smoke" : {'min': min_smoke, 'max': max_smoke},
  "exer"  : {'min': min_exercise, 'max': max_exercise},
  "drink" : {'min': min_drinking, 'max': max_drinking} 
}

var dem_title = {
  "income": "Median Income",
  "unemp" : "Unemployment Rate",
  "cpr"   : "Childhood Poverty Rate",
  "smoke" : "Smoking Rate",
  "exer"  : "Exercise Opportunities",
  "drink" : "Excessive Drinking Rate"
}

var dem_label = {
  "income": "Income: $",
  "unemp" : "Unemployment",
  "cpr"   : "Childhood Poverty Rate",
  "smoke" : "Smoking Rate",
  "exer"  : "Exercise Opportunities",
  "drink" : "Excessive Drinking Rate"
}


var dem_pos = {
  "income": income_pos,
  "unemp" : unemp_pos,
  "cpr"   : cpr_pos,
  "smoke" : smoke_pos,
  "exer"  : exercise_pos,
  "drink" : drinking_pos
}


var pop_dict = d3.map();
dem_data.forEach( function(d){ 
  pop_dict.set( d.fips, d.pop_2019);
});

var unemp_dict = d3.map();
unemp_data.forEach( function(d) {
  unemp_dict.set(d.id, d.rate);
});

var childpov_dict = d3.map();
data_2020.forEach(function (d) {
  childpov_dict.set(d.FIPS, d.childhood_poverty_rate);
})

var smoke_dict = d3.map();
data_2020.forEach(function (d) {
  smoke_dict.set(d.FIPS, d.smoking_rate);
})

var exercise_dict = d3.map();
data_2020.forEach(function (d) {
  exercise_dict.set(d.FIPS, d.exercise);
})

var drinking_dict = d3.map();
data_2020.forEach(function (d) {
  drinking_dict.set(d.FIPS, d.drinking);
})

function get_rad_range(width) {
  if (width >= 900) {
    return [3,8]
  }
  else if (width >= 600) {
    return [2,5]
  }
  return [1.5,3]
}

function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

percentFormat = d3.format(',.2%');

function get_x_value(dem, data) {
  if (dem == "income") {
      return numberWithCommas(data.income);
    }
  else if (dem == "unemp") {
    return percentFormat(data.unemp);
  }
  else if (dem == "cpr") {
    return (data.cpr);
  }
  else if (dem == "smoke") {
    return data.smoke;
  }
  else if (dem == "exer") {
    return data.exercise;
  }
  else if (dem == "drink") {
    return data.drinking;
  }
  // return (dem == "vote") ? percentFormat(data.vote) : data.cases;
}

function get_node_x(dem, node) {
    if (dem == "income") {
      return node.median_income
    }
    else if (dem == "unemp") {
      return node.unemp
    }
    else if (dem == "cpr") {
      return node.cpr
    }
    else if (dem == "smoke") {
      return node.smoke  
    }
    else if (dem == "exer") {
      return node.exercise;
    }
    else if (dem == "drink") {
      return node.drinking;
    }
    // return (dem == "vote") ? node.per_gop : node.cpc
}

function get_d_x(dem, node) {
    if (dem == "income") {
      return node.income
    }
    else if (dem == "unemp") {
      return node.unemp
    }
    else if (dem == "cpr") {
      return node.cpr
    }
    else if (dem == "smoke") {
      return node.smoke  
    }
    else if (dem == "exer") {
      return node.exercise;
    }
    else if (dem == "drink") {
      return node.drinking;
    }
    // return (dem == "vote") ? node.vote : node.cpc
}


function make_x_axis(dem) {
  console.log("making x axis");
  var bubbles = d3.select(".bubble_svg")
  bubbles.selectAll(".axis").remove();

  var margin = {top: 50, right: 100, bottom: 50, left: 50};
  var width = $("#bubbles").width() * 1.5;
  var height = $("#bubbles").height() / 2.5;

  pos = $("#bubbles").position().top;

  var y = d3.scaleLinear()
  .domain( [min_max[dem].min, min_max[dem].max] )
  .range( [margin.left, width - margin.right] );

  var yAxis;
  if (dem !== "income" && dem !== "unemp")
    yAxis = d3.axisRight(y).tickFormat(function(d){
    return d.toString() + "%"});
  else if (dem === "unemp") {
    yAxis = d3.axisRight(y).tickFormat(function(d){
      return (d*100).toFixed().toString()  + "%"});
  }     
  else {
    yAxis = d3.axisRight(y).tickFormat(function(d){
      return "$" + numberWithCommas(d);});
    }

  bubbles.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width/3 + "," + (height/2)  + ")")
    .call(yAxis);
}

function update_demographic(dem, val) {
  console.log(dem);
  var margin = {top: 50, right: 100, bottom: 50, left: 50};
  var t = d3.transition()
        .duration(750);

  var width = $("#bubbles").width() * 1.5
  var height = $("#bubbles").height() / 2.5

  var bubbles = d3.select(".bubble_svg")

  bubbles.select(".axisTitle").remove()
  bubbles.select("g.y.axis").remove()
  bubbles.select(".d3-tip").remove()

  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-5, 0])
      .html(function(d) {
        return "County: " + toTitleCase(d.county) + " (" + d.sab + ")<br>Obesity Rate: " + d.obesity_rate + 
        "<br>Population: " + numberWithCommas(d.pop)+ "<br>" + dem_label[dem] + ": " + get_x_value(dem, d);
      })

  bubbles.call(tip);

  var x = d3.scaleLinear()
    .domain([min_max[dem].min, min_max[dem].max] )
    .range([margin.left, width - margin.right]);

  var y_dict = d3.map();
  y_pos = dem_pos[dem];
  y_pos.forEach( function(d){ y_dict.set(d.fips, d.y - height/2)});
  // console.log(y_dict);

  var circle = bubbles.selectAll("circle")
    .attr("x", function(d) { return x(get_d_x(dem, d))})
    .attr("y", function(d) { return y_dict.get(d.fips)})
    .on("mouseover", function(d) {
      tip.show(d);
      handleHover(d.fips, true);})
    .on('mouseout', tip.hide)
    .on('click', function(d) { handleClick(d.fips) })
    .transition(t)
      .attr("cy", function(d) { return x(get_d_x(dem, d))})
      .attr("cx", function(d) { return y_dict.get(d.fips)})
      .attr("transform", "translate(" + width/3 + "," + height/2 + ")")

  make_x_axis(dem);

  if (selected_fips != null)
    highlight_single(selected_fips);
  
}

// to be used with swapmap to replace map with bubbles
function make_bubbles_rep(should_clear, val, dem) {
  console.log("making bubbles");
  if (should_clear == true) {
    d3.selectAll("circle").remove();
  }
  var margin = {top: 50, right: 100, bottom: 50, left: 50};
  var width = $("#bubbles").width() * 1.5;
  var height = $("#bubbles").height() / 2.5;

  pos = $("#bubbles").position().top;

  rad_range = get_rad_range(width)

  var x = d3.scaleLinear()
    .domain( [min_max[dem].min, min_max[dem].max] )
    .range( [margin.left, width - margin.right]);

  var radquantize = d3.scaleQuantize()
      .domain([min_max['pop'].min, min_max['pop'].max])
      .range(rad_range)

  d3.json("./bubble/dem-data.json", function(error, data) {
    if (error) throw error;

  var bubbles = d3.select("#bubbles").append("svg")
    .attr("width", width)
    .attr("height", height * 10)
    .attr("class", "bubble_svg")
    .attr("shape-rendering", "geometric-precision");


  var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-5, 0])
      .html(function(d) {
        return "County: " + toTitleCase(d.county) + " (" + d.sab + ")<br>Obesity Rate: " + d.obesity_rate + "<br>Population: " + numberWithCommas(d.pop) + "<br>Income: $" + numberWithCommas(d.income);
      })

  bubbles.call(tip);

  var y_dict = d3.map();
  y_pos = dem_pos[dem]
  y_pos.forEach( function(d){ y_dict.set(d.fips, 250 - d.y )});

  //add education metric
  var nodes = data.map(function(node, index) {
      return {
        index: index,
        fips: node.fips, 
        pop: node.pop_2019,
        income: node.median_income,
        county: node.county,
        sab: node.sab,
        unemp: unemp_dict.get(node.fips),
        cpr: childpov_dict.get(node.fips),
        smoke: smoke_dict.get(node.fips),
        exercise: exercise_dict.get(node.fips),
        drinking: drinking_dict.get(node.fips),
        x: x(get_node_x(dem, node)),
        fx: x(get_node_x(dem, node)),
        r: radquantize(node.pop_2019),
        y: y_dict.get(node.fips),
        obesity_rate: move_dict.get(node.fips)
      };
    });

    var circle = bubbles.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .style("fill", function(d) { return quantize(move_dict.get(d.fips)); })
      .attr("cy", function(d) { return d.x} )
      .attr("cx", function(d) { return d.y} )
      .attr("r", function(d) { return d.r} )
      // .style("opacity", function(d) {
        // return ((d.y + height/2) <= d.r || (d.y + height/2) >= (height - d.r)) ?  0 : 0.75})
      .style("opacity", 0.75)
      .attr("transform", "translate(" + width/3 + "," + height/2 + ")")
      .on("mouseover", function(d) {
        tip.show(d);
        handleHover(d.fips, true);})
      .on('mouseout', tip.hide)
      // .on('mouseover', function(d) {handleHover(d.fips);  tip.show })
      .on('click', function(d) { handleClick(d.fips) })

    // var simulation = d3.forceSimulation(nodes)
    // .force("x", d3.forceX(function(d) { return x(d.exercise); }).strength(1))
    // .force("y", d3.forceY((height/2)).strength(1))
    // .force("collide", d3.forceCollide().radius(function(d){ return d.r }))
    // .force("charge", d3.forceManyBody().strength(-2))

    // for (var i = 1000 - 1; i >= 0; i--) {
    //   simulation.tick()
    // }
    // pos_dict = [];
    // circle._groups[0].forEach( function(d){ 
    //   pos_dict.push(d.__data__)
    // });
    // console.log(JSON.stringify(pos_dict, null, 4));


    make_x_axis(dem)
      
    if (selected_fips != null)
      highlight_single(selected_fips);
  });

}
