# grunt-sass [![Build Status](https://travis-ci.org/sindresorhus/grunt-sass.svg?branch=master)](https://travis-ci.org/sindresorhus/grunt-sass)

[<img src="https://rawgit.com/sass/node-sass/master/media/logo.svg" width="150" align="right">](https://github.com/sass/node-sass)

> Compile Sass to CSS using [node-sass](https://github.com/sass/node-sass)

Forked from [sindresorhus/grunt-sass](https://github.com/sindresorhus/grunt-sass) to add some tweaks that I needed. See commit history for details.

This task uses [libsass](http://libsass.org), which is a Sass compiler in C++. It's a lot faster than the original Ruby compiler and [fully compatible](http://sass-compatibility.github.io/).

## Install

```
$ npm install --save-dev grunt-sass
```

```
$ yarn add --dev grunt-sass
```


## Usage

```js
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

grunt.initConfig({
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'main.css': 'main.scss'
            }
        }
    }
});

grunt.registerTask('default', ['sass']);
```

Files starting with `_` are ignored to match the expected [Sass partial behaviour](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#partials).


## Options

See the `node-sass` [options](https://github.com/sass/node-sass#options), except for `file`, `outFile`, `success`, `error`.

The default value for the `precision` option is `10`, so you don't have to change it when using Bootstrap.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
