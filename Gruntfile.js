module.exports = function (grunt) {

	// Задачи
	grunt.initConfig({
		// Склеиваем
		concat: {
			main: {
				src: [
					'dist/leaflet.js',
					'lib/requirejs/require.js',
					'js/geoMarker.js',
					'lib/jquery/jquery-ui-1.10.4.custom/js/jquery-1.10.2.js',
					'lib/jquery/jquery-ui-1.10.4.custom/js/jquery-ui-1.10.4.custom.js',
					'js/jquery-tpml.js',
					'js/EventBlock.js',
					'js/jquery.tinyscrollbar.js',
					'calendar_ru.js',
					'js/app.js',
					'calcTime.js',
					'js/dateTime.js',
					'vhide.js',
					'js/registerdevise.js',
					'clock.js',
					'js/geocoding.js'
				],
				dest: 'build/scripts.js'
			}
		},

		// Сжимаем
		uglify: {
			options: {
				//  sourceMap: true
			},
			main: {
				files: {
					// Результат задачи concat
					'build/scripts.min.js': '<%= concat.main.dest %>'
				}
			}
		},

		less: {
			development: {
				options: {
					compress: true,
					yuicompress: true,
					optimization: 2
					// sourceMap: true,
					//  sourceMapFilename: 'build/css.min.css.map',
					// sourceMapRootpath: '../'
				},
				files: {
					"module/dtp/dtp.css": "module/dtp/dtp.less",
					"build/css.css": [
						"css/leaflet.less",
						"lib/jquery/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.css",
						"dist/leaflet.css"
					]
				}
			},
			instruction: {
				options: {
					compress: true,
					yuicompress: true
				},
				files: {
					"build/instruction.css": [
						"css/animation.css",
						"css/instruction.less"
					]
				}
			}
		},
		'cssmin': {
			'dist': {
				'src': ['lib/jquery/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.css'],
				'dest': 'build/css.css'
			}
		},
		watch_: {
			styles: {
				// Which files to watch (all .less files recursively in the less directory)
				files: [
					'css/leaflet.less',
					'module/dtp/dtp.less',
					'lib/jquery/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.css'
				],
				tasks: ['less', 'cssmin'],
				options: {
					nospawn: true
				}
			}
		},
		watch: {
			styles: {
				// Which files to watch (all .less files recursively in the less directory)
				files: [
					'js/dateTime.js',
					'css/leaflet.less',
					'module/dtp/dtp.less',
					'lib/jquery/jquery-ui-1.10.4.custom/css/ui-lightness/jquery-ui-1.10.4.custom.css'

				],
				tasks: ['concat', 'uglify', 'less'],
				options: {
					nospawn: true
				}
			},
			stylesInstruction: {
				files: [
					"css/instruction.less"
				],
				tasks: ['less:instruction'],
				options: {
					nospawn: true
				}
			},
		}
	});

	// Загрузка плагинов, установленных с помощью npm install
	grunt.loadNpmTasks('grunt-contrib-concat');//
	grunt.loadNpmTasks('grunt-contrib-uglify');//
	grunt.loadNpmTasks('grunt-contrib-less');//
	grunt.loadNpmTasks('grunt-contrib-watch');//
	//grunt.loadNpmTasks('grunt-yui-compressor');

	// Задача по умолчанию
	grunt.registerTask('default', ['concat', 'uglify', 'less', 'less:instruction', 'watch']);

    grunt.registerTask('inn', ['less:instruction', 'watch:stylesInstruction']);
};