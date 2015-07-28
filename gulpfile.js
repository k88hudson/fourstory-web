var gulp = require('gulp');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var server = require('gulp-server-livereload');
var cssnext = require('gulp-cssnext');
 
gulp.task('webserver', function() {
  gulp.src('dist')
    .pipe(server({
      livereload: true,
      open: true
    }));
});

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(watch('src/css/*.css'))
    .pipe(cssnext())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('babel', function(){
	return gulp.src('src/js/*.js')
	.pipe(watch('src/js/*.js'))
	.pipe(babel())
	.pipe(rename({
		extname: ".js"
	}))
	.pipe(gulp.dest('dist/js'));
});

gulp.task('html', function(){
	return gulp.src('src/**/*.html')
	.pipe(watch('src/**/*.html'))
	.pipe(gulp.dest('dist'));
})

gulp.task('default', ['watch','webserver']);
gulp.task('watch',['css','babel','html']);
gulp.task('build', function(){
	gulp.src('src/css/*.css').pipe(cssnext())
    .pipe(gulp.dest('dist/css'));
    gulp.src('src/js/*.js').pipe(babel())
	.pipe(rename({
		extname: ".js"
	}))
	.pipe(gulp.dest('dist/js'));
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'));
});