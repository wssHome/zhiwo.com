var gulp = require("gulp");
var sass = require('gulp-sass');//编译scss
var minifyCSS = require('gulp-minify-css'); //压 缩 CSS

gulp.task("css", function(){
	gulp.src("src/css/*.scss")
		.pipe(sass())//编译
//		.pipe(minifyCSS())
		.pipe(gulp.dest("src/css"))
});

// 监听:如果 件被修改，则执 相应任务
gulp.task("auto",function(){
	gulp.watch(["src/css/*.css","src/css/*.scss"], ["css"]);
})
