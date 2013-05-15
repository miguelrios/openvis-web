var ScatterplotCanvas = function($node){
  var dataset = [];
  for(var i = 0; i < 100; i++){
    dataset.push({x: Math.random(), y:Math.random(), size: Math.random(), color: Math.random()*10});
  }
  dataset = dataset.sort(function(a,b){return b.size - a.size});
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = ($node.width() || $(window).width()) - margin.left - margin.right,
      height = ($node.height() || $(window).height()) - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([margin.left/2, width + margin.right/2])
      .domain([0,1]);

  var y = d3.scale.linear()
      .range([height, margin.top])
      .domain([0,1]);

  var radius = d3.scale.linear()
    .range([1,20])
    .domain([0,1]);
  
  x.domain(d3.extent(dataset, function(d) { return d.x; })).nice();
  y.domain(d3.extent(dataset, function(d) { return d.y; })).nice();
  radius.domain(d3.extent(dataset, function(d) { return d.size; })).nice();

  var color = d3.scale.category10();

  var canvas = d3.select($node.get(0)).append("canvas")
      .attr("width", Math.round(width + margin.left + margin.right) + "px")
      .attr("height", Math.round(height + margin.top + margin.bottom) + "px");

  var context = canvas[0][0].getContext('2d'); 
  //draw
  dataset.forEach(function(dot){
    var centerX = x(dot.x);
    var centerY = y(dot.y);
    var r = radius(dot.size);

    context.beginPath();
    context.arc(centerX, centerY + margin.top, r, 0, 2 * Math.PI, false);
    context.fillStyle = color(dot.color);
    context.fill();
  });
}