describe('Dict', function() {
	var k_a = [],
		k_b = {},
		k_c = '',
		d = null;

	beforeEach(function() {
		d = new dict.Dict();
	});

	it('initial length', function() {
		expect(d.len()).to.equal(0);
	});

	it('length', function() {
		d.set(k_a, 'a');
		d.set(k_b, 'b');
		d.set(k_c, 'c');
		expect(d.len()).to.equal(3);
	});

	it('set/get', function() {
		d.set(k_a, 'a');
		expect(d.get(k_a)).to.equal('a');
	});

	it('set same key twice', function() {
		d.set(k_a, 'a');
		d.set(k_a, 'b');
		expect(d.len()).to.equal(1);
		expect(d.get(k_a)).to.equal('b');
	});

	it('delete', function() {
		d.set(k_a, 'a');
		d.del(k_a);
		expect(d.get(k_a)).to.be.undefined;
	});

	it('delete all', function() {
		d.set(k_a, 'a');
		d.set(k_b, 'b');
		d.set(k_c, 'c');
		d.del(k_a);
		d.del(k_b);
		d.del(k_c);
		expect(d.len()).to.equal(0);
	});

	it('has', function() {
		d.set(k_a, 'a');
		expect(d.has(k_a)).to.be.true;
		d.del(k_a);
		expect(d.has(k_a)).to.be.false;
	});

	it('clear', function() {
		d.set(k_a, 'a');
		d.set(k_b, 'b');
		d.set(k_c, 'c');
		d.clear();
		expect(d.len()).to.equal(0);
	});

	it('keys', function() {
		d.set(k_a, 'a');
		d.set(k_b, 'b');
		d.set(k_c, 'c');
		expect(d.keys().sort()).to.eql([k_a, k_b, k_c].sort());
	});

	it('values', function() {
		d.set(k_a, 'a');
		d.set(k_b, 'b');
		d.set(k_c, 'c');
		expect(d.vals().sort()).to.eql(['a', 'b', 'c'].sort());
	});

	it('each', function() {
		d.set(k_a, 'a');
		d.set(k_b, 'b');
		d.set(k_c, 'c');
		var c = 0;
		d.each(function(k, v) {
			expect([k_a, k_b, k_c].indexOf(k)).to.not.equal(-1);
			expect(['a', 'b', 'c'].indexOf(v)).to.not.equal(-1);
			expect([k_a, k_b, k_c].indexOf(k)).to.equal(['a', 'b', 'c'].indexOf(v));
			c++;
		});
		expect(c).to.equal(3);
	});

	it('map', function() {
		d.set(k_a, 'a');
		d.set(k_b, 'b');
		d.set(k_c, 'c');
		expect(d.map(function(k, v) { return k }).sort()).to.eql([k_a, k_b, k_c].sort());
		expect(d.map(function(k, v) { return v }).sort()).to.eql(['a', 'b', 'c'].sort());
	});
});

describe('DeepDict', function() {
	var k_a = [],
		k_b = {},
		k_c = '',
		d = null;

	beforeEach(function() {
		d = new dict.DeepDict();
	});

	it('initial length', function() {
		expect(d.len()).to.equal(0);
	});

	it('length', function() {
		d.set([k_a], 'a');
		d.set([k_a, k_b], 'b');
		d.set([k_a, k_b, k_c], 'c');
		expect(d.len()).to.equal(3);
	});

	it('set/get', function() {
		d.set([k_a, k_b, k_c], 'a');
		expect(d.get([k_a, k_b, k_c])).to.equal('a');
	});

	it('set same key twice', function() {
		d.set([k_a, k_b, k_c], 'a');
		d.set([k_a, k_b, k_c], 'b');
		expect(d.len()).to.equal(1);
		expect(d.get([k_a, k_b, k_c])).to.equal('b');
	});

	it('delete', function() {
		d.set([k_a, k_b, k_c], 'a');
		d.del([k_a, k_b, k_c]);
		expect(d.get([k_a, k_b, k_c])).to.be.undefined;
	});

	it('delete all', function() {
		d.set([k_a], 'a');
		d.set([k_a, k_b], 'b');
		d.set([k_a, k_b, k_c], 'c');
		d.del([k_a]);
		d.del([k_a, k_b]);
		d.del([k_a, k_b, k_c]);
		expect(d.len()).to.equal(0);
	});

	it('has', function() {
		d.set([k_a, k_b, k_c], 'a');
		expect(d.has([k_a, k_b, k_c])).to.be.true;
		d.del([k_a, k_b, k_c]);
		expect(d.has([k_a, k_b, k_c])).to.be.false;
	});

	it('clear', function() {
		d.set([k_a], 'a');
		d.set([k_a, k_b], 'b');
		d.set([k_a, k_b, k_c], 'c');
		d.clear();
		expect(d.len()).to.equal(0);
	});

	it('each', function() {
		d.set([k_a], 'a');
		d.set([k_a, k_b], 'b');
		d.set([k_a, k_b, k_c], 'c');
		var c = 0;
		d.each(function(ks, v) {
			expect(ks.indexOf(k_a)).to.equal(0);
			expect(ks.length).to.be.within(1, 3);
			expect(['a', 'b', 'c'].indexOf(v)).to.not.equal(-1);
			c++;
		});
		expect(c).to.equal(3);
	});
});
