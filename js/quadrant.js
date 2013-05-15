var Quadrant = function($node){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = $(window).width() - margin.left - margin.right,
      height = $(window).height() - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0,1]);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0,1]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .tickValues([])
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(y)
    .tickValues([])
    .orient("left");
  
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (margin.left/2 + width/2) + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(" + (-(width/2)) + "," + height/2 + ")")
    .call(xAxis);

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
}