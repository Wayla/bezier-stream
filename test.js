
var livebez = require('./index')
var count = 0


var opts = {
  id: 'test',
  lineColor: '#68bef3',
  lineWidth: '2px',
  domainWidth: 50,
  domainHeight: 1,
  clientWidth: 500,
  clientHeight: 100,
}

var s = livebez(opts)

s.on('data', function(d) {
  count++

  //
  // TODO: currently throwing into browser,
  // should set up a test here to measure correctness
  //
  console.log(count, d)
})

s.write([[0, 0.1], [1, 0.4], [2, 0.6], [3, 0.7]])
s.write([4, 0.8])
s.write([5, 0.9])
s.write([6, 0.5])
s.write([10, 1])
s.write([10, 0.1])

s.write([[11, 0.1], [12, 0.6], [40, 0.1]])
