
function makeMap(us) {
    var val = document.getElementById("myRange").value;
    document.getElementById("year").innerHTML = years[val-1];
    // create different move dict depending on the slider val
    move_dict = d3.map();
    if (val == 1) { data_2011.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 2) { data_2012.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 3) { data_2013.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 4) { data_2014.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 5) { data_2015.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 6) { data_2016.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 7) { data_2017.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 8) { data_2018.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 9) { data_2019.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    else if (val == 10) { data_2020.forEach( function(d){ move_dict.set( d.FIPS, d.obesity_rate) }); }
    
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
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .on("click", function(d) {handleClick(d.id)});
  
    window.onclick = function(event) {
      if (event.target.id === "maps")
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
  
  
  
  
  function addDropdown(fips) {
    $( ".dropbtn" ).show();
    $( ".dropdown" ).show();
    s = "";
    var valid = new Array();
    for (i = 0; i < fips.length; i++) {
      if (cases_dict.get(fips[i])) {
        s += "<a href='#' id='county" + i + "'></a>";
        valid.push(i);
      }
    }
    console.log(valid.length + "valid fipses");
    document.getElementsByClassName("dropdown-content")[0].innerHTML = s;
    var curr_fips, curr_state;
    for (i = 0; i < valid.length; i++) {
      curr_fips = fips[valid[i]];
      curr_state = states_dict.get(curr_fips);
      $("#county" + valid[i]).html(curr_state);
    }
  
    $(document).ready(function() {
      $("a").click(function(event) {
        $( ".dropdown" ).hide();
        targ = event.target.id;
        console.log(fips[targ.slice(6)]);
        fips_q = fips[targ.slice(6)];
        highlight_single(fips_q);
        displayBar(fips_q);
      })
    })
  }

  
function swapMap(us) {
    var save_fips = selected_fips;
    unhighlight();
    // bubbles are hidden, toggle to bubbles
    if(document.getElementById("toggleButton").value=="MAP"){
      document.getElementById("toggleButton").innerHTML = "Back to the map";
      document.getElementById("toggleButton").value="BUBBLE";
      $( "#dem_options" ).show();
      $("#bubbles").css("visibility", "visible"); 
      $("#dem_options").css("visibility", "visible")
      $("#maps").css("visibility", "hidden");
      $("#maps").empty();
  
      var val = document.getElementById("myRange").value;
      dem = $("input[name='dem_radio']:checked").val();
      make_bubbles_rep(us, val, dem)
      if (selected_fips != null)
        highlight_single(selected_fips);
    } 
    // map is hidden, toggle to map
    else {
      document.getElementById("toggleButton").value="MAP";
      $( "#dem_options" ).hide();
      document.getElementById("toggleButton").innerHTML = "Switch to Demographic Trends";
      $("#bubbles").css("visibility", "hidden"); 
      $("#maps").css("visibility", "visible");
      $("#maps").empty();
      $("#dem_options").css("visibility", "hidden")
      makeMap(us);
    }
    selected_fips = save_fips;
    if (selected_fips != null)
      highlight_single(selected_fips);
  }
  