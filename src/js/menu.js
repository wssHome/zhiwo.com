//二级菜单动画
class Menu{
	constructor(parentElem,elem){
		this.parentElem = parentElem;
		if(elem){
			this.elem = elem;			
			this.elem_on();
		}else{
			this.elem_bind();
		}
	}
	elem_on(){
		this.parentElem.on("mouseenter",this.elem,function(){
			console.log(this)
			$(this).children("div").stop().slideDown(300).css("z-index",1);
		}).on("mouseleave",this.elem,function(){
			$(this).children("div").stop().slideUp(500).css("z-index",1);
		});
	}
	elem_bind(){
		this.parentElem.bind("mouseenter",function(){
			$(this).children("div").stop().slideDown(300).css("z-index",1);
		}).on("mouseleave",function(){
			$(this).children("div").stop().slideUp(500).css("z-index",0);
		});
	}
}
//export {Menu};