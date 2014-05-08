describe('noConflict', function() {
	it('noConflict', function() {
		expect(window.dict).to.be.an('object');
		expect(window.dict).to.have.ownProperty('Dict');
		expect(window.dict).to.have.ownProperty('DeepDict');
		var d_ = window.dict;
		var d = window.dict.noConflict();
		expect(window.dict).to.be.undefined;
		expect(d).to.equal(d_);
		expect(d).to.be.an('object');
		expect(d).to.have.ownProperty('Dict');
		expect(d).to.have.ownProperty('DeepDict');
	});
});
