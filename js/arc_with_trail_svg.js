var ArcWithTrailSVG = function($node){
  var sin_factor = function sin_factor(min, max, current, max_shift){
    var shift = max_shift;
    var num = (current - min);
    var den = (max - min);
    var x = Math.PI*(num/den);
    var sin = Math.sin(x);
    return sin;
  }
  var margin = {top: 20, right: 20, bottom: 50, left: 50},
     width = ($node.width() || $(window).width()) - margin.left - margin.right,
      height = ($node.height() || $(window).height()) - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0,1]);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0,1]);

  var color = d3.scale.category20c();
  var svg = d3.select($node.get(0)).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (margin.left/2 + width/2) + "," + margin.top + ")");

  // var dot = svg
  // .append("circle")
  //   .attr("class", "dot")
  //   .attr("cx", function(d) { return x(-.5)})
  //   .attr("cy", function(d) { return y(0) - margin.bottom; })
  //   .attr("r", 10)
  //   .style("fill","#1f77b4")
  //   .style("fill-opacity",0.5);
  var index = 0;
  var endArc = 5;
  var drawArc = function drawArc(c, end){
    var newX = x(.5);
    var interval = setInterval(function(){
    svg.append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { 
        newX = newX - 10;
        return newX;
      })
      .attr("cy", function(d) { 
        var currX = x.invert($(this).attr("cx"));
        var currY = Math.cos(currX*Math.PI)/2*(end*2);
        return  y(currY) - margin.bottom;
      }).attr("r", 5)
      .style("fill",c)
    if(x.invert(newX) <= -0.45){
      clearInterval(interval);
      if(index < 10)
        drawArc(color(index++), endArc--/10); 
    }
  }, 50);
  }
  drawArc(color(index++), endArc--/10);
}