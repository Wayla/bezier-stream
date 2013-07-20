
var livebez = require('./index')
var count = 0


var opts = {
  id: 'test',
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

s.write([[0, 0.1], [1, 0.4], [2, 0.6], [5, 0.7]])
s.write([8, 0.8])
s.write([10, 0.9])
s.write([12, 1])
s.write([14, 0.8])
s.write([15, 0.5])

s.write([[17, 0.4], [18, 0.4], [35, 0.5], [40, 0.1]])
