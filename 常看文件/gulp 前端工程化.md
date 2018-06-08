# gulp 前端工程化

我们在开发一个网站项目时，通常有开发环境和生产环境。

开发环境下的文件我们可以做成模块化的结构，代码可以使用一些新的技术，比如 es6、sass等。

生产环境下出于性能和稳定的考虑，我们会把模块化的文件合并，把es6转为es5等。

前端工程化指的就是这一系列的操作，我们可以通过gulp这款工具，对我们的文件自动的压缩、编译、合并等。

## 项目结构

比如，我们计划开发一个项目，项目的名字叫做 project1，通常我们会这样做其结构：

```
project1/
    src/
    dist/
    gulpfile.js
```
1. src 指开发环境
2. dist 指生产环境
3. gulpfile.js 为gulp任务文件

我们要做的是，通过编写gulp任务，监听src下的文件，进行文件的压缩、编译、合并等操作，把处理后的文件，生成到dist目录下。

## 安装 node

使用 gulp 的前提是，要先安装 gulp，安装 gulp 的前提是，先安装 node。

node 的安装是比较简单的，下载相应的程序，安装即可。

安装成功之后，测试一下。

在命令行中，键入 node -v，看看 node 的版本号。

> 进入命令行的方法：

windows：开始 -> 运行 -> cmd

mac：launchpad -> 其他 -> 终端

```
node -v
```

node 安装成功之后，会自带 npm 包管理器。

我们可以通过 npm 指令来安装相应的模块了。

```javascript
// 查看 npm 版本
// npm -v

// npm 能够在国外的资源网站中，获取相应的模块。但速度比较慢。

// 国内有一个淘宝镜像，可以使用cnpm从淘宝镜像中获取模块。
// 安装 cnpm 指令
// npm install -g cnpm --registry=https://registry.npm.taobao.org

// 但cnpm经常出莫名其妙的错误，所以我们可以直接更改npm配置到淘宝镜像。
// 得到现在的镜像地址
// npm get registry
// 设置成淘宝镜像地址
// npm config set registry https://registry.npm.taobao.org/
// 替换成原来的镜像地址
// npm config set registry https://registry.npmjs.org/

```

如果你想让模块下载的速度更快一些，我们可以配置npm的地址。

```
npm config set registry https://registry.npm.taobao.org/
```

>不建议使用淘宝，因为经常莫名其妙的出问题。

## 初始化

进入到项目目录

```javascript
/*
注意路径的问题
比如进入到命令行后，默认的路径是 c:/users/wangyang/
而我们的项目在 d:/project1/
那就需要我们通过 cd 由 wangyang 进入到 project1
方法为依次执行下面两步：
    cd d:/project1/
    d:
然后才能局部安装gulp，才能执行gulp任务。    
*/
```

```
cd project1
```

创建 package.json

```
npm init
```

输入 npm init 回车之后，提示让我们在命令行中输入项目名称、版本、说明之类的东西，我们按照默认的，直接回车即可。最后一步问我们是否创建，输入 yes 回车。

> 这一步会在当前项目中，创建一个名为 package.json 的文件。可以打开 package.json 看看。


## 安装 gulp

全局安装 gulp，使用参数 --global 或简写 -g。

```
npm install gulp -g
```

gulp 安装完成后，看看 gulp 的版本号。

```
gulp -v
```

局部安装 gulp，在项目的根目录安装 gulp。

```
npm install gulp --save-dev
```
> 此参数的缺省值为 --save，即如果不写参数，此模块为生产环境模块。

上面这一步，在这里叫做安装模块，gulp就是其中一个模块，npm叫做包管理器，package就是包，包里面包含很多模块。模块存储在 node_modules 文件夹中。

#### package.json

```
{
    dependencies:{},
    devDependencies:{}
}
```
在 package.json 文件里，有两个属性需要注意一下：

属性 | 参数 | 说明
---|---|---
dependencies | --save | 生产环境
devDependencies | --save-dev | 开发环境

package.json 描述了，这个项目，在开发环境下，依赖哪些模块；在生产环境下，依赖哪些模块。

> 如果将这个项目拷贝到另一台电脑中，是不需要拷贝 node_modules 这个目录的，只需要命令行中，在这个新的路径下，执行 npm install，就会根据 package.json 的依赖，自动下载模块了。

## 编写 gulpfile.js

gulpfile.js 是我们的任务文件，需要在项目的根目录自己创建。

编写代码：

```javascript
var gulp = require("gulp");

gulp.task("task1", function(){
    console.log("定义了一个任务");
});
```

上文创建了一个名字叫做 task1 的任务，执行该任务，会在终端中输出一句话。

> 这里的终端就是我们的命令行窗口

在命令行中，输入：

```
gulp task1
```

上文表示，通过gulp，执行task1任务。

## 文件的复制

```javascript
gulp.task("task1", function(){
    gulp.src("src/js/*.js").pipe(gulp.dest("dist/js/"));
});

/*
src 指来源
pipe 指管道
dest 指目标

和在一起，语义为通过管道，把来源的数据，流到目标位置。即文件复制。
* 为通配符，*.js表示所有的js文件。
dest 目标，如果不存在文件夹，会自动创建。
*/
```

## js文件的相关操作

#### ES6 转 ES5

**版本1:**
```
npm install --save-dev gulp-babel @babel/core @babel/preset-env
```

```javascript
var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task("task1", function(){
    gulp.src('src/1.js')
        .pipe(babel({presets:["@babel/env"]}))
        .pipe(gulp.dest('dist'));
});
```

**版本2:**

```
npm install --save-dev gulp-babel babel-preset-es2015
```

```javascript
var babel = require("gulp-babel");
var es2015 = require("babel-preset-es2015");

gulp.task("task1", function(){
	gulp.src("src/1.js")
		.pipe(babel({presets:[es2015]}))
		.pipe(gulp.dest('dist/es6'));
});
```

> 上面的两种写法，哪个好用用哪个。

#### ES6 原生模块化开发

**文件结构**

```
project1/
    src/
        1.js
        2.js
        1.html
    dist/
    gulpfile.js
```

**2.js**

使用原生的 export ，定义模块。

```javascript
class Animal{
    constructor(){
        
    }
    say(){
        console.log('hello');
    }
}

export default Animal;
```

**1.js**

使用原生的 import ，使用模块。

```javascript
import Animal from "./2"    // 引入2.js文件的模块

class Dog extends Animal{   // 继承
    constructor(){
        super();//执行一次父类的构造，否则会报错
    }
}

var dog = new Dog();
dog.say();
```

**1.html**

引入1.js和2.js合并后的build.js文件，测试模块。

```javascript
<script src='../dist/build.js'></script>
```

/dist/build.js 文件现在还不存在，需要我们通过 gulp 创建。

**gulpfile.js**

```javascript
var gulp = require("gulp");
var babel = require("gulp-babel");
var webpack = require("gulp-webpack");  // npm install gulp-webpack --save-dev
var del = require('del');   // npm install del --save-dev

gulp.task("task1", function(){
    console.log("编译es6中的模块");
    gulp.src(['src/1.js','src/2.js'])
        .pipe(babel({presets:["@babel/env"]}))
        .pipe(gulp.dest('dist'))    // 编译为es5后，才能通过webpack捆绑。
        .pipe(webpack({
            output:{
                filename:"build.js" // 捆绑成什么文件？
            }
        }))
        .pipe(gulp.dest('dist'))
        .on('end', function(){  // 流结束后，执行task2任务。
            gulp.run('task2')
        });
});

gulp.task("task2", function(){
    console.log('删除文件');
    del(['dist/1.js','dist/2.js']); // 删除文件
});
```

执行 gulp 任务

```
gulp task1
```

然后通过浏览器打开 1.html，看控制台是否有输出。

#### 多入口的模块化

我们在开发一个项目时，有可能是有很多个入口页面的，比如我们有：

a.html 它引入的是 1.js、2.js 的捆绑文件 a.js

b.html 它引入的是 x.js、y.js、z.js 的捆绑文件 b.js

那么 gulpfile.js 中，我们可以这么做：

```javascript
gulp.task("task1", function(){

    function compile(from, to){
        console.log("编译es6中的模块");
        gulp.src(from.map(v=>'src/'+v))
            .pipe(babel({presets:["@babel/env"]}))
            .pipe(gulp.dest('dist'))
            .pipe(webpack({output:{filename:to}}))
            .pipe(gulp.dest('dist'))
            .on('end', function(){del(from.map(v=>'dist/'+v))});
    }
    
    compile(['1.js','2.js'], 'a.js');
    compile(['x.js','y.js','z.js'], 'b.js');
        
});
```

**a.html、a.js ( 1.js、2.js )**

```
# a.html
<script src='a.js'></script>

# 1.js
import x from "./2";
x();

# 2.js
export default function(){
	console.log('hello');
}
```

**b.html、b.js ( x.js、y.js、z.js )**

```
# b.html
<script src='b.js'></script>

# x.js
import {a, b} from "./y";
import x from "./z";
x(a+b);

# y.js
let a = 5;
const b = 10;
export {a, b}

# z.js
export default function(str){
	console.log('result:', str);
}
```

> 一个文件如果有多个输出，那么名字必须匹配。


## 其他任务

```
#千锋教育 HTML5 讲师：王杨

var gulp = require("gulp");

var uglify = require('gulp-uglify');//获取 uglify 模块（用于压缩 JS）

var concat = require('gulp-concat');//合并

var rename = require('gulp-rename');//改名

var minifyCSS = require('gulp-minify-css');//获取 minify-css 模块（用于压缩 CSS）

var sass = require('gulp-sass');//编译scss

var babel = require("gulp-babel");//es6转es5
var es2015 = require("babel-preset-es2015");//es6转es5
// 需要额外安装 babel-plugin-check-es2015-constants 等模块

var minifyHTML = require("gulp-minify-html");  //压缩html
var htmlreplace = require('gulp-html-replace'); //html中替换


// es6 编译 es5
gulp.task("es6", function(){
	gulp.src("src/es6/*.js")
		.pipe(babel({presets:[es2015]}))
		.pipe(gulp.dest('dist/es6'));
});

// 编译scss
gulp.task("sass", function(){
	gulp.src('src/sass/*.scss')
		.pipe(concat("bk.css"))
		.pipe(sass())
		.pipe(minifyCSS())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('dist/scss'));
});

// 压缩 js文件
gulp.task("js", function(){
	console.log("开始处理js文件（合并、压缩、改名、拷贝）");
	gulp.src("src/js/*.js")
		.pipe(concat("bk.js"))
		.pipe(uglify())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('dist/js'));
});


// 压缩css文件
gulp.task("css", function(){
	console.log("开始处理css文件（合并、压缩、改名、拷贝）");
	gulp.src("src/css/*.css")
		.pipe(concat("bk.css"))
		.pipe(minifyCSS())
		.pipe(rename({suffix:'.min'}))
		.pipe(gulp.dest('dist/css'));
});


// 处理HTML文件
gulp.task('html', function() { 
	console.log("开始处理html文件（合并、压缩、改名、拷贝）");
	gulp.src('src/**/index.html')  //这里的**表示所有目录，所以下面dest位置会自动匹配该目录
	    .pipe(htmlreplace({  
	        'css': 'css/all.min.css',  //html中设置<!-- build:css -->这里是被替换的内容<!-- endbuild -->
	        'js': 'js/all.min.js' 
	    }))    
	    .pipe(minifyHTML({quotes:true}))  //是否保留引号
	    .pipe(gulp.dest('dist/'));  
});

// 监听：如果文件被修改，则执行相应任务
gulp.task('auto', function () {
	gulp.watch('src/es6/*.js', ['es6']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/css/*.css', ['css']);
	gulp.watch('src/sass/*.scss', ['sass'])
});

gulp.task('default', ["auto"], function(){
	console.log("默认任务");
});

```

开启服务器
```
connect = require('gulp-connect');		// npm install gulp-connect

gulp.task('myServer', function() {
  connect.server({
    root: 'dist',
    port: 8000,
    livereload: true
  });
  connect.server({
    root: 'src',
    port: 8001,
    livereload: true
  });
});

#上面的任务开启了两个服务器环境，livereload表示当文件被更改时是否自动刷新，有兼容问题。
```

图片压缩

```
var imagemin = require('gulp-imagemin');    // npm install gulp-imagemin

gulp.task("img", function(){
	gulp.src('src/images/*.{png,jpg,gif,ico}')
		.pipe(imagemin({//png压缩的明显，jpg几乎看不到
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
		.pipe(gulp.dest('dist/images'));
});
```

> 该图片压缩如果失败，请先用 npm un gulp-imagemin 卸载模块，然后在重新 npm i gulp-imagemin 安装模块尝试。





