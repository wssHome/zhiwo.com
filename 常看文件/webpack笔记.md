# Webpack

**Webpack 是一个前端资源加载/打包工具。**

比如，我们在项目中有很多js文件，我们可以通过webpack，把这些文件打包在一起，生成一个新的文件，这样只需要加载这一个文件就可以了。

```
root
    ajax.js
    cookie.js
    startMove.js
    index.html
```

```html
<html>
    <head>index.html</head>
    <body>
        <script src="ajax.js"></script>
        <script src="cookie.js"></script>
        <script src="startMove.js"></script>
    </body>
</html>
```

我们通过webpack，把这3个js文件，打包成1个文件，比如叫做bundle.js


```html
<html>
    <head>index</head>
    <body>
        <script src="bundle.js"></script>
    </body>
</html>
```

这样访问这个html页面时，只需要加载1个js文件了，性能会大大提高。


> **为什么不手动的复制粘贴，合并文件？**

web业务越来越复杂和多元，所以目前讲究前端工程化。

前端工程化的主要目标是解放生产力、提高生产效率。


## Webpack使用

>本文采用的是目前 webpack 的最新版，4.9.1版本，不同版本 webpack 的使用方法经常不一样，所以在不同版本下，用相同的代码，出错是很正常的事，然后去官网找解决方案就可以了。

### NodeJS

Webpack 的使用需要用到 NPM 命令，所以需要先安装 Node，因为 NPM 是 Node 提供的。

NodeJS 下载地址：http://nodejs.cn/download/

**安装时注意事项：**

NodeJS 应该按照默认的位置安装。C:\Program Files\nodejs

如果安装的是其他位置，就可能出现某某某文件找不到或其他命令不存在等错误。

默认情况下，模块会下载到：C:\Documents and Settings\Administrator\Application Data\npm;

NodeJS 安装成功之后，自带 NPM 命令，NPM 指包管理工具，指在 https://www.npmjs.com/ 网站中上传、下载、管理我们的 modules 。

在命令行中，可以查看 node 和 npm 的版本：

```
node -v     # 查看node版本
npm -v      # 查看npm版本
```

### 首先进入命令行

window 系统：点击开始 -> 运行 -> cmd -> 回车

mac 系统：终端

### 全局安装 webpack 脚手架工具的命令行接口 cli

```
npm i -g webpack-cli
```

> 完整写法 npm install --global webpack-cli     
> i 表示安装（实际指从 nodejs.com 这个网站，把对应的模块文件下载到本地）        
> -g 表示全局安装       
> webpack-cli 模块名称

**检查下 webpack 的版本**
```
webpack -v
```
如果上面的命令提示：webpack不是内部或外部命令，可以全局安装 webpack 然后再试一下 webpack -v 命令。
```
// 全局安装 webpack
npm i -g webpack
// 查看 webpack 的版本
webpack -v
```
>如果你想把 nodejs 安装到其他位置，把下载的模块安装到其他位置，需要命令行配置路径，需要设置环境变量，不建议初学者这么做。

### 创建项目

在硬盘的任意位置（不要有中文），创建一个文件夹，比如名字叫做 project1 ，这个文件夹就是我们网站的根目录。

> 目录结构

```
project1/
    app/
        index.html      # 浏览器访问的入口页面
    src/
        main.js         # js的入口页面    
        Msg.js          # main.js 依赖的模块文件
```

> 如上所示，手动的把文件结构和文件都做出来。

### 进入到项目

在命令行窗口中，使用 cd命令，进入到 project1 这个文件夹中。

```
cd project1   # cd 后面跟的是文件/文件夹路径
```

> 示例：如果当前位置是c:/user，希望进入到d:/www/project1下面，我们可以直接在命令行中输入 cd d:/www/project1 回车，然后在输入 d: 回车，这样就把所在位置切换过来了。

### 局部安装webpack

```
npm i -D webpack
```

> 完整写法： npm install --save-dev webpack     
> -D 表示开发环境； 完整写法为 --save-dev       
> --save 表示生产环境； 安装模块时，不写 -D ，那么缺省值就是指 --save

这时的目录结构为：

```
project1/
    node_modules/       # 依赖的模块文件
    app/
        index.html      
    src/
        main.js             
        Msg.js          
```

> node_modules 这个文件夹是自动生成的，里面保存的是从 npmjs.com 这个网站下载的模块。

### 初始化项目

```
npm init
```

命令执行过程中，需要手动在命令行中输入各种数据，比如项目名称、版本、介绍等等，可以都按照默认的设置，即直接按回车即可。最后输入yes确认创建 package.json 文件即可。

```
project1/
    package.json    # 该项目的一些相关信息
```

> npm init 命令执行后，就会创建出 package.json 这个文件，这个文件的内容是可以更改的。

### webpack.config.js 文件配置

手动创建这个文件

```
project1/
    webpack.config.js   # webpack配置文件
```

里面写代码

```
module.exports = {
    entry:  __dirname + "/src/main.js",     //入口文件
    output: {
        path: __dirname + "/app",           //打包后的文件存放的地方
        filename: "bundle.js"               //打包后输出文件的文件名
    }
}
```
>module模块；exports输出；entry入口；output出口；__dirname指项目绝对路径

### 模块的编写和使用

**src/Msg.js 定义模块**

我们把这个 js 文件当成 1个模块，即这个文件输出了一个模块。

```
module.exports = function(str){
    var div = document.createElement("div");
    div.textContent = str;
    return div;
}
```

**src/main.js 使用模块**

用 require 引入一个模块，返回值就是 Msg.js 这个文件的输出内容。

```
var msg = require("./Msg.js");
document.querySelector("body").appendChild(msg("测试"));
```

**app/index.html**

访问这个 html 页面，加载 main.js 和 Msg.js 打包后的文件。

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
    </head>
    <body>
    </body>
</html>
<script src="bundle.js"></script>
```

### 文件打包

我们现在要把 src/Msg.js 和 src/main.js 打包在一起，生成 app/bundle.js 文件，然后这个文件被 app/index.html 使用。

命令行中，直接执行 webpack ，就能够把 Msg.js 和 main.js 打包在一起了。

```
webpack
```

最后通过浏览器访问 app/index.html 页面，就能够看到效果了。


## ES6编译

因为我们不能够保证用户的浏览器，都是高版本支持ES6的浏览器，所以我们生产环境下的代码，通常都是ES5的代码。

我们可以在 webpack 下，使用 babel 工具，来完成ES6代码的编译。

### Babel

Babel其实是几个模块化的包，其核心功能位于称为 babel-core 的 npm 包中，webpack 可以把其不同的包整合在一起使用，对于每一个你需要的功能或拓展，你都需要安装单独的包（用得最多的是解析 ES6 的 babel-preset-env 包和解析 JSX 的 babel-preset-react 包）。

首先下载相应的模块

```
npm i -D babel-core babel-loader babel-preset-env
```

> 一个 npm install 可以下载多个模块，使用空格分割模块名称即可。

### Loaders 

> 在执行打包操作的过程中，使用 loader 装载机处理一下我们的数据。

在 webpack.config.js 文件中，输入代码：

```
module.exports = {
    entry:  __dirname + "/src/main.js",
    output: {
        path: __dirname + "/app",
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js/,
            use: {
                loader: "babel-loader",
                options: {presets: ["env"]}
            },
            exclude: /node_modules/			
        }]
    } 
}
```

> 定义了一个模块规则，如果是 .js 后缀的文件被打包时，使用 loader 处理我们的文件中的数据，把 es6 转为 es5 ，node_modules 文件夹中的 js 文件不被处理。

### 打包

在 src/Msg.js 中，写一些 es6 的箭头函数，然后在命令行中执行 webpack。

上面的规则代码，在 SPA 中，足够使用了。

单页Web应用（single page web application，SPA），就是只有一张 Web 页面的应用，是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序。


## 多入口的文件打包

**webpack.config.js**

```
module.exports = {
    entry: {
        "bundle" : __dirname + "/src/main.js",
        "build" : __dirname + "/src/index.js"
    },
    output: {
        path: __dirname + "/app",
        filename: "[name].js"
    },
    module: {
        rules: [{
            test: /\.js/,
            use: {
                loader: "babel-loader",
                options: {presets: ["env"]}
            },
            exclude: /node_modules/			
        }]
    } 
}
```

以上代码表示，设置了两个入口，一个名字叫做 bundle，一个叫 build，都设置了对应的入口文件。

打包时，根据这两个入口，会生成两个文件，[name] 就是入口名称。即在 app 下生成 bundle 和 build 这两个 js 文件。

### 模块

```
project1
    app
        index.html
    src
        Drag.js
        index.js
```

我们希望把 src/Drag.js 和 src/index.js 打包成 app/build.js

app/index.html 引入 app/build.js，然后访问 index.html 有拖拽效果。


**Drag.js 定义类模块**

```javascript
class Drag{
    constructor(elem){
        this.elem = elem;
        elem.onmousedown = this.down.bind(this);
    }
    down(e){
        [this.x,this.y] = [e.clientX-this.elem.offsetLeft, e.clientY-this.elem.offsetTop];
        document.onmousemove = this.move.bind(this);
        document.onmouseup = this.up;
    }
    move(e){
        [this.elem.style.left,this.elem.style.top] = [e.clientX-this.x+'px', e.clientY-this.y+'px'];
    }
    up(){
        document.onmousemove = document.onmouseup = null;
    }
}


module.exports.Drag = Drag;  // 输出模块
```

**index.js 使用模块**

```javascript
const {Drag} = require("./Drag.js");  // 引入模块

new Drag(document.querySelector("#div1"));
```

**index.html**

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style>
        #div1{
            position: absolute;
            width: 100px;
            height: 100px;
            background: red;
        }
        </style>
    </head>
    <body>
        <div id="div1">div1</div>
    </body>
</html>
<script src="build.js"></script>
```

**命令行进行打包**

```
webpack
```

> webpack --p 可以进行混淆代码

#### 模块的定义和引入

在 webpack 中，我们可以使用 module.exports 来输出一个模块，使用 require 来引入模块。

ES2017 中，我们可以使用原生的方法来输出模块，及使用模块：

```
// 定义模块
class Drag{
    ...
}
export { Drag }; 
```

```
// 使用模块
import {Drag} from "./Drag";
```

> "./Drag" 实际就是 ./Drag.js ，因为扩展名js可以省略；./表示同目录，不写./的话会先去 node_modules中查找，如果找不到，则去同目录下查找。

#### 另一种原生模块写法

```
// 定义模块
class Drag{
    ...
}
export default Drag; 
```

```
// 使用模块
import Drag from "./Drag";
```

**export 和 export default 的区别：**

```
// 定义模块
export {a,b};               // 可以输出多个
// 引入模块
import {a,b} from "页面";   // 带花括号
```

```
// 定义模块
export default a;           // 只能输出一个
// 引入模块
import a from "页面";       // 不带花括号
```


## 其他

### start 命令

每次打包文件时，都需要在命令行中输入 webpack，有些命令太长了，我们可以给它做个别名。

**package.json**

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack --p"
}
```

这样我们就可以使用 npm start 命令来执行 webpack --p 了

```
npm start 
```

> start 是 npm 中一个特殊的脚本名称，可以直接用 npm start 执行。

如果是其他命名，需要用 npm run 脚本名称，来执行。

```javascript
"scripts" : {
    "test" : "",
    "start" : "webpack --p",
    "abc" : "webpack"
}
```

```
npm start       # 执行的是 webpack --p
npm run abc     # 执行的是 webpack
```

### 本地服务器

```
npm i -D webpack-dev-server
```

**webpack.config.js**

```
module.exports = {
    entry: {...},
    output: {...},
    module: {...},
    devServer: {
        contentBase: "./app",       //本地服务器所加载的页面所在的目录
        historyApiFallback: true,   //不跳转
        inline: true,               //实时刷新
        port: 8800                  //设置端口
    } 
}
```

**package.json**

```
{
    "scripts":{
        "server" : "webpack-dev-server --open"
    }
}
```

**命令行**

```
npm run server
```

## 样式文件的打包

webpack 也能够把 js 和 css 文件打包在一起。

我们在 src 目录下，分别建立 1.scss 和 2.css。

```
project1
    app
        index.html
    src
        1.scss
        2.css
        index.js
        Drag.js
```

上文我们介绍了通过 webpack 把 src 下的 index.js 和 Drag.js 打包在一起。

现在我们把 src 目录下的 1.scss、2.css、index.js、Drag.js 打包在一起。

**1.scss**

```
$a : greenyellow;
$b : 5px;
body{
    >div{
        background: $a;
        border:{
            radius: $b * 2;
        }
    }
}
```

**2.css**

```
body{
	background: #678;
}
```

**index.js**

作为入口文件，需要与其他模块建立关联。

```
// 引入 js 文件
import {Drag} from "./Drag.js"; 
// 引入 scss 和 css 文件
import scss from "./1.scss";
import css from "./2.css";
```

我们通过 webpack 对 index.js 进行打包时，依赖了 Drag.js、1.scss、2.css，所以就把这几个文件都打包在一起了。

当然，现在还不能直接 webpack 命令打包，我们需要下载一些模块，然后配置下 webpack 才行。

#### 对css处理、编译sass

**webpack.config.js**

在打包的过程中，如果碰到scss、css文件，需要用到style-loader等模块处理一下。
```
module.exports = {
	....
	module: {
		rules: [...,
		{
			test: /\.(scss|css)/,
			use:[
				{loader: 'style-loader'},
				{loader: 'css-loader'},
				{loader: 'sass-loader'}
			]
		}]
	}
	...
}
```

下载相应的模块
```
npm i -D sass-loader node-sass style-loader css-loader
```

执行打包命令
```
webpack
```

## 结束

webpack 还有很多内容，感兴趣的可以去官网自行浏览。

千锋教育：王杨

全文完