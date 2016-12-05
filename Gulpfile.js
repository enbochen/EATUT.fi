var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    rev = require('gulp-rev'),
    revDel = require('rev-del'),
    connect = require('gulp-connect');
    
gulp.task('build', function() {
    gulp.src('img/*')
        .pipe(gulp.dest('build/img/'));
        
    gulp.src('index.html')
        .pipe(usemin({
            css: [autoprefixer(), minifyCss(), 'concat', rev()],
            js: [uglify(), 'concat', rev()]
        }))
        .pipe(gulp.dest('build/'))
        .pipe(rev.manifest())
        .pipe(revDel({dest: 'build/'}))
        .pipe(gulp.dest('build/'));
});

gulp.task('serveprod', function() {
  connect.server({
    root: './',
    port: process.env.PORT || 8080, 
    livereload: false
  });
});
    