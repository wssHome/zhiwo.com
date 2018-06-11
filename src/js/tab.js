class Tab{
	constructor(elem){
		this.ul = elem.children("ul");
		this.ol = elem.children("ol");
		this.ul_mouseenter();	
		this.p_click();
	}
	ul_mouseenter(){
		var [ul,ol] = [this.ul,this.ol];
		var that = this;
		ul.on("mouseenter","li",function(event){
			var ind = $(this).index();
			that.elemStyle(ind);
		})
	}
	p_click(){
		var [ul,ol] = [this.ul,this.ol];
		var len = ul.children("li").length-1;
		var that = this;
		ol.children("#tab_left").bind("click",function(){
			var ind = ul.children(".click").index()-1;
			if(ind<0)ind = len;
			that.elemStyle(ind);
		})
		ol.children("#tab_right").bind("click",function(){
			var ind = ul.children(".click").index()+1;
			if(ind>len)ind = 0;
			that.elemStyle(ind);
		})
	}
	
	elemStyle(ind){
		this.ul.children("li").removeClass("click").eq(ind).addClass("click");
		this.ol.children("li").fadeOut(500).eq(ind).fadeIn(500);
	}
	
}


//export {Tab};
