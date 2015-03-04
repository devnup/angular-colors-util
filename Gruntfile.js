module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                src: 'src/angular-colors-util.js',
                dest: 'dist/js/angular-colors-util.js'
            }
        },

        uglify: {
            minify: {
                files: {
                    'dist/js/angular-colors-util.min.js': ['dist/js/angular-colors-util.js']
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ['src/assets/less']
                },
                files: {
                    'dist/css/style.css': 'src/assets/less/**.less'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'dist/css/style.min.css': ['dist/css/style.css']
                }
            }
        },

        clean: ["dist/"],

        watch: {
            files: ['src/**'],
            tasks: ['dev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dev', ['clean', 'copy', 'uglify', 'less', 'cssmin']);
    grunt.registerTask('default', ['dev']);
};