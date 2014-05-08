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

		mocha:
			test:
				src: 'test/**/*.html'
				options:
					run: true
					reporter: 'Spec'

		watch:
			files: [
				'src/*.coffee'
				'test/*'
			]
			tasks: [
				'coffee:js'
				'uglify:js'
				'mocha:test'
			]

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-mocha'
	grunt.registerTask 'default', [
		'coffee:js'
		'uglify:js'
		'mocha:test'
	]
