//import {Menu} from "./menu.js";//二级菜单
//头部导航栏
new Menu($("#headNav_nav"),".headNav_nav_hasIcon9");
//头部购物车
new Menu($("#head_shop"));
//导航栏
new Menu($("#nav_left_menu"));


//import SildBanner from "./banner.js";//轮播图
//banner   元素节点  高  数据  时间
var banner = new SildBanner(sild,350,[
	{"img":"../image/index_banner1.jpg","title":"1.jpg","url":"../image/index_banner1.jpg"},
	{"img":"../image/index_banner2.jpg","title":"2.jpg","url":"../image/index_banner12.jpg"},
	{"img":"../image/index_banner3.jpg","title":"3.jpg","url":"../image/index_banner13.jpg"},
	{"img":"../image/index_banner4.jpg","title":"4.jpg","url":"../image/index_banner14.jpg"}
],3500);


//主推时间
//let time = new Date();
//let sec = time.getDate()/1000;

