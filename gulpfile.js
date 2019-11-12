var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');

gulp.task('fileinclude',function() {
  return gulp.src(['./assets/parts/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('.'));
});



gulp.watch(['*.js',"assets/"],gulp.parallel(["fileinclude"]));