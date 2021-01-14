var dicts = []
var data_arr = [data_2011, data_2012, data_2013, data_2014, data_2015, data_2016, data_2017, data_2018, data_2019, data_2020]
data_arr.forEach( function(arr) {
  obese_dict = d3.map();
  arr.forEach(function(d) {
    obese_dict.set( d.FIPS, d.obesity_rate);
  });
  dicts.push(obese_dict);
});

function makeMap(us) {

    var val = document.getElementById("myRange").value;
    document.getElementById("year").innerHTML = years[val];
    // create different move dict depending on the slider val

    move_dict = dicts[val];
    
    var num_error_counties = 0;
    
    svg.append("g")
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
      .style("opacity", .95)
      .attr("fill", function(d) { 
        if (move_dict.get(d.id)) {
          return quantize(move_dict.get(d.id))
        } else {
          num_error_counties += 1;
          return;
        }; })
        .attr("d", path)
        .on("mouseover", function(d) {
          tip.show(d);
          handleHover(d.id, false);})
        .on("mouseout", tip.hide)
        .on("click", function(d) {handleClick(d.id)});

    console.log(num_error_counties);
  
    window.onclick = function(event) {
      if (event.target.id === "maps" || event.target.id === "bubbles")
        unhighlight();
    };
  
    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, 
          function(a, b) { return a !== b; }))
        .attr("class", "states")
        .attr("d", path);
  
    if (selected_fips != null)
      highlight_single(selected_fips);
  }
  
  function change_move() {
    unhighlight();

    var val = document.getElementById("myRange").value;
    document.getElementById("year").innerHTML = years[val];
    move_dict = dicts[val];
    var t = d3.transition()
        .duration(750);
  
      // call ready to create map again, based on slider value
      svg.selectAll("path")
        .transition(t)
          .attr("fill", function(d) {
            if (move_dict.get(d.id)) {
              return quantize(move_dict.get(d.id));
            }
        });
      var bubbles = d3.select(".bubble_svg")
      bubbles.selectAll("circle")
        .transition(t)
        .style("fill", function(d) { return quantize(move_dict.get(d.fips)); })
      // dem = $("input[name='dem_radio']:checked").val();
      // make_bubbles_rep(true, val, dem)
    }