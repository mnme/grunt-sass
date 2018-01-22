'use strict';
var path = require('path');
var sass = require('node-sass');

module.exports = function (grunt) {
	var options;

	/**
	 * A Promise wrapper around the render function of node-sass.
	 *
	 * @param {Object} options Options passed to node-sass
	 * @return {Object} A Promise
	 */
	const sassCompile = function (options) {
		return new Promise(function (resolve, reject) {
			sass.render(options, function (error, result) {
				if (error) {
					reject(error.formatted);
				} else {
					resolve(result);
				}
			});
		});
	};

	/**
	 * @param {string} to Output CSS path
	 * @param {Object} options Options passed to node-sass
	 * @return {Object} A Promise
	 */
	const sassWrite = function (to, options) {
		return sassCompile(options)
			.then(function (result) {
				grunt.file.write(to, result.css);
				if (options.sourceMap) {
					if (typeof options.sourceMap === 'string') {
						grunt.file.write(options.sourceMap, result.map);
					} else {
						grunt.file.write(to + '.map', result.map);
					}
				}
			});
	};

	grunt.verbose.writeln('\n' + sass.info + '\n');
	grunt.registerMultiTask('sass', 'Compile Sass to CSS', function () {
		options = this.options({
			precision: 10
		});
		Promise.all(this.files.map(function (f) {
			if (!f.dest) {
				grunt.log.warn('No destination file specified');
				return Promise.resolve();
			}
			var src = f.src.filter(function (filepath) {
				if (!grunt.file.exists(filepath)) {
					throw new Error('Source file ' + filepath + ' not found.');
				}
				if (path.basename(filepath)[0] === '_') {
					return false;
				}
				return true;
			});
			if (src.length === 0) {
				grunt.log.warn('No source files were found.');
				return Promise.resolve();
			}

			return Promise.all(src.map(function (srcpath) {
				return sassWrite(f.dest, Object.assign({}, options, {
					file: srcpath,
					outFile: f.dest
				}));
			}));
		})).catch(function (err) {
			grunt.log.error(err.formatted + '\n');
		});
	});
};
