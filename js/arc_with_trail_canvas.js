var ArcWithTrailCanvas = function($node){
  var sin_factor = function sin_factor(min, max, current, max_shift){
    var shift = max_shift;
    var num = (current - min);
    var den = (max - min);
    var x = Math.PI*(num/den);
    var sin = Math.sin(x);
    return sin;
  }
  var margin = {top: 20, right: 30, bottom: 45, left: 50},
      width = ($node.width() || $(window).width()) - margin.left - margin.right,
      height = ($node.height() || $(window).height()) - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width])
      .domain([0,1]);

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0,1]);
  var color = d3.scale.category20c();
  var canvas = d3.select($node.get(0)).append("canvas")
      .attr("width", Math.round(width + margin.left + margin.right) + "px")
      .attr("height", Math.round(height + margin.top + margin.bottom) + "px");

  var context = canvas[0][0].getContext('2d'); 
  
  var index = 0;
  var endArc = 5;
  var drawArc = function drawArc(c, end){
    var newX = x(0);
    var interval = setInterval(function(){
      var centerX = newX + margin.right;
      var centerY = Math.sin(x.invert(newX)*Math.PI)/2*(end*2);
      centerY = y(centerY) - margin.top;
      context.beginPath();
      context.arc(centerX, centerY, 5, 0, 2 * Math.PI, false);
      context.fillStyle = c;
      context.fill();
      if(x.invert(newX) > 0.99){
        clearInterval(interval);
        if(index < 10)
          drawArc(color(index++), endArc--/10);
      }
      newX = newX + 10;
    }, 50);
  }
  drawArc(color(index++), endArc--/10);
}