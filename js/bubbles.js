var Bubbles = function($node){
  var dataset = [];
  for(var i = 0; i < 10; i++){
    dataset.push({x: Math.random(), y:Math.random(), size: Math.random(), color: Math.random()*10});
  }
  dataset = dataset.sort(function(a,b){return a.size - b.size});
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = $(window).width() - margin.left - margin.right,
      height = $(window).height() - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0,1]);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0,1]);

  var radius = d3.scale.linear()
    .range([1,5])
    .domain([0,1]);
  
  x.domain(d3.extent(dataset, function(d) { return d.x; })).nice();
  y.domain(d3.extent(dataset, function(d) { return d.y; })).nice();
  
  var color = d3.scale.category10();

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

  var svg = d3.select($node.get(0)).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var dots = svg.selectAll(".dot")
      .data(dataset)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d){return y(d.size);})
      .style("fill", function(d) { return color(d.color); })
      .style("fill-opacity", 0.5)
      .style("stroke", "black")
      .style("stroke-opacity", 1)
      .style("stroke-width", 5)
      .transition()
        .duration(30000)
        .attr("cx", function(d) { return $(this).attr("cx")*1+((Math.random() - 0.5)*2000) })
        .attr("cy", function(d) { return $(this).attr("cy")*1+((Math.random() - 0.5)*2000) })
        .attr("r", function(d) { return $(this).attr("r")*1+((Math.random() - 0.5)*500)})
}