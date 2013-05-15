/*global Float32Array:true*/

var ScatterplotWebGL = function($node){
  var points = 100,
      positions = new Float32Array(points * 3),
      colors = new Float32Array(points * 3),
      category10 = [[0.12156862745098039,0.4666666666666667,0.7058823529411765],[1,0.4980392156862745,0.054901960784313725],[0.17254901960784313,0.6274509803921569,0.17254901960784313],[0.8392156862745098,0.15294117647058825,0.1568627450980392],[0.5803921568627451,0.403921568627451,0.7411764705882353],[0.5490196078431373,0.33725490196078434,0.29411764705882354],[0.8901960784313725,0.4666666666666667,0.7607843137254902],[0.4980392156862745,0.4980392156862745,0.4980392156862745],[0.7372549019607844,0.7411764705882353,0.13333333333333333],[0.09019607843137255,0.7450980392156863,0.8117647058823529]],
      rnd = Math.random,
      rndi = function() { return (Math.random() - 0.5) * 2; },
      i, index, colorIndex;

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = ($node.width() || $(window).width()) - margin.left - margin.right,
      height = ($node.height() || $(window).height()) - margin.top - margin.bottom;

  for(var i = 0; i < points; i++) {
    index = i * 3;
    positions[index] = rndi() * 0.85;
    positions[index + 1] = rndi() * 0.8;
    positions[index + 2] = rnd();
    colorIndex = Math.floor(rnd() * 10);
    colors[index] = category10[colorIndex][0];
    colors[index + 1] = category10[colorIndex][1];
    colors[index + 2] = category10[colorIndex][2];
  }

  var canvas = d3.select($node.get(0)).append("canvas")
      .attr("id", "webgl_canvas")
      .attr("width", Math.round(width + margin.left + margin.right))
      .attr("height", Math.round(height + margin.top + margin.bottom));

  PhiloGL('webgl_canvas', {
    program: {
      from: 'ids',
      vs: 'vertex-shader',
      fs: 'fragment-shader'
    },
    textures: {
      src: ['img/circle.gif'],
      parameters: [{
        name: 'TEXTURE_MAG_FILTER',
        value: 'LINEAR'
      }, {
        name: 'TEXTURE_MIN_FILTER',
        value: 'LINEAR',
        generateMipmap: false
      }]
    },
    onError: function() {
      console.warn('error!', arguments, this);
    },
    onLoad: function(app) {
      var gl = app.gl, program = app.program;

      program.setBuffers({
        position: {
          value: positions,
          size: 3
        },
        color: {
          value: colors,
          size: 3
        }
      });

      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      program.setTexture('img/circle.gif', true);
      program.setUniform('sampler1', 0);
      gl.drawArrays(gl.POINTS, 0, points);
    }
  });

}


