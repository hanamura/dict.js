dict = require '../src/dict'
chai = require 'chai'
chai.should()

describe 'Dict', ->
	k_a = []
	k_b = {}
	k_c = ''
	d = null

	beforeEach ->
		d = new dict.Dict

	it 'initial length', ->
		d.len().should.equal 0

	it 'length', ->
		d.set k_a, 'a'
		d.set k_b, 'b'
		d.set k_c, 'c'
		d.len().should.equal 3

	it 'set/get', ->
		d.set k_a, 'a'
		d.get(k_a).should.equal 'a'

	it 'set same key twice', ->
		d.set k_a, 'a'
		d.set k_a, 'b'
		d.len().should.equal 1
		d.get(k_a).should.equal 'b'

	it 'delete', ->
		d.set k_a, 'a'
		d.del k_a
		chai.should(d.get(k_a)).equal undefined

	it 'delete all', ->
		d.set k_a, 'a'
		d.set k_b, 'b'
		d.set k_c, 'c'
		d.del k_a
		d.del k_b
		d.del k_c
		d.len().should.equal 0

	it 'has', ->
		d.set k_a, 'a'
		d.has(k_a).should.be.true
		d.del k_a
		d.has(k_a).should.be.false

	it 'clear', ->
		d.set k_a, 'a'
		d.set k_b, 'b'
		d.set k_c, 'c'
		d.clear()
		d.len().should.equal 0

	it 'keys', ->
		d.set k_a, 'a'
		d.set k_b, 'b'
		d.set k_c, 'c'
		d.keys().sort().should.eql [k_a, k_b, k_c].sort()

	it 'values', ->
		d.set k_a, 'a'
		d.set k_b, 'b'
		d.set k_c, 'c'
		d.vals().sort().should.eql ['a', 'b', 'c'].sort()

	it 'each', ->
		d.set k_a, 'a'
		d.set k_b, 'b'
		d.set k_c, 'c'
		c = 0
		d.each (k, v) ->
			[k_a, k_b, k_c].indexOf(k).should.not.be.below 0
			['a', 'b', 'c'].indexOf(v).should.not.be.below 0
			[k_a, k_b, k_c].indexOf(k).should.equal ['a', 'b', 'c'].indexOf(v)
			c++
		c.should.equal 3

	it 'map', ->
		d.set k_a, 'a'
		d.set k_b, 'b'
		d.set k_c, 'c'
		(d.map (k, v) -> k).sort().should.eql [k_a, k_b, k_c].sort()
		(d.map (k, v) -> v).sort().should.eql ['a', 'b', 'c'].sort()

describe 'DeepDict', ->
	k_a = []
	k_b = {}
	k_c = ''
	d = null

	beforeEach ->
		d = new dict.DeepDict

	it 'initial length', ->
		d.len().should.equal 0

	it 'length', ->
		d.set [k_a], 'a'
		d.set [k_a, k_b], 'b'
		d.set [k_a, k_b, k_c], 'c'
		d.len().should.equal 3

	it 'set/get', ->
		d.set [k_a, k_b, k_c], 'a'
		d.get([k_a, k_b, k_c]).should.equal 'a'

	it 'set same key twice', ->
		d.set [k_a, k_b, k_c], 'a'
		d.set [k_a, k_b, k_c], 'b'
		d.len().should.equal 1
		d.get([k_a, k_b, k_c]).should.equal 'b'

	it 'delete', ->
		d.set [k_a, k_b, k_c], 'a'
		d.del [k_a, k_b, k_c]
		chai.should(d.get([k_a, k_b, k_c])).equal undefined

	it 'delete all', ->
		d.set [k_a], 'a'
		d.set [k_a, k_b], 'b'
		d.set [k_a, k_b, k_c], 'c'
		d.del [k_a]
		d.del [k_a, k_b]
		d.del [k_a, k_b, k_c]
		d.len().should.equal 0

	it 'has', ->
		d.set [k_a, k_b, k_c], 'a'
		d.has([k_a, k_b, k_c]).should.be.true
		d.del [k_a, k_b, k_c]
		d.has([k_a, k_b, k_c]).should.be.false

	it 'clear', ->
		d.set [k_a], 'a'
		d.set [k_a, k_b], 'b'
		d.set [k_a, k_b, k_c], 'c'
		d.clear()
		d.len().should.equal 0

	it 'each', ->
		d.set [k_a], 'a'
		d.set [k_a, k_b], 'b'
		d.set [k_a, k_b, k_c], 'c'
		c = 0
		d.each (ks, v) ->
			ks.indexOf(k_a).should.equal 0
			ks.length.should.be.within 1, 3
			['a', 'b', 'c'].indexOf(v).should.not.below 0
			c++
		c.should.equal 3
