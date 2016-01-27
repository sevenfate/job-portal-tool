module.exports = function (grunt) {
    grunt.initConfig({

        config: {
            dist: 'dist'
        },

        execute: {
            target: {
                src: ['script/web-server.js']
            }
        },

        clean: {
            compile: {
                src: ['<%= config.dist %>']
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'app/js/',
                    src: ['**'],
                    dest: '<%= config.dist %>/script/'
                },
                    {
                        expand: true,
                        cwd: 'app/css/',
                        src: ['**'],
                        dest: '<%= config.dist %>/style/'
                    },
                    {
                        expand: true,
                        cwd: 'app/img/',
                        src: ['**'],
                        dest: '<%= config.dist %>/img/'
                    },
                    {
                        expand: true,
                        cwd: 'app/',
                        src: ['**/*.html'],
                        dest: '<%= config.dist %>'
                    }
                ]
            }
        },

        maven: {
            install: {
                options: {
                    injectDestFolder: false,
                    goal: 'install',
                    groupId: 'de.seven.fate',
                    type: 'zip'
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/',
                    src: ['**/*'],
                    dest: ''
                }]
            }
        },

        express: {
            options: {
                background: true,
                port: 8000
            },
            test: {
                options: {
                    script: 'script/web-server.js'
                }
            }
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-maven-tasks');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('server', ['execute']);
    grunt.registerTask('install', ['clean', 'test', 'copy', 'maven:install']);
    grunt.registerTask('test', ['express:test:start', 'karma', 'express:test:stop']);


};