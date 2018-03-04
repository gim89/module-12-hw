const   gulp         = require('gulp'),
        babel        = require('gulp-babel'),
        con          = require('gulp-concat'),
        ugl          = require('gulp-uglifyjs'),
        browserSync  = require('browser-sync').create(),
        del          = require('del');

gulp.task('js', function () {
    return gulp.src('src/js/*.js')
                .pipe(
                    babel({
                        presets: ["env"]
                    })
                )
                .pipe(con('all.js'))
                .pipe(ugl('all.min.js'))
                .pipe(gulp.dest('dist/js'))
                .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['js'], browserSync.reload)
});

gulp.task('del', function () {
    return del.sync('dist/*');
})

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        notify: false
    });
});

gulp.task('start', ['del', 'js', 'server', 'watch']);
