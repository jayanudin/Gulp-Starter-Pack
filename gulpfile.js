var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglifyjs');
var browserSync = require('browser-sync');


gulp.task('sass', function() {
  return gulp.src('app/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('uglify', function() {
  gulp.src('app/js/app.js')
    .pipe(uglify('app.min.js', {
      outSourceMap: true
    }))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  })
})

gulp.task('watch', ['browserSync', 'sass', 'uglify'], function() {
  gulp.watch('app/scss/styles.scss', ['sass']);
  gulp.watch('app/js/app.js', ['uglify']);
});