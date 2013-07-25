
var Stream = require('stream')

var d3 = require('d3')
var through = require('through')
var parse = require('event-stream').parse

var livebezier = function(opts) {

  var stream = new Stream
  stream.writable = true

  var svg = d3
    .select('body')
      .append('svg')

  svg
    .attr('id', 'background')
    .attr('width', opts.clientWidth)
    .attr('height', opts.clientHeight)

  var p = svg.append('path')

  stream.vectors = []

  function write(data) {
    data = data || []
 
    if (typeof data[0] !== 'number') {
      for (var i = 0, l = data.length; i < l; i++) {
        stream.vectors.push(data[i])
      }
    }
    else {
      stream.vectors.push(data)
    }
 
    var x = d3
      .scale
      .linear()
      .domain([0, opts.domainWidth])
      .range([0, opts.clientWidth])
    ;

    var y = d3
      .scale
      .linear()
      .domain([0, opts.domainHeight])
      .range([opts.clientHeight, 0])
    ;

    p
      .datum(stream.vectors)
      .attr('d', d3
        .svg
        .line()
        .interpolate('basis')
        .x(function(d) { return x(d[0]); })
        .y(function(d) { return y(d[1]); })
      )
    ;

    this.queue(d3.select('path').attr('d'))
  }
  var ts = through(write)

  ts.vectors = stream.vectors
  ts.write = write

  return stream
    .pipe(parse())
    .pipe(ts)
}

module.exports = livebezier
