var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/Nutrition__Physical_Activity__and_Obesity_-_Youth_Risk_Behavior_Surveillance_System.csv", function(error, data) {
  
  
  x.domain(data.map(function(d) { 
    if (d.Topic == "Obesity / Weight Status") {
        return d['Race/Ethnicity']; }}
    ));
    
  y.domain([0, d3.max(data, function(d) { 
    if (d.Topic == "Obesity / Weight Status") {
        return d.Data_Value; 
    }})]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", "steelblue")
      .attr("x", function(d) { 
        if (d.Topic == "Obesity / Weight Status") {
            return d['Race/Ethnicity']; }}
      )
      .attr("width", x.rangeBand())
      .attr("y", function(d) {     
        if (d.Topic == "Obesity / Weight Status") {
            return d.Data_Value; 
        }})
      .attr("height", function(d) { 
        if (d.Topic == "Obesity / Weight Status") {
            return d.Data_Value; 
        }});

});