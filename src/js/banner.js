//import css from "./banner.css";
class SildBanner{
	constructor(elem,height,data,time){
		[this.elem,this.height,this.data,this.time]=[elem,height,data,time];
		this.ind = 0;
		this.timer = null;
		this.init();
		this.window_resize();
	}
	init(){
		var [data,elem] = [this.data,this.elem];
		var [ul,ol] = [$(elem).children("ul"),$(elem).children("ol")];
		ul.empty();
		ol.empty();
		$(elem).children("p").remove();
		var len = data.length;
		[this.len,this.ul,this.ol] = [len,ul,ol];
		data.forEach(function(json,ind){
			//创建ul》li
			var ulLi = $("<li></li>");
			var a = $("<a href='"+json.url+"'></a>");
			var img = $("<img src='"+json.img+"' title='"+json.title+"'/>");
			ul.append(ulLi);
			$(ulLi).append(a);
			$(a).append(img);
			
			//创建 ol 》li
			var olLi = $("<li></li>");
			ol.append(olLi);
			olLi.html(ind+1);
			olLi[0].i = ind;
		})
		ol.children(":first").attr("class","ol_click");
		ul.children(":first").css("z-index",0)
		//创建左右按钮
		var [leftP,rightP] = [$("<p class='leftP'><</p>"),$("<p class='rightP'>></p>")];
		$(elem).append(leftP,rightP);

		//设置样式
		this.initStyle();
		
		//绑定事件
		this.ol_hover();
		this.ul_hover();
		this.p_click();
		//自动轮播
		ul.timer = setInterval(this.autoPlay.bind(this),1500);
	}
	initStyle(){
		var str ={
			"min-width":"1100px",
			"width":document.documentElement.offsetWidth,
			"height": this.height
		}
		$(this.elem).css(str);
		this.ul.css(str).find("img").css(str);
	}
	
	window_resize(){
		window.onresize=()=>{
			clearTimeout(this.timer);
			this.timer = setTimeout(()=>{
				this.initStyle();
			},40);
		}
	}
	
	
	p_click(){
		var [elem,ind,len] = [this.elem,this.ind,this.len-1];
		var that = this;
		var p = $(elem).children("p");
		p.bind("mousedown",()=>false).eq(0).bind("click",function(){
			ind--;
			if(ind<0)
				that.ind = ind = len;
			that.move(ind);
		});
		p.eq(1).bind("click",function(){
			that.autoPlay()
		});
	}
	ul_hover(){
		var that = this;
		$(this.elem).bind("mouseenter",()=>{
			clearInterval(this.ul.timer);
		}).bind("mouseleave",()=>{
			this.ul.timer = setInterval(this.autoPlay.bind(that),1500);
		})
	}
	ol_hover(){
		var that = this;
		this.ol.bind("mousedown",()=>false)
		this.ol.on("mouseenter","li",function(e){
			var ind = this.i;
			that.move(ind);
		})
	}
	autoPlay(){
		var ind = ++this.ind;
		if(ind>this.len-1){
			this.ind = ind = 0;
		}
		this.move(ind);
	}
	move(ind){
		this.ol.children().removeClass("ol_click").eq(ind).addClass("ol_click");
		this.ul.children().eq(ind).stop().fadeIn(1000).siblings().stop().fadeOut(1000);
	}
}

//export default SildBanner;
