var zhiwoGlobal = {
	init:function(){
		zhiwoGlobal.enableSildeMenu();
		zhiwoGlobal.enableAssure();
		zhiwoGlobal.enablePutcartBtn();
		zhiwoGlobal.regMsg();
		zhiwoGlobal.enableHeadCart();
		zhiwoGlobal.enableSignPoint();
	},
	divsec:function(d){
		if(d < 0){
			return false;
		}
		var t = {day:'0',hour:'00',minu:'00',sec:'00',ms:'0'};
		var f1 = Math.round(d*10)/10;
		t.ms = f1*10%10;
		d = f1 - t.ms/10;
		var h = 0;
		var m= 0;
		var s = 0;
		h = d % (3600 * 24);
		if(d >= 3600 * 24){
			t.day = (d - h)/(3600 * 24);
		}
		m = h % 3600;
		if(h >= 3600){
			t.hour = (h - m)/3600;
			t.hour = t.hour < 10 ? '0' + t.hour : t.hour;
		}
		s = m % 60;
		if(m >= 60){
			t.minu = (m - s)/60;
			t.minu = t.minu < 10 ? '0' + t.minu : t.minu;
		}
		s = s < 10 ? '0' + s : s;
		t.sec= s;

		return t;
	},
	enableSignPoint : function(){
		$('#dd_sign').click(function(){
			$.get('/activity/ajax/signinpoint', function(data){
				if(data.errorno == -1){
					location.href="/account/login";
					return false;
				}
				alert(data.errormsg);
			},'json');
		});
	},
	enablePutcartBtn:function(){
		$('body').on('click', '.put-cart', function(){
			var href=this.href + '&isAjax=1';
			var that = this;
			$.get(href,function(data){
				if(data.code == 0){
					zhiwoGlobal.MsgCenter.fire({name:'cart_put',obj:$(that),'number': data.items_amount});
				}else{
					alert(data.msg);
				}
			},'json');
			return false;
		});
	},

	//顶部购物车
	enableHeadCart:function() {
		var $wrap = $('#header_cshopcar');
		var timer =null;

		function showScroll(){
			var $this = $wrap;
			var subNavList = $this.find('.header_shopgoods');
			var goodsListCont = $this.find('.iscroll_contbox');
			var goodsListLen = goodsListCont.find('.iscroll_cont').find('li').length;
			var goodsListH = 101;
			var goodsListContH = goodsListH * goodsListLen;

			var scrollboxDom = $this.find('.iscroll_contbox')[0];
			var contentbox = goodsListCont.find('.iscroll_cont')[0];
			var iscrollbtnLen = goodsListCont.find('.iscrollbtn').length;

			var maxBoxH = 303;
			clearTimeout(timer);
			$this.find('.header_myshopcar').addClass('header_myshopcar_current');
			if(goodsListContH > maxBoxH){
				goodsListCont.height(maxBoxH);
				subNavList.stop(true,true).slideDown(400);
				if(!iscrollbtnLen){
					new addScroll(scrollboxDom,contentbox,'iscrollbtn');
				}
			}
			else{
				goodsListCont.height(goodsListContH);
				subNavList.stop(true,true).slideDown(400);
			}
		}

		$('.header_myshopcar').mouseenter(function(e){
			$(this).data('begin',new Date().getTime());
			zhiwoGlobal.var_header_myshopcar = setTimeout(showCart,300);
		});
		$('.header_myshopcar').mouseleave(function(){
			var diff = new Date().getTime() - $(this).data('begin');
			if(diff < 300){
				clearTimeout(zhiwoGlobal.var_header_myshopcar);
			}
		})
		$wrap.mouseleave(function(){
			var $this = $(this);
			var subNavList = $this.find('.header_shopgoods');
			subNavList.stop(true,false).slideUp(400);
			timer = setTimeout(function(){
				$this.find('.header_myshopcar').removeClass('header_myshopcar_current');
			},400)

		}).on('click', '.header_ginfo_del', function(){
			var key = $(this).attr('data');
			var delNum = $(this).parents('li').find(':input[name="buy_num"]').val() - 0;
			$.get('/cart/ajax/getdeleted',{item_key:key},function(data){
				if(data.errorno == 0){
					displayCart(data.cartInfo);
					zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':data.cartInfo.goods_num});
				}
			}, 'json');
		}).on('click','.h_amout_down',function(){
			var that = this;
			var min = $(this).attr('data') - 0;
			var num = $(this).next().val() - 1;
			var key  = $(this).parents('li').attr('from') + '_' + $(this).parents('li').attr('gid')  ;
			if(num >= min && num > 0){
				$.get('/cart/ajax/getupdated',{item_key:key,item_quantity:num},function(data){
					if(data.errorno == 0){
						$(that).next().val(num).attr('old', num);
						displayCart(data.cartInfo);
						zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':data.cartInfo.goods_num});
					}
				},'json');
			} else {
				if(num !== 0){
					alert('该商品最少买' + min + '件!');
				}
			}
		}).on('focusout','input[name="buy_num"]', function(e){
			var that = this;
			var $this = $(this);
			var min = $this.prev().attr('data') - 0;
			var max = $this.next().attr('data') - 0;
			var num = $this.val() - 0;
			var key  = $this.parents('li').attr('from') + '_' + $this.parents('li').attr('gid');
			if(num > 0 && num >= min && (max == 0 || num <= max)){
				$.get('/cart/ajax/getupdated',{item_key:key,item_quantity:num},function(data){
					if(data.errorno == 0){
						$(that).val(num).attr('old', num);
						displayCart(data.cartInfo);
						zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':data.cartInfo.goods_num});
					}
				},'json');
			} else {
				$this.val($this.attr('old'));
				if(num !== 0){
					alert('该商品为限购商品!');
				}
			}
		}).on('click', '.h_amout_up', function(){
			var that = this;
			var max = $(this).attr('data') - 0;
			var num = $(this).prev().val() - 0 + 1;
			var key  = $(this).parents('li').attr('from') + '_' + $(this).parents('li').attr('gid')  ;
			if(( max != 0 && num <= max) || max == 0 ){
				$.get('/cart/ajax/getupdated',{item_key:key,item_quantity:num},function(data){
					if(data.errorno == 0){
						$(that).prev().val(num).attr('old', num);
						displayCart(data.cartInfo);
						zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':data.cartInfo.goods_num});
					}
				},'json');
			} else {
				alert('该商品为限购商品!');
			}
		});
		function displayCart(info) {
			var glist = '';
			if(info.item_num < 1){
				$wrap.find('.header_shopgoods').html('<div class="shopgoods_empty"><p class="shopgoods_empty_img"></p><p class="shopgoods_empty_tip1">购物车为空</p><p class="shopgoods_empty_tip2">请挑选心爱的商品吧！</p></div>');
			}else{
				glist += '<div class="shopgoods_has"><div class="header_shopgoods_list">';
				glist += '<div class="iscroll_contbox">';
				glist += '<ul class="iscroll_cont">';
				for(var i=0; i<info.goods.length;i++){
					glist += '<li from="'+ info.goods[i].from + '" gid="' + info.goods[i].gid + '">';
					glist += '<div class="header_goodsimg"><a href="/product/' + info.goods[i].gid + '.html"><img src="' + info.goods[i].small_pic +'"></a></div>';
					glist += '<div class="header_goodsinfo">';
					glist += '<p class="header_ginfo_name"><a href="/product/' + info.goods[i].gid + '.html">' + info.goods[i].name +'</a></p>';
					glist += '<div class="header_ginfo_opearte">';
					glist += '<span class="header_ginfo_price">￥' + parseFloat(info.goods[i].price).toFixed(1) + '</span>';
					glist += '<p class="header_ginfo_amount">'
					glist +=			'<span class="h_amout_down" data="'+ info.goods[i].min_buy + '"></span>';
					glist +=			'<input type="text" name="buy_num" old="' + info.goods[i].num + '" value="' + info.goods[i].num + '" />';
					glist +=			'<span class="h_amout_up" data="'+ info.goods[i].max_buy +'"></span>';
					glist += '</p>';
					glist += '<a class="header_ginfo_del" data="' + info.goods[i].from + '_' + info.goods[i].gid + '" href="javascript:void(0);">删除</a>';
					glist += '</div></div></li>';
				}
				if(info.marketing) {
					for(var r=0; r<info.marketing.rule_value.length; r++){
						glist += '<li class="reduce"><div class="header_goodsimg"><a><img src="' + info.marketing.rule_value[r].pic_thumb + '"></a></div>';
						glist += '<div class="header_goodsinfo">';
						glist += '<p class="header_ginfo_name"><a>';
						if( info.marketing.rule_value[r].type == 'append' || info.marketing.rule_value[r].type == 'coupon'){
							glist += '<span class="gift_flag">[满赠]</span>';
						} else if( info.marketing.rule_value[r].type == 'reduce' ) {
							glist += '<span class="gift_flag">[满减]</span>';
						}else if( info.marketing.rule_value[r].type == 'discount' ) {
                            glist += '<span class="gift_flag">[打折]</span>';
                        }
						glist += info.marketing.rule_value[r].name +'</a></p>';
						glist += '<div class="header_ginfo_opearte">';
						glist += '<span class="header_ginfo_price">￥' + info.marketing.rule_value[r].price + '</span>';
						glist += '<p class="header_ginfo_amount"><span class="amout_down_style"></span><input type="text" readonly="readonly" value="' + info.marketing.rule_value[r].num + '" /><span class="amout_up_style"></span></p>';
						glist += '</div></div></li>';
					}
				}
				glist += '</ul>';
				glist += '</div></div>';
				glist += '<div class="header_shopgoods_allinfo">';
				glist += '<p class="h_allinfo_jianshu">共<span>' + info.goods_num + '</span>件商品</p>';
				glist += '<p class="h_allinfo_zongjia">共计<span>￥</span><em>' + info.total_price + '</em></p>';
				glist += '<p class="h_allinfo_gobuy"><a href="/cart/confirmation">去购物车结算</a></p>';
				glist += '</div></div>';
				$wrap.find('.header_shopgoods').html(glist);
			}
			showScroll();
		}

		function showCart (){	//加载商品
			var glist = '';
			$.get('/cart/ajax/getGoods',function(data){
				if(data.errorno == 0){
					displayCart(data.cartInfo);
					showScroll();
				}
			},'json');
		}
	},
	//下拉菜单
	enableSildeMenu:function(){
		var myPersonal = $('.item_btn');
		var timer = null;
		var initHeadCart ;
		myPersonal.on({
			mouseenter:function(){

				if(isneedshow != '-1') {
					$('.hmcm_shop_listcont').html(window.item_cont_menu);
				}
				var $this = $(this);
				var subNavList = $this.find('.item_cont');
				var maxBoxH = 303;
				subNavList.stop(true,true).slideDown(400);
			},
			mouseleave:function(){
				var $this = $(this);
				var subNavList = $(this).find('.item_cont');
				var $scrollBox = $('.header_shopgoods');

				subNavList.stop(true,false).slideUp(400);

				if($(this).find('.header_myshopcar')){
						timer = setTimeout(function(){
						$this.find('.header_myshopcar').removeClass('header_myshopcar_current');
						zhiwoIscroll.iscrollClose($scrollBox);
					},400)
				}
			}
		});
	},
	//主导航--右侧保证信息
	enableAssure:function(){
		$('.header_mc_info li').on({
			mouseenter:function(){
				var index = $(this).index();
				if(index < 3){
					$(this).stop().animate({width:'74px'},600);
				}
				else{
					$(this).stop().animate({width:'100px'},600);
				}
			},
			mouseleave:function(){
				$(this).stop().animate({width:'0'},600);
			}
		})
	}
};
var zhiwoIscroll ={
	iscrollfn:function(obj,oParent,contextBox,contextEle){
		var disY = 0;

		obj.onmousedown=function (ev)
		{
			var oEvent=ev||event;

			disY=oEvent.clientY-obj.offsetTop;

			if(obj.setCapture){
				obj.setCapture();
			}
			document.onmousemove=function (ev)
			{
				var oEvent=ev||event;
				var t=oEvent.clientY-disY;

				if(t<0)
				{
					t=0;
				}
				else if(t>oParent.offsetHeight-obj.offsetHeight)
				{
					t=oParent.offsetHeight-obj.offsetHeight;
				}

				obj.style.top=t+'px';

				var scale=t/(oParent.offsetHeight-obj.offsetHeight);

				contextEle.style.top=-scale*(contextEle.offsetHeight-contextBox.offsetHeight)+'px';
			};

			document.onmouseup=function ()
			{
				document.onmousemove=null;
				document.onmouseup=null;
				if(obj.releaseCapture){
					obj.releaseCapture();
				}
			};

			return false;	//chrome、ff、IE9
		}
	},
	iscrollShow:function(obj,maxH){
		var maxBoxH = maxH;
		var contUlH = obj.find('.iscroll_cont').outerHeight(true);
		var scrollBtn = obj.find('.iscrollbtn')[0];
		var scrollBtnParent = obj.find('.iscrollbtnparent')[0];
		var scrollBox = obj.find('.iscroll_box')[0];
		var srcollCont = obj.find('.iscroll_cont')[0];

		obj.find('.iscrollbtnparent').height(maxH);

		if(contUlH > maxBoxH){
			obj.find('.iscroll_contbox').height(maxBoxH);
			obj.find('.iscrollbtnparent').show();

			zhiwoIscroll.iscrollfn(scrollBtn,scrollBtnParent,scrollBox,srcollCont);
		}
		else{
			obj.find('.iscroll_contbox').height(contUlH);
		}
	},
	iscrollClose:function(obj){
		var scrollBtn = obj.find('.iscrollbtn');
		var srcollCont = obj.find('.iscroll_cont');
		var scrollBtnParent = obj.find('.iscrollbtnparent');

		scrollBtn.css('top',0);
		srcollCont.css('top',0);
		scrollBtnParent.hide();
	}
};
var zhiwoMove ={
	getStyle:function(obj, name){
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}else{
			return getComputedStyle(obj, false)[name];
		}
	},
	getByClass:function (oParent,sClass){
		var aEle = oParent.getElementsByTagName('*');
		var aResult = [];

		for(var i=0;i<aEle.length;i++){
			if(aEle[i].className == sClass){
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	},
	startMove:function(obj, json,speed,fnEnd){
		clearInterval(obj.timer);
		obj.timer=setInterval(function (){
			var bStop=true;		//假设：所有值都已经到了

			for(var attr in json)
			{
				var cur=0;

				if(attr=='opacity')
				{
					cur=Math.round(parseFloat(zhiwoMove.getStyle(obj, attr))*100);
				}
				else
				{
					cur=parseInt(zhiwoMove.getStyle(obj, attr));
				}

				var speed=(json[attr]-cur)/6;
				speed=speed>0?Math.ceil(speed):Math.floor(speed);

				if(cur!=json[attr])
					bStop=false;

				if(attr=='opacity')
				{
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity=(cur+speed)/100;
				}
				else
				{
					obj.style[attr]=cur+speed+'px';
				}
			}

			if(bStop)
			{
				clearInterval(obj.timer);

				if(fnEnd)fnEnd();
			}
		},speed);
	}
};
var zhiwoSidebar = {
	init:function(){
		zhiwoSidebar.enableSidebarMove();
		zhiwoSidebar.enableSidebarShow();
		zhiwoSidebar.enableSidebarHide();
	},
	enableSidebarMove:function(){
		var sidebarItem = $('.sidebar_item');
		sidebarItem.on({
			mouseenter:function(){
				var $this = $(this);
				var toolTip = $this.find('.sidebar_tooltip');
				var toolTipLogin = $this.find('.sidebar_tooltip_login');

				if($this.hasClass('sidebar_wechat')){
					toolTip.stop(true,true).show();
				}
				else if($this.hasClass('sidebar_shopcar') || $this.hasClass('sidebar_top')){
					return false;
				}
				else if(toolTip.length == 0){
					toolTipLogin.stop(true,true).show();
				}
				else{
					zhiwoMove.startMove(toolTip[0],{left:-123,opacity:0},16,function(){
						toolTip.show();
						zhiwoMove.startMove(toolTip[0],{left:-103,opacity:100},16);
					})
				}
			},
			mouseleave:function(){
				var $this = $(this);
				var toolTip = $this.find('.sidebar_tooltip');
				var toolTipLogin = $this.find('.sidebar_tooltip_login');

				if($this.hasClass('sidebar_wechat')){
					toolTip.stop(true,true).hide();
				}
				else if($this.hasClass('sidebar_shopcar') || $this.hasClass('sidebar_top')){
					return false;
				}
				else if(toolTip.length == 0){
					toolTipLogin.stop(true,true).hide();
				}
				else{
					zhiwoMove.startMove(toolTip[0],{left:-123,opacity:0},16,function(){
						$this.stop(true,true);
						toolTip.hide();
						zhiwoMove.startMove(toolTip[0],{left:0},16);
					})
				}
			}
		})
	},
	enableSidebarShow:function(){
		var sidebarBtn = $('.sitem_btn');
		var sidebarcont = $('.sidebar_content');
		var spin = new Spinner().spin();
		function showLoadding (){
			spin.spin(document.getElementById('sidebar_content'))
		}
		function hideLoadding (){
			spin.spin();
		}
		var sideBar = (function(){
			function displayCart(info) {
				hideLoadding();
				var glist = '<h2><span>我的购物车</span><i class="sidebar_cont_closebtn">&gt;</i></h2>';
				if(info.item_num < 1){
				      glist += '<div class="shopgoods_empty"><p class="shopgoods_empty_img"></p>';
				      glist += '<p class="shopgoods_empty_tip1">购物车为空</p>';
				      glist += '<p class="shopgoods_empty_tip2">请挑选心爱的商品吧！</p>';
				      glist += '</div>';
				}else{
					glist += '<div class="shopgoods_list_cont">';
					glist += '<div class="header_shopgoods_list iscroll_box"><div class="iscroll_contbox"><ul class="iscroll_cont">';
					for(var i=0; i<info.goods.length;i++){
						glist += '<li from="'+ info.goods[i].from + '" gid="' + info.goods[i].gid + '">';
						glist += '<div class="header_goodsimg"><a href="/product/' + info.goods[i].gid + '.html"><img src="' + info.goods[i].small_pic +'"></a></div>';
						glist += '<div class="header_goodsinfo">';
						glist += '<p class="header_ginfo_name"><a href="/product/' + info.goods[i].gid + '.html">' + info.goods[i].name +'</a></p>';
						glist += '<div class="header_ginfo_opearte">';
						glist += '<span class="header_ginfo_price">￥' + parseFloat(info.goods[i].price).toFixed(1) + '</span>';
						glist += '<p class="header_ginfo_amount">'
						glist +=			'<span class="h_amout_down" data="'+ info.goods[i].min_buy + '"></span>';
						glist +=			'<input type="text" name="buy_num" old="' + info.goods[i].num + '" value="' + info.goods[i].num + '" />';
						glist +=			'<span class="h_amout_up" data="'+ info.goods[i].max_buy +'"></span>';
						glist += '</p>';
						glist += '<a class="header_ginfo_del" data="' + info.goods[i].from + '_' + info.goods[i].gid + '" href="javascript:void(0);">删除</a>';
						glist += '</div></div></li>';
					}
					if(info.marketing) {
						for(var r=0; r<info.marketing.rule_value.length; r++){
							glist += '<li class="reduce"><div class="header_goodsimg"><a><img src="' + info.marketing.rule_value[r].pic_thumb + '"></a></div>';
							glist += '<div class="header_goodsinfo">';
							glist += '<p class="header_ginfo_name"><a>';
							if( info.marketing.rule_value[r].type == 'append' || info.marketing.rule_value[r].type == 'coupon'){
								glist += '<span class="gift_flag">[满赠]</span>';
							} else if( info.marketing.rule_value[r].type == 'reduce' ) {
								glist += '<span class="gift_flag">[满减]</span>';
							}else if (info.marketing.rule_value[r].type == 'discount'){
                                glist += '<span class="gift_flag">[折扣]</span>';
                            }
							glist += info.marketing.rule_value[r].name +'</a></p>';
							glist += '<div class="header_ginfo_opearte">';
							glist += '<span class="header_ginfo_price">￥' + info.marketing.rule_value[r].price + '</span>';
							glist += '<p class="header_ginfo_amount"><span class="amout_down_style"></span><input type="text" readonly="readonly" value="' + info.marketing.rule_value[r].num + '" /><span class="amout_up_style"></span></p>';
							glist += '</div></div></li>';
						}
					}
					glist += '</ul></div></div>';

					glist += '<div class="header_shopgoods_allinfo">';
					glist += '<p class="h_allinfo_jianshu">共<span>' + info.goods_num + '</span>件商品</p>';
					glist += '<p class="h_allinfo_zongjia">共计<span>￥</span><em>' + info.total_price + '</em></p>';
					glist += '<p class="h_allinfo_gobuy"><a href="/cart/confirmation">去购物车结算</a></p>';
					glist += '</div>';
					glist += '</div>';
				}
				$('#sidebar_shopcar_cont').html(glist);
			}
			var $cart = $('#sidebar_shopcar_cont');
			var sideBar = {
				showCart : function(fn){
						showLoadding();
						$.get('/cart/ajax/getGoods',function(data){
							if(data.errorno == 0){
								displayCart(data.cartInfo);
								zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':data.cartInfo.goods_num});
								fn && fn();
							}else {
								alert('系统忙！');
							}
						},'json');
				},
				showColl : function(fn){
					if(!zhiwoUID){
						location.href = "/account/login";
						return;
					}
					$.get('/membership/ajax/getfavorite',function(data){
						if(data.code == 1){
							location.href = "/account/login";
							return;
						}
						var goods = data.list.rows;
						var list = '<h2><span>我的收藏</span><i class="sidebar_cont_closebtn">&gt;</i></h2>';
						if(data.list.total == 0){
							list += '<div class="shopgoods_empty">';
							list += '<p class="shopgoods_empty_img"></p>';
							list += '<p class="shopgoods_empty_tip1">您的收藏为空</p>';
							list += '<p class="shopgoods_empty_tip2">快去添加吧！</p>';
							list += '</div>';
						}else{
							list += '<div class="shopgoods_list_cont">';
							list += '<div class="shopgoods_allnum"><p class="h_allinfo_jianshu">共<span>'+data.list.total+'</span>件商品</p>';
                        						list += '</div><div class="header_shopgoods_list iscroll_box"><div class="iscroll_contbox">';
                        						list += '<ul class="iscroll_cont">';
							for(var i=0;i<goods.length;i++){
								list += '<li>';
								if(goods[i].sales_channel == 4){
									list += '<div class="header_goodsimg"><a href="/higo/' + goods[i].goods_id + '.html"><img src="' + goods[i].small_pic + '"></a></div>';
									list += '<div class="header_goodsinfo">';
                                       					list += 		'<p class="header_ginfo_name"><a href="/higo/' + goods[i].goods_id + '.html">' + goods[i].goods_name +'</a></p>';
								}else{
									list += '<div class="header_goodsimg"><a href="/product/' + goods[i].goods_id + '.html"><img src="' + goods[i].small_pic + '"></a></div>';
									list += '<div class="header_goodsinfo">';
                                       					list += 		'<p class="header_ginfo_name"><a href="/product/' + goods[i].goods_id + '.html">' + goods[i].goods_name +'</a></p>';
								    }
                                        					list += 		'<div class="header_ginfo_opearte">'
									    if(goods[i].sales_channel == 4){
                                        					list += 			'<span class="header_ginfo_price">￥' + goods[i].seaamoy_price + '</span>';
                                            					list += 			'<a class="join_shopcar" href="/higo/' + goods[i].goods_id + '">立即购买</a>';
									    }else{
                                        					list += 			'<span class="header_ginfo_price">￥' + goods[i].price + '</span>';
                                            					list += 			'<a class="join_shopcar" href="/cart/add/product/' + goods[i].goods_id + '">加入购物车</a>';
									    }
                                            					list += 		'</div>';
                                           					list += '</div>';
                                           					list += '</li>';
							}
							list += '</ul>';
                        						list += '</div></div></div>';
						}
						$('#sidebar_collect_cont').html(list);
						fn && fn();
					})
				},
				showFoot: function(fn){
					$.get('/membership/ajax/getfoot',function(data){
						var goods = data.list;
						var list = '<h2><span>最近查看</span><i class="sidebar_cont_closebtn">&gt;</i></h2>';
						if(data.list.length == 0){
							list += '<div class="shopgoods_empty">';
							list += '<p class="shopgoods_empty_img"></p>';
							list += '<p class="shopgoods_empty_tip1">您最近没有浏览过小知家的商品</p>';
							list += '<p class="shopgoods_empty_tip2">亲，快去逛逛吧！</p>';
							list += '</div>';
						}else{
							list += '<div class="shopgoods_list_cont">';
							list += '<div class="shopgoods_allnum"><p class="h_allinfo_jianshu">共<span>'+data.list.length+'</span>件商品</p>';
							list += '<p class="shopgoods_clearbtn"><a href="javascript:void(0);">清空</a></p>';
                        						list += '</div><div class="header_shopgoods_list iscroll_box"><div class="iscroll_contbox">';
                        						list += '<ul class="iscroll_cont">';
							for(var i=0;i<goods.length;i++){
								list += '<li>';
								list += '<div class="header_goodsimg"><a href="/product/' + goods[i].goods_id + '.html"><img src="' + goods[i].small_pic + '"></a></div>';
								list += '<div class="header_goodsinfo">';
                                       					list += 		'<p class="header_ginfo_name"><a href="/product/' + goods[i].goods_id + '.html">' + goods[i].name +'</a></p>';
                                        					list += 		'<div class="header_ginfo_opearte">'
                                        					list += 			'<span class="header_ginfo_price">￥' + goods[i].mall_price + '</span>';
                                            					list += 			'<a class="join_shopcar" href="/cart/add/product/' + goods[i].goods_id + '">加入购物车</a>';
                                            					list += 		'</div>';
                                           					list += '</div>';
                                           					list += '</li>';
							}
							list += '</ul>';
                        						list += '</div></div></div>';
						}
						$('#sidebar_foot_cont').html(list);
						fn && fn();
					})
				}
			}

			$cart.on('focusout','input[name="buy_num"]', function(e){
				var that = this;
				var $this = $(this);
				var min = $this.prev().attr('data') - 0;
				var max = $this.next().attr('data') - 0;
				var num = $this.val() - 0;
				var key  = $this.parents('li').attr('from') + '_' + $this.parents('li').attr('gid');
				if(num > 0 && num >= min && (max == 0 || num <= max)){
					$.get('/cart/ajax/getupdated',{item_key:key,item_quantity:num},function(d){
						if(d.errorno == 0){
							$(that).val(num).attr('old', num);
							displayCart(d.cartInfo);
							zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':d.cartInfo.goods_num});
							(function(){
								$('#sidebar_shopcar_cont').show().siblings().hide();

								var $scrollBox = $('#sidebar_shopcar_cont');
								var maxBoxH = $(window).height() - 140;
								var scrollbox = $scrollBox.find('.iscroll_contbox');
								var scrollboxDom = $scrollBox.find('.iscroll_contbox')[0];
								var contentbox = scrollbox.find('.iscroll_cont')[0];
								var iscrollbtnLen = scrollbox.find('.iscrollbtn').length;
								var scrollContH = scrollbox.find('.iscroll_cont').height();

								if(maxBoxH < scrollContH){
									scrollbox.height(maxBoxH);
									if(!iscrollbtnLen){
										new addScroll(scrollboxDom,contentbox,'iscrollbtn');
									}
								}
								else{
									scrollbox.height(scrollContH);
								}
							})()
						}
					});
				} else {
					$this.val($this.attr('old'));
					if(num !== 0){
						alert('该商品为限购商品!');
					}
				}
			});
			$cart.on('click','.h_amout_down',function(){
				var that = this;
				var min = $(this).attr('data') - 0;
				var num = $(this).next().val() - 1;
				var key  = $(this).parents('li').attr('from') + '_' + $(this).parents('li').attr('gid')  ;
				if(num >= min && num > 0){
					$.get('/cart/ajax/getupdated',{item_key:key,item_quantity:num},function(d){
						if(d.errorno == 0){
							$(that).next().val(num).attr('old', num);
							displayCart(d.cartInfo);
							zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':d.cartInfo.goods_num});
							(function(){
								$('#sidebar_shopcar_cont').show().siblings().hide();

								var $scrollBox = $('#sidebar_shopcar_cont');
								var maxBoxH = $(window).height() - 140;
								var scrollbox = $scrollBox.find('.iscroll_contbox');
								var scrollboxDom = $scrollBox.find('.iscroll_contbox')[0];
								var contentbox = scrollbox.find('.iscroll_cont')[0];
								var iscrollbtnLen = scrollbox.find('.iscrollbtn').length;
								var scrollContH = scrollbox.find('.iscroll_cont').height();

								if(maxBoxH < scrollContH){
									scrollbox.height(maxBoxH);
									if(!iscrollbtnLen){
										new addScroll(scrollboxDom,contentbox,'iscrollbtn');
									}
								}
								else{
									scrollbox.height(scrollContH);
								}
							})()
						}
					});
				}else {
					if(num !== 0){
						alert('该商品最少买' + min + '件!');
					}
				}
			});
			$cart.on('click', '.h_amout_up', function(){
				var that = this;
				var max = $(this).attr('data') - 0;
				var num = $(this).prev().val() - 0 + 1;
				var key  = $(this).parents('li').attr('from') + '_' + $(this).parents('li').attr('gid');
				if(( max != 0 && num <= max) || max == 0 ){
					$.get('/cart/ajax/getupdated',{item_key:key,item_quantity:num},function(d){
						if(d.errorno == 0){
							$(that).prev().val(num).attr('old', num);
							displayCart(d.cartInfo);
							zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','number':d.cartInfo.goods_num});
							(function(){
								$('#sidebar_shopcar_cont').show().siblings().hide();

								var $scrollBox = $('#sidebar_shopcar_cont');
								var maxBoxH = $(window).height() - 140;
								var scrollbox = $scrollBox.find('.iscroll_contbox');
								var scrollboxDom = $scrollBox.find('.iscroll_contbox')[0];
								var contentbox = scrollbox.find('.iscroll_cont')[0];
								var iscrollbtnLen = scrollbox.find('.iscrollbtn').length;
								var scrollContH = scrollbox.find('.iscroll_cont').height();

								if(maxBoxH < scrollContH){
									scrollbox.height(maxBoxH);
									if(!iscrollbtnLen){
										new addScroll(scrollboxDom,contentbox,'iscrollbtn');
									}
								}
								else{
									scrollbox.height(scrollContH);
								}
							})()
						}
					});
				} else {
					alert('该商品为限购商品！');
				}
			});
			$cart.on('click', '.header_ginfo_del', function(){
				var key = $(this).attr('data');
				var delNum = $(this).parents('li').find(':input[name="buy_num"]').val() - 0;
				$.get('/cart/ajax/delete',{item_key:key},function(data){
					if(data.errorno == 0){
						zhiwoGlobal.MsgCenter.fire({name:'cart_update_items','total':data.cart_amount, 'number':data.items_number});
						sideBar.showCart(function(){
							$('#sidebar_shopcar_cont').show().siblings().hide();

							var $scrollBox = $('#sidebar_shopcar_cont');
							var maxBoxH = $(window).height() - 140;
							var scrollbox = $scrollBox.find('.iscroll_contbox');
							var scrollboxDom = $scrollBox.find('.iscroll_contbox')[0];
							var contentbox = scrollbox.find('.iscroll_cont')[0];
							var iscrollbtnLen = scrollbox.find('.iscrollbtn').length;
							var scrollContH = scrollbox.find('.iscroll_cont').height();

							if(maxBoxH < scrollContH){
								scrollbox.height(maxBoxH);
								if(!iscrollbtnLen){
									new addScroll(scrollboxDom,contentbox,'iscrollbtn');
								}
							}
							else{
								scrollbox.height(scrollContH);
							}
						});
					}
				}, 'json');
			});
			var $sidebarcont  = sidebarcont;
			$sidebarcont.on('click', '.shopgoods_clearbtn',function(){
				$.get('/membership/ajax/clearFoot', function(data){
					if(data.code == 0){
						sideBar.showFoot();
					}
				});
			});
			return sideBar;
		})();
		sidebarBtn.on('click',function(){
			var $this = $(this);
			var contId = $this.parent().attr('id');
			if(contId == 'sidebar_shopcar'){
				zhiwoMove.startMove(sidebarcont[0],{left:-300},24,function(){
					sideBar.showCart(function(){
						$('#sidebar_shopcar_cont').show().siblings().hide();

						var $scrollBox = $('#sidebar_shopcar_cont');
						var maxBoxH = $(window).height() - 140;
						var scrollbox = $scrollBox.find('.iscroll_contbox');
						var scrollboxDom = $scrollBox.find('.iscroll_contbox')[0];
						var contentbox = scrollbox.find('.iscroll_cont')[0];
						var iscrollbtnLen = scrollbox.find('.iscrollbtn').length;
						var scrollContH = scrollbox.find('.iscroll_cont').height();

						if(maxBoxH < scrollContH){
							scrollbox.height(maxBoxH);
							if(!iscrollbtnLen){
								new addScroll(scrollboxDom,contentbox,'iscrollbtn');
							}
						}
						else{
							scrollbox.height(scrollContH);
						}

					});
				});
			}else if(contId == 'sidebar_collect'){
				zhiwoMove.startMove(sidebarcont[0],{left:-300},24,function(){
					sideBar.showColl(function(){
						$('#sidebar_collect_cont').show().siblings().hide();

						var $scrollBox = $('#sidebar_collect_cont');
						var maxBoxH = $(window).height() - 140;
						var scrollbox = $scrollBox.find('.iscroll_contbox');
						var scrollboxDom = $scrollBox.find('.iscroll_contbox')[0];
						var contentbox = scrollbox.find('.iscroll_cont')[0];
						var iscrollbtnLen = scrollbox.find('.iscrollbtn').length;
						var scrollContH = scrollbox.find('.iscroll_cont').height();

						if(maxBoxH < scrollContH){
							scrollbox.height(maxBoxH);
							if(!iscrollbtnLen){
								new addScroll(scrollboxDom,contentbox,'iscrollbtn');
							}
						}
						else{
							scrollbox.height(scrollContH);
						}

					});
				});
			}
			else if(contId == 'sidebar_foot'){
				zhiwoMove.startMove(sidebarcont[0],{left:-300},24,function(){
					sideBar.showFoot(function(){
						$('#sidebar_foot_cont').show().siblings().hide();

						var $scrollBox = $('#sidebar_foot_cont');
						var maxBoxH = $(window).height() - 140;
						var scrollbox = $scrollBox.find('.iscroll_contbox');
						var scrollboxDom = $scrollBox.find('.iscroll_contbox')[0];
						var contentbox = scrollbox.find('.iscroll_cont')[0];
						var iscrollbtnLen = scrollbox.find('.iscrollbtn').length;
						var scrollContH = scrollbox.find('.iscroll_cont').height();

						if(maxBoxH < scrollContH){
							scrollbox.height(maxBoxH);
							if(!iscrollbtnLen){
								new addScroll(scrollboxDom,contentbox,'iscrollbtn');
							}
						}
						else{
							scrollbox.height(scrollContH);
						}
					});
				});
			}
			else if(contId == 'sidebar_top'){
				$(document).scrollTop(0);
			}
			else{
				return false;
			}
		});
	},
	enableSidebarHide:function(){
		var sidebarcont = $('.sidebar_content');
		sidebarcont.on('click','.sidebar_cont_closebtn',function(){
			zhiwoMove.startMove(sidebarcont[0],{left:35},24);
		});
		$(document).on('click',function(){
			zhiwoMove.startMove(sidebarcont[0],{left:35},24);
		});
		sidebarcont.on('click',function(e){
			e.stopPropagation();
		});
		$('.sidebar_panel').on('click',function(e){
			e.stopPropagation();
		});

	}
};
zhiwoGlobal.enableHeadAdv = function(){
	var navad = $('#ad-navad');
	if(navad.length > 0){
		$.get('/mall/ajax/getadv',{size:1,key:'navAd'},function(data){
			if(data.code != 0) return;
			var html = '<a target="_blank" href="' + data.advs.link + '"><img src="' + data.advs.pic +'"></a>';
			navad.html(html);
		},'json');
	}
}
zhiwoGlobal.ThrowToCart = function(msg, fn) {
	var x1 = msg.obj.offset().left;
	var y1 = -msg.obj.offset().top;
	var pic= msg.obj.attr('pic');
	var cart = $('#sidebar_shopcar');
	var x2 = cart.offset().left;
	var y2 = -cart.offset().top;

	draw(x1, y1, x2, y2, curve, fn);

	function draw(x1, y1, x2, y2, fn, cbfn){
		var q = msg.quantity || 1;
	    var getPoint = fn(x1, y1, x2, y2);
	    var x = x1;
	    if(pic) {
	    	var ele = $('<img src="' + pic + '" style="position:absolute;width:30px;height:30px;display:block;z-index:9999;-webkit-border-radius:100%;-moz-border-radius:100%;-ms-border-radius:100%;-o-border-radius:100%;border-radius:100%;" />');
	    } else {
	    	var ele = $('<div style="position:absolute;width:30px;height:30px;text-align:center;line-height:30px;color:#fff;background:#ff643c;z-index:9999;-webkit-border-radius:100%;-moz-border-radius:100%;-ms-border-radius:100%;-o-border-radius:100%;border-radius:100%;">' + q + '</div>');
	    }

	    $('body').after(ele);
	    var t = setInterval(function(){
		        var point = getPoint();
		        if(point === false) {
		        	cbfn(msg);
		        	$(ele).remove();
		            clearInterval(t);
		        } else {
		        	mvPoint(ele, point);
		        }
	        },10);
	}

	function mvPoint(e, p){
			$(e).css({top:-p.y+'px',left:p.x+'px'});
	}
	function curve(x1, y1, x2, y2){
		var m=  y2 > y1 ? 1/2 : 2;
		var a =  (-y1 - m* y1 + y2 + m*y2)/((-1 + m)*Math.pow( (x1 - x2), 2));
		var h = ( m *x1 + x2)/(1 + m);
		var c = (Math.pow(m,2)* y1 - y2)/(-1 + Math.pow(m,2))

		var x = x1;
		var step = 5;
		if(x2-x1 > 300){
			step = (x2 - x1)/60;
		}
	    return function() {
	    	x += step;
	        if(x >= x2) return false;
	        var y = a*Math.pow((x-h),2) + c;
	        return {x:x, y:y};
	    }
	}
}
zhiwoGlobal.MsgCenter = (function(){
	var lisner = {};
	return {
		reg : function(name,callback){
			if(lisner[name]){
				lisner[name].push(callback);
			}else{
				lisner[name] = [callback];
			}
		},
		unreg : function(name,callback){
			if(lisner[name]){
				var i;
				var t=[];
				for(i=0;i<lisner[name].length;i++){
					if(lisner[name][i] != callback){
						t.push(lisner[name][i]);
					}
				}
				if(t.length == 0){
					delete lisner[name];
				}else{
					lisner[name] = t;
				}
			}
		},
		fire : function(msg){
			var i;
			if(lisner[msg.name]){
				for(i=0;i<lisner[msg.name].length;i++){
						lisner[msg.name][i](msg);
				}
			}
		},
	}
})();
zhiwoGlobal.regMsg = function(){
	//put
	zhiwoGlobal.MsgCenter.reg('cart_put',function(msg){
		zhiwoGlobal.ThrowToCart(msg, function(msg){
			zhiwoGlobal.MsgCenter.fire({name:'cart_update_items', number:msg.number, quantity:msg.quantity});
		});
	});
	zhiwoGlobal.MsgCenter.reg('cart_update_items',function(msg){
		$('#sidebar_shopcar .sshopcar_amout').text(msg.number);
		if(msg.number > 0){
			$('#header_cshopcar .header_shopgoods_totleamout').text(msg.number).show();
		} else {
			$('#header_cshopcar .header_shopgoods_totleamout').hide();
		}
	});
}
zhiwoGlobal.lq = function(key){
	var random = new Date()-0;
	$.get('/activity/ajax/sendcoupon',{actKey:key,random:random},function(data){
        if(data.code == 1){
                window.location.href="/account/login";
                return false;
        }
		alert(data.msg);
	});
}
$(function(){
	zhiwoGlobal.init();
	if($('#sidebar').length){
		zhiwoSidebar.init();
	}
})

//百度统计
var _bdhm_top = 0;
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
var _bdhm_tim = new Image(1,1);
_bdhm_tim.id = "bdhmPerimg";
_bdhm_tim.src = _bdhmProtocol + "hm.baidu.com/_tt.gif?si=847ad921252038e1bbad55b2b00628d8&rnd=" + Math.round(Math.random()*2147483647);
_bdhm_tim.onload=function(){_bdhm_top = 1;}

//第三方合作
var _adwq = _adwq || [];
_adwq.push(['_setAccount', 'f332n']);
_adwq.push(['_setDomainName', '.zhiwo.com']);
_adwq.push(['_trackPageview']);

(function() {
	var adw = document.createElement('script');
	adw.type = 'text/javascript';
	adw.async = true;
	adw.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://s') + '.emarbox.com/js/adw.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(adw, s);
})();

//登录窗
$(document).ready(function(){
	$.ajax({
		type:"GET",
		url:"/account/ajax/getlogininfo",
		dataType:"json",
		success:function(data){
			var loginInfo = '<ul class="clearfix"><li>欢迎来到知我！这里，用专业呵护美丽。</li>';
			if(data.zhiwoUID != 0) {
				loginInfo += '<li class="welcometip ell">欢迎您，知我用户:'+data.zhiwoLoginName+'</li>';
				loginInfo += '<li><a href="/account/logout" rel="nofollow">[退出]</a></li>';
                //更新用户id
                zhiwoUID = data.zhiwoUID;
                zhiwoLoginName = data.zhiwoLoginName;
                zhiwoNickname = data.zhiwoNickName;
			} else {
				loginInfo += '<li><a href="/account/login" rel="nofollow">请登录</a></li>';
				loginInfo += '<li><a href="/account/signup" rel="nofollow">快速注册</a></li>';
			}
			loginInfo += '</ul>';
			$('#login_status').append(loginInfo);
		}
	});
	return false;
});

