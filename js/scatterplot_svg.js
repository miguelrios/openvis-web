var ScatterplotSVG = function($node){
  var dataset = [];
  for(var i = 0; i < 100; i++){
    dataset.push({x: Math.random(), y:Math.random(), size: Math.random(), color: Math.random()*10});
  }
  dataset = dataset.sort(function(a,b){return b.size - a.size});
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = ($node.width() || $(window).width()) - margin.left - margin.right,
      height = ($node.height() || $(window).height()) - margin.top - margin.bottom + 5;

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0,1]);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0,1]);

  var radius = d3.scale.linear()
    .range([3,15])
    .domain([0,1]);
  
  x.domain(d3.extent(dataset, function(d) { return d.x; })).nice();
  y.domain(d3.extent(dataset, function(d) { return d.y; })).nice();
  radius.domain(d3.extent(dataset, function(d) { return d.size; })).nice();

  var color = d3.scale.category10();

  var svg = d3.select($node.get(0)).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);

  var dots = svg.selectAll(".dot")
      .data(dataset)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return x(d.x) + margin.left; })
      .attr("cy", function(d) { return y(d.y) + margin.bottom; })
      .attr("r", function(d){return radius(d.size);})
      .style("fill", function(d) { return color(d.color); })
}