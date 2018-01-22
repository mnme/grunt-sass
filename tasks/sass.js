'use strict';
var path = require('path');
var eachAsync = require('each-async');
var assign = require('object-assign');
var sass = require('node-sass');

module.exports = function (grunt) {
	var options;
	grunt.verbose.writeln('\n' + sass.info + '\n');
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		options = this.options({
			precision: 10
		});
		eachAsync(this.files, function (f, i, next) {
			if (!f.dest) {
				grunt.log.error('No destination file specified');
				next();
				return;
			}
			var src = f.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file ' + filepath + ' not found.');
					return false;
				}
				if (path.basename(filepath)[0] === '_') {
					return false;
				}
				return true;
			});
			if (src.length === 0) {
				grunt.log.error('No source files were found.');
				next();
				return;
			}

			src.map(function (srcpath) {
				return sass.render(assign({}, options, {
					file: srcpath,
					outFile: f.dest
				}), function (err, res) {
					if (err) {
						grunt.log.error(err.formatted + '\n');
						grunt.warn('');
						next(err);
						return;
					}

					grunt.file.write(f.dest, res.css);

					if (options.sourceMap) {
						grunt.file.write(this.options.sourceMap, res.map);
					}

					next();
				});
			});
		}, this.async());
	});
};
