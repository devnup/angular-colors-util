module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        copy: {
            main: {
                src: 'src/angular-colors-util.js',
                dest: 'src/dist/js/angular-colors-util.js'
            }
        },

        uglify: {
            minify: {
                files: {
                    'src/dist/js/angular-colors-util.min.js': ['src/dist/js/angular-colors-util.js']
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ['src/assets/less']
                },
                files: {
                    'src/assets/css/style.css': 'src/assets/less/**.less'
                }
            }
        },

        cssmin: {
            target: {
                files: {
                    'src/assets/css/style.min.css': ['src/dist/css/style.css']
                }
            }
        },

        clean: ["src/dist/", "src/assets/css/"],

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