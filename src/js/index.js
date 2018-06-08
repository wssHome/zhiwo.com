
//头部导航栏
$("#headNav_nav").on("mouseenter",".headNav_nav_hasIcon9",function(){
	$(this).children("div").stop().slideDown(300);
}).on("mouseleave",".headNav_nav_hasIcon9",function(){
	$(this).children("div").stop().slideUp(500);
});
