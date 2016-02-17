var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var babel = require('gulp-babel')
var gulpMocha = require('gulp-mocha')

gulp.task('run', () => {
    return nodemon({
        script: 'api/app.js',
        ext: 'js',
        env: {
            PORT: 3000
        },
        ignore: ['./node_modules/**'],
        exec: 'babel-node'
    })
    .on('restart', () => {
        console.log("Eh yo I'm restarting")
    })
})

gulp.task('test', () => {
    gulp.src('./tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
})

gulp.task('default', ['run']);