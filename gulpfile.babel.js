import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import babel from 'gulp-babel'
import gulpMocha from 'gulp-mocha'
import env from 'gulp-env'

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
    env({vars: {ENV:'Test'}})
    gulp.src('./tests/*.js', {read: false})
        .pipe(gulpMocha({reporter: 'nyan'}))
})

gulp.task('default', ['run']);