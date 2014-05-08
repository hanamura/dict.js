describe('requirejs', function() {
	it('pollution free', function() {
		expect(window.dict).to.be.undefined;
	});

	it('load with requirejs', function(done) {
		require.config({
			paths: {'dict': '../dict'}
		})(['dict'], function(dict) {
			expect(dict).to.be.an('object');
			expect(dict).to.have.ownProperty('Dict');
			expect(dict).to.have.ownProperty('DeepDict');
			done();
		});
	});
});
