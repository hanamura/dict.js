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

		watch:
			files: 'src/*.coffee'
			tasks: ['coffee:js', 'uglify:js']

	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-uglify'
	grunt.registerTask 'default', [
		'coffee:js',
		'uglify:js',
	]
