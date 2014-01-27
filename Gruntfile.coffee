module.exports = (grunt) ->
	grunt.initConfig
		coffee:
			js:
				src: 'src/*.coffee'
				dest: 'dict.js'

		uglify:
			js:
				src: 'dict.js'
				dest: 'dict.min.js'

		mochaTest:
			test:
				options:
					reporter: 'spec'
				src: 'test/*.coffee'

		watch:
			files: 'src/*.coffee'
			tasks: [
				'coffee:js',
				'uglify:js',
				'mochaTest:test',
			]

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-mocha-test'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.registerTask 'default', [
		'coffee:js',
		'uglify:js',
		'mochaTest:test',
	]
