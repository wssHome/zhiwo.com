/*	
	src 指来源
	pipe 指管道
	dest 指目标
*/
var gulp = require("gulp");
var babel = require("gulp-babel");//转es5 
var es2015 = require("babel-preset-es2015");//转es5 
/*
//js文件合并  并非模块化合并
var concat = require('gulp-concat'); // 合并
var uglify = require('gulp-uglify'); // js压缩
gulp.task("js",function(){
	gulp.src("src/js/index.js")
		.pipe( babel({presets:[es2015]}) ) //转码
//		.pipe( concat("drog.js") ) //合并
		.pipe( uglify() )  //压缩
		.pipe( gulp.dest("dist/js") ) // 创建文件
});
*/

// 编译scss
var sass = require('gulp-sass');//编译scss
var minifyCSS = require('gulp-minify-css'); //压 缩 CSS

gulp.task("css", function(){
	gulp.src("src/css/index.scss")
		.pipe(concat("index.min.css"))//合并
		.pipe(sass())//编译
		.pipe(minifyCSS())
		.pipe(gulp.dest("dist/css"))
});


//操作html
var htmlreplace = require('gulp-html-replace'); //html中替换
var minifyHTML = require("gulp-minify-html"); //压缩html

gulp.task("html",function(){
	gulp.src("src/html/index.html")
		.pipe(htmlreplace({
			"css" : "../css/index.min.css",
			"js" : "../js/drog.js"
		}))
		.pipe( minifyHTML({quotes:true}) )//不带参数会去掉引号
		.pipe( gulp.dest("dist/html/") )
});


// 监听:如果 件被修改，则执 相应任务
gulp.task("auto",function(){
	gulp.watch("src/html/*.html", ["html"]);
	gulp.watch(["src/css/*.css","src/css/*.scss"], ["css"]);
})


//服务器
var connect = require('gulp-connect');
gulp.task('myServer', function() {
	connect.server({
		root : 'dist',
		port: 8000,
   		livereload: true
	});
})
//livereload表示当文件被更改时是否自动刷新，有兼容问题。

// 压缩图片
var imagemin = require('gulp-imagemin');

gulp.task("img",function(){
	gulp.src("src/image/*.{png,jpg,gif,ico}")
		.pipe( imagemin({
			optimizationLevel:7,//类型:Number 默认:3  取值范围：0-7
			progressive: true, //默认:false 无损压缩jpg图片
	        interlaced: true, //默认:false 隔行扫描gif进行渲染
	        multipass: true //默认:false 多次优化svg直到完全优化
	  	}))
		.pipe( gulp.dest("dist/image"))
});