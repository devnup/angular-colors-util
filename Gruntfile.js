module.exports = function (grunt) {

  // Get snippet information from package.json
  var pkg = grunt.file.readJSON('package.json');

  // Fancy way to always create a file as as [package[name]].css
  var constructor = function (origin, dest) {
    var obj = {};
    obj[dest] = [origin];
    return obj;
  };

  grunt.initConfig({

    pkg: pkg,

    concat: {
      lib: {
        src: ['lib/src/js/**.js'],
        dest: 'lib/dist/js/' + pkg.name + '.js'
      }
    },

    uglify: {
      minify: {
        files: (function () {

          // Files path
          var origin = 'lib/dist/js/**.js';
          var dest = 'lib/dist/js/' + pkg.name + '.min.js';

          // Fancy way to always create a file as as [package[name]].css
          return constructor(origin, dest);

        })()
      }
    },

    less: {

      lib: {
        options: {
          paths: ['lib/src/less']
        },
        files: (function () {

          // Files path
          var origin = 'lib/src/less/**.less';
          var dest = 'lib/dist/css/' + pkg.name + '.css';

          // Fancy way to always create a file as as [package[name]].css
          return constructor(origin, dest);

        })()
      },

      assets: {
        options: {
          paths: ['lib/assets/less']
        },
        files: {
          'lib/assets/css/style.css': 'lib/assets/less/**.less'
        }
      }
    },

    cssmin: {
      lib: {
        files: (function () {

          // Files path
          var origin = 'lib/dist/css/' + pkg.name + '.css';
          var dest = 'lib/dist/css/' + pkg.name + '.min.css';

          // Fancy way to always create a file as as [package[name]].css
          return constructor(origin, dest);

        })()
      },
      assets: {
        files: {
          'lib/assets/css/style.min.css': ['lib/assets/css/style.css']
        }
      }
    },

    clean: ["lib/dist/", "lib/assets/css/"],

    watch: {
      files: ['lib/**'],
      tasks: ['dev']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('dev', ['clean', 'concat', 'uglify', 'less', 'cssmin']);
  grunt.registerTask('default', ['dev']);
};