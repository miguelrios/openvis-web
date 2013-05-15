var ScatterplotDiv= function($node){
  var dataset = [];
  for(var i = 0; i < 100; i++){
    dataset.push({x: Math.random(), y:Math.random(), size: Math.random(), color: Math.random()*10});
  }
  dataset = dataset.sort(function(a,b){return b.size - a.size});
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = ($node.width() || $(window).width()) - margin.left - margin.right,
      height = ($node.height() || $(window).height()) - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0,1]);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0,1]);

  var radius = d3.scale.linear()
    .range([1,20])
    .domain([0,1]);
  
  x.domain(d3.extent(dataset, function(d) { return d.x; })).nice();
  y.domain(d3.extent(dataset, function(d) { return d.y; })).nice();
  radius.domain(d3.extent(dataset, function(d) { return d.size; })).nice();

  var color = d3.scale.category10();

  var parent = d3.select($node.get(0)).append("div")
      .style("width", Math.round(width + margin.left + margin.right) + "px")
      .style("height", Math.round(height + margin.top + margin.bottom) + "px")
      .style("position", "relative")
    
  var dots = parent.selectAll(".dot")
      .data(dataset)
    .enter().append("div")
      .attr("class", "dot")
      .style("left", function(d) { return Math.round(x(d.x)) + "px"; })
      .style("top", function(d) { return Math.round(y(d.y)) + margin.top + "px"; })
      .style("height", function(d){return Math.round(radius(d.size)*1.5) + "px";})
      .style("width", function(d){return Math.round(radius(d.size)*1.5) + "px";})
      .style("background-color", function(d) { return color(d.color); })
      .style("border-radius", "1000px")
      .style("position", "absolute");
}