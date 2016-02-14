var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var babel = require('gulp-babel')

gulp.task('run', function() {
    return nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**'],
        exec: 'babel-node'
    })
    .on('restart', function() {
        console.log("Eh yo I'm restarting")
    })
})

gulp.task('default', ['run']);