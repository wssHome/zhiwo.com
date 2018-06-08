千锋教育 HTML5 讲师：王杨

# jQuery

## jQuery 概述

jQuery 是原生 Javascript 开发出来的代码库，通常被称为框架。

jQuery 设计的宗旨是 “write Less，Do More”，即倡导写更少的代码，做更多的事情。

jQuery 通常被用来优化HTML文档操作、事件处理、动画设计和Ajax交互。

```
中文名： 极快瑞 
外文名： jQuery 
核心理念： write less,do more 
发布时间： 2006年1月 
发布人： John Resig 
发布地点： 美国纽约 
最新版本： jQuery 3.1.1 
第一个版本： jQuery 1.0（2006年1月）
```

>注意：jQuery2.0 以上的版本是不支持IE6、IE7、IE8的。

## jQuery 优势

1. 体积小，使用灵巧(只需引入一个js文件)
2. 方便的选择页面元素(模仿CSS选择器更精确、灵活)
3. 动态更改页面样式/页面内容(操作DOM，动态添加、移除样式)
4. 控制响应事件(动态添加响应事件)
5. 提供基本网页特效(提供已封装的网页特效方法)
6. 快速实现通信(ajax)
7. 易扩展、插件丰富

## jQuery 下载

官网：http://jquery.com/

## 如何引入 jQuery 包

第一种方法：本地文件引入

```html
<script src="jquery.js"></script>
```

第二种方法：他站网络引入

```html
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
```

## 使用 jQuery

引入 jQuery 文件后，才能使用 jQuery 代码。

```html
<script src="jquery.js"></script>
<script>
$(function(){
    alert("欢迎使用 jQuery");
});
</script>
```

1. $ 是 jQuery 的别名，实际就是指 jQuery 对象。
2. 上面代码表示页面中所有节点都准备好之后，就可以执行函数了。

**$(function(){}) 与 window.onload=function(){} 的区别**

```javascript
// jq 写法
$(function () {
    console.log("ready1");
});
$(function() {
    console.log("ready2");
});
// js 写法
window.onload = function () {
    console.log('load1');
};
window.onload = function () {
    console.log('load2');
}
```

上面的代码运行后的结果为，ready1 ready2 load2，根据结果，得出结论：

1. ready 不会覆盖，而 load 会覆盖。
2. ready 在 load 之前执行。

**$(function(){}) 的完整写法**

```javascript
$(document).ready(function () {
    alert('第一个jQuery程序！');
});
```

## jQuery 选择器

选择器的作用是选出元素节点，要注意的是结果为集合，就算只选出来一个元素节点，其结果也是集合。

1. 基本选择器
2. 层级选择器
3. 伪类选择器

**基本选择器**

1. ID选择器： $("#id")
2. 标签选择器：$("element")
3. 类选择器：$(".className")
4. 通配选择器：$("*") 匹配指定上下文中所有元素
5. 组选择器：$("selector1,selector2,selectorN") 特点：无数量限制，以逗号分隔 (逐个匹配，结果全部返回)

```html
<div>
    <h4>论语</h4>
    <div class="div1">子在川上曰：</div>
    <p id="p1">“逝者如斯夫！</p>
    <p>不舍昼夜。”</p>
</div>
<script>
console.log( $("#p1") );
</script>
```

**层级选择器**

1. 包含选择器：$("a b")在给定的祖先元素下匹配所有后代元素。（不受层级限制）
2. 子选择器：$("parent > child") 在给定的父元素下匹配所有子元素。
3. 相邻选择器：$("prev + next") 匹配所有紧接在prev元素后的next元素。（紧随其后找1个元素）
4. 兄弟选择器：$("prev ~ siblings") 匹配prev元素之后的所有sibling元素。

```html
<div class="main">
    <span>1<img src="img/1.jpg"/></span>
    2<img src="img/1.jpg"/>
</div>
3<img src="img/1.jpg">
4<img src="img/1.jpg">
<div>
    5<img src="img/1.jpg">
</div>
<script>
//$(".main img").css("border","5px solid red");
//$(".main > img").css("border","5px solid blue");
//$(".main + img").css("border","5px solid blue");
//$(".main ~ img").css("border","5px solid blue");
/*
css() 方法介绍
    css() 方法前面必须是jq对象，如果是元素节点的话，会报错
设置style属性
    如果修改一个style属性时
        $("div").css( "color", "red" );
        $("div").css( {"color":"red"} );
    如果修改多个style属性时
        $("div").css( {"color":"red", "background":"blue"} );
获取style属性
    如果获取一个style属性时
        $("div").css( "color" );
    如果获取多个style属性时
        $("div").css( ["color", "background"] );
*/
</script>
```

综合应用

```html
<h1>沁园春·雪</h1>
<h2>毛泽东</h2>
<div>
    <div>
        <div>
            北国风光，千里冰封，万里雪飘。
            <div>望长城内外，惟余莽莽；大河上下，顿失滔滔。</div>
            <p>山舞银蛇，原驰蜡象，欲与天公试比高。</p>
            <p>须晴日，看红装素裹，分外妖娆。</p>
        </div>
    </div>
    <p id="mp">江山如此多娇，引无数英雄竞折腰。</p>
</div>
<p class="c1">惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。</p>
<p class="c1">一代天骄，成吉思汗，只识弯弓射大雕。</p>
<p>俱往矣，数风流人物，还看今朝。</p>

<script>
// 让id为mp的元素文字大小变成30px

// 让class名为.c1的元素背景为#CCFF99

// 将所有的div和p，统一显示纵向间距

// 将所有的div的边框设置 2像素 实线 红色

// 将div下的所有子div中文字变蓝色blue

// 将div中包含的div背景颜色变成#FF99FF

// 将div的所有兄弟标签p的字体颜色变成蓝色

// 将紧跟着div的p标签的边框设为2像素 实线 #009900

</script>
```

**伪类选择器**

特定位置选择器
1. :first       匹配找到的第1个元素
2. :last        匹配找到的最后一个元素
3. :eq          匹配一个给定索引值的元素

指定范围选择器
4. :even		匹配所有索引值为偶数的元素
5. :odd         匹配所有索引值为奇数的元素
6. :gt(index)	匹配所有大于给定索引值的元素
7. :lt(index)	匹配所有小于给定索引值的元素

```html
<ul>
    <li>0</li>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
</ul>
<script>
$("li:first").css("color", "orange");
</script>
```

排除选择器
8. :not         去除所有与给定选择器匹配的元素

```html
<p>1</p>
<p id="mp">2</p>
<p class="c1">3</p>
<script>
$("p:not(.c1,#mp)").css("color", "orange");
</script>
```

**内容选择器**
1. :contains 匹配包含给定文本的元素

```html
<div>abcd</div>
<div>ABcd</div>
<div>xxyy</div>
<script>
console.log( $("div:contains('bc')") );
</script>
```
2. :empty 匹配所有不包含子元素或者文本的空元素

```html
<table>
    <tr><td>Value 1</td><td></td></tr>
    <tr><td>Value 2</td><td></td></tr>
</table>
<script>
console.log( $("td:empty") );
</script>
```
3. :has 匹配含有选择器所匹配的元素的元素

```html
<div><p>Hello</p></div>
<div>Hello again!</div>
<script>
console.log( $("div:has(p)") );
</script>
```
4. :parent 匹配含有子元素或者文本的元素

```html
<table>
    <tr><td>Value 1</td><td></td></tr>
    <tr><td>Value 2</td><td></td></tr>
</table>
<script>
console.log( $("td:parent") );
</script>
```

**可见性选择器**
1. :hidden 匹配所有不可见元素，或者type为hidden的元素

```html
<table>
    <tr style="display:none"><td>Value 1</td></tr>
    <tr><td>Value 2</td></tr>
</table>
<script>
console.log( $("tr:hidden") );
</script>
```
2. :visible 匹配所有的可见元素

```html
<table>
    <tr style="display:none"><td>Value 1</td></tr>
    <tr><td>Value 2</td></tr>
</table>
<script>
console.log( $("tr:visible") );
</script>
```
**属性**
1. [attribute] 匹配包含给定属性的元素

```html
<div>
  <p>Hello!</p>
</div>
<div id="test2"></div>
<script>
console.log( $("div[id]") );
</script>
```
2. [attribute=value] 匹配给定的属性是某个特定值的元素

```html
<input type="checkbox" name="a" value="1" />
<input type="checkbox" name="a" value="2" />
<input type="checkbox" name="b" value="3" />
<script>
$("input[name='a']").attr("checked", true);
</script>
```
3. [attribute!=value] 匹配所有不含有指定的属性，或者属性不等于特定值的元素。

```html
<input type="checkbox" name="a" value="1" />
<input type="checkbox" name="a" value="2" />
<input type="checkbox" name="b" value="3" />
<script>
$("input[name!='a']").attr("checked", true);
</script>
```
4. [attribute^=value] 匹配给定的属性是以某些值开始的元素

```html
<input type="checkbox" name="abc" value="1" />
<input type="checkbox" name="adc" value="2" />
<input type="checkbox" name="b" value="3" />
<script>
$("input[name^='a']").attr("checked", true);
</script>
```
5. [attribute$=value] 匹配给定的属性是以某些值结尾的元素

```html
<input type="checkbox" name="abc" value="1" />
<input type="checkbox" name="adc" value="2" />
<input type="checkbox" name="b" value="3" />
<script>
$("input[name$='c']").attr("checked", true);
</script>
```
6. [attribute*=value] 匹配给定的属性是以包含某些值的元素

```html
<input type="checkbox" name="abc" value="1" />
<input type="checkbox" name="adc" value="2" />
<input type="checkbox" name="b" value="3" />
<script>
$("input[name*='d']").attr("checked", true);
</script>
```

## jQuery 选择器的优化

使用合适的选择器表达式可以提高性能、增强语义并简化逻辑。常用的选择器中，ID选择器速度最快，其次是类型选择器。

1. 多用ID选择器
2. 少直接使用class选择器
3. 多用父子关系，少用嵌套关系
4. 缓存jQuery对象

## 过滤器

jQuery提供了2种选择文档元素的方式：选择器和过滤器。

**1. 类过虑器：根据元素的类属性来进行过滤操作。**

hasClass(className)：判断当前jQuery对象中的某个元素是否包含指定类名，包含返回true，不包含返回false

```javascript
$(this).hasClass("d1")
```

**2. 下标过滤器：精确选出指定下标元素。**

eq(index)：获取第N个元素。index是整数值，下标从0开始

```javascript
$(this).eq(1)
```

**3. 表达式过滤器。**
 
filter()：筛选出与指定表达式匹配的元素集合。

expr:选择器表达式

```javascript
$("div").filter(".d1,.d4,#d3")
```


**4. 映射 map(callback)：将一组元素转换成其他数组。**

```html
<div>1</div>
<div>2</div>
<script>
console.log($("div").map(function(){
    return this.innerHTML;
}));
</script>
```

**5. 清洗 not(expr)：删除与指定表达式匹配的元素。**

```html
<p>0</p>
<p>1</p>
<p>2</p>
<p>3</p>
<p>4</p>
<p>5</p>
<script>
$("p").not(":eq(2)").css("color", "red");
</script>
```

**6. 截取 slice(start,end)：选取一个匹配的子集。**

```javascript
//$("p").slice(0,1).css("color","red");
//$("p").slice(2,4).css("color","red");
//$("p").slice(-2).css("color","red");
//$("p").slice(0,-2).css("color","red");
//$("p").slice(-4,-2).css("color","red");
```

**7. children():取得所有元素的所有子元素集合（子元素）。**

```html
<div>
    <li>0</li>
    <li id="li1">1</li>
    <li>2</li>
    <li>3</li>
</div>
<script>
$("div").children().css("color","red");
$("div").children(":not(#li1)").css("color","red");
</script>
```

**8. find():搜索所有与指定表达式匹配的元素(所有后代元素中查找)。**

```javascript
console.log( $("div").find(":eq(0)") );
```

**9. 查找兄弟元素 siblings()查找当前元素的兄弟。**

```javascript
// 查找id=li1元素的兄弟节点（包含前后兄弟节点）
$("#li1").siblings().css("color","red")
//
$("#li1").siblings(".li3,#li0").css("color","red")
//
console.log( $("p:eq(0)").siblings("div:eq(1)").children() );
```

## 操作DOM

1. 什么是DOM：document object model 文档对象模型
2. 树形结构
3. 什么是节点（node）：DOM结构中最小单位，元素、文本、属性。。。

创建节点

```javascript
var $div = $("<div title='div盒子'>我是DOM</div>")
$("body").append($div);
```

### 1.插入

#### a.内部插入：（子集）

##### append（）：向元素内部增加内容（末尾）

```javascript
var str = $("<a href='#'>123</a>");
$("div").append(str);
```

##### appendTo（）：将要增加的内容增加到元素中

```javascript
var str = $("<a href='#'>123</a>");
str.appendTo($("div"));
```

> $("A").append("B") 等效 $("B").appendTo("A")

##### prepend（）：向元素内部增加内容（前置）

```javascript
$("div").prepend(str);
```

##### prependTo（）：将要增加的内容增加到元素中

```javascript
str.prependTo($("div"));
```

> $("A").prepend("B") 等效 $("B").prependTo("A")

#### b.外部插入：（同级）

##### after（）：在元素后面插入内容

```javascript
$("div").after(str);
```

##### insertAfter：将内容插入元素后面

```javascript
str.insertAfter($("div"));
```

> $A.after($B) 等效 $B.insertAfter($A);

##### before():在元素前面插入内容

```javascript
$("div").before(str);
```

##### insertBefore（）：将内容插入元素前面

```javascript
str.insertBefore($("div"));
```

> $A.before($B) 等效 $B.insertBefore($A);

### 2.删除

#### a.删除

##### remove（）：删除匹配元素

```javascript
$("div").remove();
$("div").remove(":eq(0)");
```

#### b.清空

##### empty（）：清空子节点内容

```javascript
$("div").empty();   // 不支持参数
```

### 3.克隆：创建指定节点的副本

##### clone（）

```html
<b>b</b>
<p>p</p>
<script>		
$("b").clone().prependTo("p");  //将b拷贝出来放到p内部前面
//或
$("b").click(function(){
    // 在clone方法参数中输入 false | true
    $(this).clone().insertAfter(this);
});
</script>
```

> 默认为假，假表示不复制；真true：表示复制事件

### 4.替换：

##### replaceWith（）：将指定元素替换成匹配元素

```html
<b>0</b>
<b>1</b>
<b>2</b>
<script>
// i标签不存在，则直接把b下标1的元素替换掉
$("b:eq(1)").replaceWith("<i>x</i>");
// 下标0存在，和下标2替换，相当于2删掉，0移到2的位置
$("b:eq(2)").replaceWith($("b:eq(0)"))
</script>
```

##### replaceAll（）：用匹配元素替换成指定元素

```javascript
//"<i>x</i>".replaceAll("b"); 这种写法会报错，因为jq方法必须在jq对象下使用。
$("<i>x</i>").replaceAll("b");
```

> a.replaceWith(b) 等效于 b.replaceAll(a)

## 动画

JavaScript 语言本身不支持动画设计，必须通过改变 CSS 来实现动画效果。

### 1. 显隐动画 

原理：

hide() 隐藏。通过改变元素的高度宽度和不透明度，直到这三个属性值到0

show() 显示。从上到下增加元素的高度，从左到右增加元素宽度，从0到1增加透明度，直至内容完全可见

参数：

show()

show(speed, callback)

speed: 字符串或数字，表示动画将运行多久（slow=0.6秒/normal=0.4/fast=0.2）  //单位是毫秒

callback: 动画完成时执行的方法

显示和隐藏是一对密不可分的动画形式。

### 2. 显隐切换

toggle():切换元素的可见状态

原理：匹配元素的宽度、高度以及不透明度，同时进行动画，隐藏动画后将display设置为none

参数：

toggle(speed)

toggle(speed, callback)

toggle(boolean)

speed: 字符串或数字，表示动画将运行多久（slow=0.6/normal=0.4/fast=0.2）

callback: 动画完成时执行的方法

boolean: true为显示 false为隐藏

```html
<style>
*{padding:0;margin:0;}
div{ width:300px; height:300px; background:skyblue;}
</style>
<input type="button" value="show" />
<input type="button" value="hide" />
<input type="button" value="toggle" />
<div></div>
<script src="../jquery-1.11.3.js"></script>
<script>
$(function(){
    $("input:eq(0)").click(function(){
    	$("div").show(3000, function(){alert()});
    });
    $("input:eq(1)").click(function(){
    	$("div").hide(3000);
    });
    $("input:eq(2)").click(function(){
    	$("div").toggle(3000);
    });
});
</script>
```

### 滑动

#### 1. 显隐滑动效果

slideDown():滑动显示

slideUp():滑动隐藏

参数:

slideDown(speed, callback)

slideUp(speed, callback)

#### 2. 显隐切换滑动

slideToggle():显隐滑动切换

参数:

slidecToggle(speed, callback)

```html
<style>
*{padding:0;margin:0;}
div{ width:300px; height:300px; background:skyblue;}
</style>
<input type="button" value="slideDown" />
<input type="button" value="slideUp" />
<input type="button" value="slideToggle" />
<div></div>
<script>
$(function(){
    $("input:eq(0)").click(function(){
    	$("div").slideDown(1500, function(){alert()});
    });
    $("input:eq(1)").click(function(){
    	$("div").slideUp(1500);
    });
    $("input:eq(2)").click(function(){
    	$("div").slideToggle(1500);
    });
});
</script>
```

### 渐变：通过改变不透明度

#### 1. 淡入淡出

fadeIn()

fadeOut()

参数：

fadeIn(speed, callback)

fadeOut(speed, callback)

#### 2. 设置淡出透明效果

fadeTo()⁭：以渐进的方式调整到指定透明度

参数：

fadeTo(speed, opacity, callback)

#### 3.渐变切换:结合fadeIn和fadeOut

fadeToggle()

参数:
fadeOut(speed, callback)

```html
<style>
*{padding:0;margin:0;}
div{ width:300px; height:300px; background:skyblue;}
</style>
<input type="button" value="fadeIn" />
<input type="button" value="fadeOut" />
<input type="button" value="fadeToggle" />
<input type="button" value="fadeTo" />
<div></div>
<script>
$(function(){
    $("input:eq(0)").click(function(){
    	$("div").fadeIn(1500, function(){alert()});
    });
    $("input:eq(1)").click(function(){
    	$("div").fadeOut(1500);
    });
    $("input:eq(2)").click(function(){
    	$("div").fadeToggle(1500);
    });
    $("input:eq(3)").click(function(){
    	$("div").fadeTo(1500, 0.5);
    });
});
</script>
```

### 自定义：

#### 1. 自定义动画：animate()

```javascript
$("input:eq(0)").click(function(){
    $("div").animate({
    	width:400,
    	height:200,
    	borderLeftWidth:10,
    	borderBottomLeftRadius:250
    }, 1500, function(){alert('该动画效果1500毫秒执行完毕')});
});
```

**实例：树形动画**

**实例：选项卡**

**实例：图片放大效果**

**实例：楼梯**

**实例：手风琴**

**实例：下拉菜单**

## Event

### Event 属性：

type：获取事件类型名称  
target：发生事件的节点   
keyCode：只针对于keypress事件，获取键盘键数字 按下回车，13 

pageX：光标对于页面原点的水平坐标   body     
pageY：光标对于页面原点的垂直坐标         

clientX：光标对于浏览器窗口的水平坐标  浏览器   
clientY：光标对于浏览器窗口的垂直坐标

screenX：光标对于电脑屏幕的水平坐标    电脑屏幕  
screenY：光标对于电脑屏幕的垂直坐标

```javascript
$(document).mousemove(function(event){
    console.log( event.type );
    console.log( event.target );
    console.log( event.keyCode );
    console.log( event.pageX , ",", event.pageY );
    console.log( event.clientX , ",", event.clientY );
    console.log( event.screenX , ",", event.screenY );
});
```

### stopPropagation()：阻止冒泡

1. 从里到外
2. 嵌套关系
3. 相同事件
4. 其中的某一父类没有相同事件时，继续向上查找

```html
<div id="div1">div1
    <div id="div2">div2</div>
</div>
<script>
$("div").click(function(event){
    alert(this.id);
    // event.stopPropagation();
});
</script>
```

### 为匹配元素绑定处理方法

#### bind() 绑定

```html
<input type="button" value="按钮" />
<script>
$("input").bind("click", function(){
    alert("按钮已被点击");
});
</script>
```

#### one() 只执行一次

```html
<input type="button" value="按钮" />
<script>
$("input").one("click", function(){
    alert("按钮已被点击");
});
</script>
```


### 其他事件

```javascript
blur()  
focus()     
mousedown()     
resize()    
change()    
keydown()   
mousemove()     
scroll()    
click()     
keypress()  
mouseout()  
select()    
dblclick()  
keyup()     
mouseover()     
submit()    
error()     
load()  
mouseup()    
unload()    
```

### 事件委托

#### delegate() 绑定

```html
<div>
    <ul>
    	<li>a</li>
    	<li>b</li>
    	<li>c</li>
    </ul>
</div>
<script>
$("div").delegate("li", "click", function(){
    console.log(this);
});
</script>
```

#### on() 绑定

```html
<div>
    <ul>
    	<li>a</li>
    	<li>b</li>
    	<li>c</li>
    </ul>
</div>
<script>
$("div").on("click", "li", function(){
    console.log(this);
});
</script>
```

#### 观察者模式

```html
<input type="button" value="" />
<script>
// 在input元素上注册了一个a事件
$("input").on("a", function(){alert("事件")});
// 执行input上的a事件
$("input").trigger("a");
// 移除input上的a事件
$("input").off("a");
</script>
```

## AJAX

Ajax 全称为：“Asynchronous JavaScript and XML”（异步 JavaScript 和 XML）

### load(url, [data], [callback])

载入远程 HTML 文件代码并插入至 DOM 中。

1. url: 待装入 HTML 网页网址。
2. data: 发送至服务器的 key/value 数据。
3. callback: 载入成功时回调函数。

```html
<div></div>
<script>
$("div").load("top.html");
</script>
```
 
```javascript
$("div").load("top.php", {a: 1}, function(response){
    console.log(response);
});
```

注意：
1. 以覆盖的形式载入内容
2. 如果传参，文件必须是后端文件
3. 如果在第二个参数中，以对象的形式传递参数，表示 post 发送
4. 如果不以对象的形式传递参数，表示 get 发送
5. 不支持跨域访问

### jQuery.get(url, [data], [callback], [type])

通过远程 HTTP GET 请求载入信息。

1. url: 待载入页面的URL地址
2. data: 待发送 Key/value 参数。
3. callback: 载入成功时回调函数。
4. type: 返回内容格式，xml, html, script, json, text, _default。

```javascript
$.get("test.php");

$.get("test.php", { a: "1" } );

$.get("test.php", function(data){
    alert(data);
});

// 下面代码参数 a 也是由 get 传递的
$.get("test.php?b=1&c=2", { a: "1" }, function(data){
    alert(data);
});
```

### jQuery.post(url, [data], [callback], [type])

通过远程 HTTP POST 请求载入信息。

1. url: 发送请求地址。
2. data: 待发送 Key/value 参数。
3. callback: 发送成功时回调函数。
4. type: 返回内容格式，xml, html, script, json, text, _default。

```javascript
$.post("test.php");

$.post("test.php", { a: "1" } );

$.post("test.php", function(data){
    alert(data);
});

// 下面代码参数 i 是 get 传递，参数 a 是 post 传递
$.post("test.php?i=0", { a: "1" }, function(data){
    alert(data);
});
```

### jQuery.getScript(url, [callback])

通过 HTTP GET 请求载入并执行一个 JavaScript 文件。
> 该方法可以跨域
1. url: 待载入 JS 文件地址。
2. callback: 成功载入后回调函数。

```html
<style>
.block{
    width: 200px;
    height: 200px;
    background: gray;
}	
</style>
<button id="go">» Run</button>
<div class="block"></div>
<script>
var url = "http://cdn.bootcss.com/jquery-color/2.1.2/jquery.color.min.js";
jQuery.getScript(url, function(){
    $("#go").click(function(){
        $(".block").animate( { 
        	backgroundColor: 'pink' 
        }, 1000).animate( { 
        	backgroundColor: 'blue' 
        }, 1000);
    });
});
</script>
```



### jQuery.getJSON(url, [data], [callback])

通过 HTTP GET 请求载入 JSON 数据。

1. url: 发送请求地址。
2. data: 待发送 Key/value 参数。
3. callback: 载入成功时回调函数。

```javascript
/*
后端 test.php 文件的输出内容必须是 json
例如：echo '{"a":"1"}'
*/
$.getJSON("test.php", { a: "1" }, function(json){
    console.log(json.a);
});
```

### jQuery.ajax(url,[settings])

通过 HTTP 请求加载远程数据。

比较常用的属性：
1. url: 发送请求地址。
2. type: 发送请求方式 GET|POST。
3. data: 待发送 Key/value 参数。
4. success: 载入成功时回调函数。
5. dataType: 返回数据类型。

**get**

```javascript
$.ajax({
    url:"1.php?b=123&c=456&d=abc",
    data:{"a":"xxx"},
    type:'GET',
    success:function(response, status, xhr){
        alert(response);
        console.log(xhr)
    },
    error:function(xhr, status){
        console.log(status)
    }
});
```

**post**

```javascript
$.ajax({
    url:"1.php?b=123&c=456&d=abc",
    data:{"a":"xxx"},
    type:'POST',
    success:function(response, status, xhr){
        alert(response);
        console.log(xhr)
    },
    error:function(xhr, status){
        console.log(status)
    }
});
```
**jsonp**

```javascript
/*
因为 jsonp 的原理是在页面上创建一个 script 标签，指定 src 属性，
所以该文件的内容是直接写在 script 标签中的，所以输出的内容必须符合 js 规范，
如果访问的是 1.php ，该页面的输出内容是 xxxx
那么 jsonp 执行后，创建的 script 标签中是这样显示的
<script>
xxxx
</script>
上面代码中 xxxx 是 1.php 的输出内容，如果直接在 script 标签中是会报错的。
所以得在 1.php 中将数据包装一下，比如输出时改为
<%
echo "callback('xxxx')";
%>
这样在前端，jsonp 执行后，创建的 script 标签中是这样显示的
<script>
callback('xxxx')
</script>
所以还得在前端文件中自定义 callback 函数，而且该函数又是在全局执行的，所以必须定义全局函数。
*/ 
//是全局函数，如果是局部函数则报错
function callback(o){
    console.log(o);
}
$.ajax({
    url:"1.php?b=123&c=456&d=abc",
    data:{"a":"xxx"},
    dataType:"jsonp",
    jsonp:"callback",    // 请求中的参数名
    jsonpCallback:"callback"    // 请求中的参数值
});
/*
jsonp 和 jsonpCallback 的内容是可以更改的，比如：
jsonp:"abc", jsonpCallback:"fn123"
语义就变成了，发起的请求中，参数为 ?abc=fn123
所以，后端需要改写为 $_GET["abc"] 去接收 fn123，fn123是回调函数名称
*/
/*
对 jsonp 来说，无所谓 success error，所以不用写，写了也不会有好执行。
*/
```

> 访问的页面，输出的内容，要用callback()包裹起来，因为输出的内容是放在script标签中的，所以表示执行callback函数。

**ajaxSetup 设置全局 AJAX 默认选项**

指多次执行 ajax 时，相同的属性可以设置在 ajaxSetup 中。

```javascript
$.ajaxSetup({
    url:"1.php",
    type:"GET"
});
// 第1个ajax中，具有ajaxSetup所设置的所有属性
$.ajax({
    data:{"a":1},
    success:function(str){
        alert(str);
    }
});
// 第2个ajax中，也具有ajaxSetup所设置的所有属性
$.ajax({
    data:{"a":2},
    success:function(str){
        alert(str);
    }
});
// 当前页面中，每一个 ajax ，都具有ajaxSetup所设置的所有属性
```

### serialize() 序列化表单内容为字符串。

将表单内的各项的所选值取出，序列化成字符串。（url参数中的字符串）       

```html
<input id="btn" type="button" value="显示" />
<form>
    <select name="a">
        <option>1</option>
        <option>2</option>
    </select><br>
    <select name="b" multiple="multiple">
        <option selected="selected">1</option>
        <option>2</option>
        <option selected="selected">3</option>
    </select><br/>
    <input type="checkbox" name="c" value="1"/> 1
    <input type="checkbox" name="c" value="2" checked="checked"/> 2<br>
    <input type="radio" name="d" value="1" checked="checked"/> 1
    <input type="radio" name="d" value="2"/> 2
</form>
<script>
$("#btn").click(function(){
    console.log( $("form").serialize() );
});
</script>
```

> 对表单来说，其内部各项必须设置 name 属性，如果设置 id 属性是找不到值的。

### serializeArray() 序列化表单内容为数组对象。

```html
<input id="btn" type="button" value="显示" />
<form>
    <select name="a">
        <option>1</option>
        <option>2</option>
    </select><br>
    <select name="b" multiple="multiple">
        <option selected="selected">1</option>
        <option>2</option>
        <option selected="selected">3</option>
    </select><br/>
    <input type="checkbox" name="c" value="1"/> 1
    <input type="checkbox" name="c" value="2" checked="checked"/> 2<br>
    <input type="radio" name="d" value="1" checked="checked"/> 1
    <input type="radio" name="d" value="2"/> 2
</form>
<script>
$("#btn").click(function(){
    // 获取 select 标签，获取 type="radio" 标签
    var arr = $("select, :radio").serializeArray();
    console.log(arr);
    console.log("--------");
    // 用 jq 的 each 方法，对 arr 循环，arr 中每一个元素，都执行一次函数
    $.each( arr, function(index, obj){
        console.log(index);
        console.log(obj);	// {name:, value:}
        console.log("--------");
    });
});
</script>
```

### jQuery.param( obj )

将表单元素数组或者对象序列化。

```javascript
var params = { width:1680, height:1050 };
var str = jQuery.param(params); // width=1680&height=1050
```

```javascript
var myObject = {
    a: {
        one: 1, 
        two: 2, 
        three: 3
    }, 
    b: [1,2,3]
};
var recursiveEncoded = $.param(myObject);
var recursiveDecoded = decodeURIComponent($.param(myObject));   // 解码

alert(recursiveEncoded);
alert(recursiveDecoded);
//a%5Bone%5D=1&a%5Btwo%5D=2&a%5Bthree%5D=3&b%5B%5D=1&b%5B%5D=2&b%5B%5D=3
//a[one]=1&a[two]=2&a[three]=3&b[]=1&b[]=2&b[]=3

/*
前端：
    通过 Ajax 请求 test.php?a[one]=1&a[two]=2&a[three]=3&b[]=1&b[]=2&b[]=3
后端：
    echo "php:".$_GET["a"]["one"];
    echo "php:".$_GET["b"][1];    
*/
```

## deferred 延期

deferred 对象就是 jQuery 的回调函数解决方案

```javascript
$.get( url ).done(function(str){
    // 成功时...
}).fail(function(err){
    // 失败时...
});
```

**when 都成功时再执行函数**

```javascript
$.when( 
    $.get("test1.html"), 
    $.get("test2.html")
).done(function(str1, str2){
    // 成功时...
}).fail(function(err){
    // 失败时...
});
```

## jQuery 插件

##### 自定义一些 jQuery 的方法。

```javascript
$.extend({
    fn1:function(){
    	console.log( this );	// jQuery
    }
})
$.fn1();

$.fn.extend({
    fn2:function(){
    	console.log( this );	// Object[div]
    }
})
$("div").fn2();
```

```javascript
$.fn1 = function(){
    console.log( this );	// jQuery
}
$.fn1();

$.fn.fn2 = function(){
    console.log( this );	// Object[div]
}
$("div").fn2();
```

##### extend可以将多个参数，合并成一个对象。

```javascript
var obj = $.extend({a:1},{a:2,b:2},{b:3,c:3});
console.log( obj );  // {a:2, b:3, c:3}
```

```javascript
var obj = $.extend(1, true, "abc", [5,6], {b:3,c:3});
console.log( obj );  // {0:5, 1:6, 2:"c", b:3, c:3}
// 设置"abc"时 {0:"a", 1:"b", 2:"c"}，设置[5, 6]时，相当于{0:5, 1:6}
```

字符串，数组，对象都支持，后面的参数与前面的参数如果key相同，会把前面的覆盖掉。

#### 自定义插件

msg.js


（全文完）