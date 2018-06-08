var zhiwoHome = {
	init:function(){
		zhiwoHome.enableTopSendCoupon();
		zhiwoHome.enableBrandSwitch();
		zhiwoHome.enableRecommend();
		zhiwoHome.enableIndexSidebar();
		zhiwoHome.enableTopAd();
		zhiwoHome.enableTimer();
		zhiwoHome.enableSkillTimer();
		zhiwoHome.enableLoadMore();
		zhiwoHome.enableLazyLoad();
	},
	//首页--侧边导航
	enableIndexSidebar:function(){
		var $sidenav = $('.side_nav');
		$(window).on('scroll',function(){
			var scrollTop = $(this).scrollTop();
			if(scrollTop >= 558){
				$sidenav.fadeIn(600);
			}
			else{
				$sidenav.fadeOut(600);
			}
		});
		$sidenav.find('li').on('click',function(){
			$(this).addClass('snav_current').siblings().removeClass('snav_current');
		})
	},
	//顶部--广告位
	enableTopAd:function(){
		var sHeight = $('.topbanner_small').height();
		var bHeight = $('.topbanner_big').height();
		var amout = 0;
		var $adBox = $('.header_topbanner');
		var $adBtn = $('.unfold');

		setTimeout(adFold,2500);

		function adFold(){
			$adBox.stop().animate({'height':sHeight+'px'},900,function(){
				$(this).find('.topbanner_big').animate({'opacity':0},600);
			});
			$adBtn.show().removeClass('unfold');
		}
		function adUnFold(){
			$adBox.find('.topbanner_big').animate({'opacity':1},300);
			$adBox.stop().animate({'height':bHeight+'px'},900)
			$adBtn.show().addClass('unfold');
		}

		$adBtn.on('click',function(){
			if(!$adBox.is(":animated")){
				amout++;
				if(amout%2){
					adUnFold();
				}
				else{
					adFold();
				}
			}
		})
	},
	//品牌--Tab切换
	enableBrandSwitch:function(){
		var indexCurrent = 0;
		var $navBtn = $('.brand_b_nav');
		var $navBtnLi = $navBtn.find('li');
		var $tabPage = $navBtn.next().find('.brand_bc_page');
		function tabMove(obj, index){
			obj.find('li').eq(index).addClass('bbn_current').siblings().removeClass('bbn_current');
			obj.next().find('.brand_bc_page').eq(index).show().siblings().hide();
		};
		$tabPage.eq(0).show();
		$navBtnLi.on('mouseenter',function(){
			indexCurrent = $(this).index();
			tabMove($navBtn,indexCurrent);
		})

		$('.bbc_leftbtn').on('click',function(){
			indexCurrent--;
			if(indexCurrent < 0){
				indexCurrent = 3;
			}
			tabMove($navBtn,indexCurrent);
		})

		$('.bbc_rightbtn').on('click',function(){
			indexCurrent++;
			if(indexCurrent > $('.brand_b_nav li').length-1){
				indexCurrent = 0;
			}
			tabMove($navBtn,indexCurrent);
		})
	},
	//今日头条--搭配推荐
	enableRecommend:function(){
		$('.mlct_recommend').on('click',function(){
			$(this).parent().next().animate({left:'0'},500);
		})
		$('.mlcm_close').on('click',function(){
			$(this).parent().animate({left:'-450px'},500);
		})
		$('.m_list_cmatch').on('mouseleave',function(){
			$(this).animate({left:'-450px'},500);
		})
	},
	enableTimer:function(){
		function setTimer(){
			$('._downClock').each(function(){
				$this= $(this);
				var t = $this.data('diff');
				t = t || $this.attr('diff');
				t = t - 0;
				$this.data('diff',t-1);
				tObj = zhiwoGlobal.divsec(t);
				if(tObj){
					var str =  '<span>' + '<span>' + tObj.day + '</span>天<span>' + tObj.hour + '</span>小时<span>' + tObj.minu + '</span>分<span>' + tObj.sec + '</span>秒</span>';
					$this.next().remove();
				}else{
					var str = '<span>团购已结束</span>';
				}
				$this.after(str);
			});
		}
		setInterval(setTimer,1000);
	},
	enableSkillTimer:function(){
		var timer;
		function setTimer(){
			if($('.skill-timer').length < 1){
				clearInterval(timer);
				return;
			}
			
			$('.skill-timer').each(function(){
				$this= $(this);
				var t = $this.data('diff');
				t = t || $this.attr('diff');
				t = t - 0;
				$this.data('diff',t-0.1);
				tObj = zhiwoGlobal.divsec(t);
				if(tObj){
					var str =  '<span>' + tObj.hour + '</span><i>时</i><span>' + tObj.minu + '</span><i>分</i><span>' + tObj.sec + '.' + tObj.ms + '</span><i>秒</i>';
					$this.html(str);
				} else {
					if($this.hasClass('start_')){
						$this.parents('.wxif_time_start').remove();
						$this.parents('.wxif_time').find('.end_timer_').show();
					} else {
						$this.parents('.wxif_time_end').remove();
						$this.parents('.wxif_time').find('.over_').show();
					}
				}
			});
		}
		
		setTimeout(function(){
			timer = setInterval(setTimer,100);
		},200);
	},
	enableLoadMore : function(){
		var $ele = $('#showMoreGroup');
		var $window = $(window);
		var isLoading = false;
		var isEnd = false;
		var page = 1;
		
		function isView(){
			if($ele.length < 1) return;
			return $window.scrollTop() + $window.height() - $ele.offset().top > 0;
		}
		function loadGoods(){
			if(isLoading || isEnd || !isView()){
				return ;
			}
			isLoading = true;
			var topNum = $('#groupGoods').attr('data');
			$.get('/group/ajax/showMore',{page:page+1, topNum:topNum},function(data){
				page++;
				if(data.code == 1){
					isEnd = true;
					clearInterval(timer);
				} else {
					$('#groupGoods').append(data.html);
					$('#groupGoods img.lazy').lazyload({
						threshold:100,
						effect : "fadeIn",
						placeholder:"/static/images/ico/load_wait.gif"
					});
				}
				
			},'json').always(function(){
				isLoading = false;
			})
		}
		var timer = setInterval(loadGoods, 500);
	},
	enableLazyLoad : function() {
		$('#groupGoods img.lazy').lazyload({
			threshold:100,
			effect : "fadeIn",
			placeholder:"/static/images/ico/load_wait.gif"
		});
	}
};

var zhiwoFocus = {
	init:function(){
		zhiwoFocus.enableFocus();
	},
	enableFocus:function(){
		var oDiv=document.getElementById('playimages');
		var oDivSmall=zhiwoMove.getByClass(oDiv, 'f_btn')[0];
		var oUlSmall=oDivSmall.getElementsByTagName('ul')[0];
		var aLiSmall=oDivSmall.getElementsByTagName('li');
		var oUlBig=zhiwoMove.getByClass(oDiv, 'f_img')[0];
		var aLiBig=oUlBig.getElementsByTagName('li');

		var nowZIndex=2;
		var now=0;

		//大图切换
		for(var i=0;i<aLiSmall.length;i++)
		{
			aLiSmall[i].index=i;

			aLiSmall[i].onclick=function ()
			{
				if(this.index == now){
					return;
				}
				now = this.index;

				tab();

			};
		}

		function tab()
		{
			for(var i=0;i<aLiBig.length;i++){
				aLiBig[i].className = '';
				aLiBig[i].style.zIndex = 0;
			}
			aLiBig[now].style.zIndex = nowZIndex+1;

			zhiwoMove.startMove(aLiBig[now],{'opacity':100},30);
			aLiBig[now].className = 'scale';

			for(var i=0;i<aLiSmall.length;i++){
				aLiSmall[i].className = '';
			}
			aLiSmall[now].className = 'f_btn_current';

		}

		function next(){
			now++;

			if(now==aLiSmall.length)
			{
				now=0;
			}

			aLiSmall[now].className = 'f_btn_current';
			tab();
		}

		var timer=setInterval(next, 4000);

		oDiv.onmouseover=function ()
		{
			clearInterval(timer);
		};
		oDiv.onmouseout=function ()
		{
			timer=setInterval(next, 4000);
		};
		tab();
	}
};
zhiwoHome.enableTopSendCoupon = function(){
	$('.header_topbanner a').click(function(){
		if(this.href.substr(0,2) == 'lq'){
			zhiwoGlobal.lq(this.href.substr(3));
			return false;
		}
	});
}

$(function(){
	zhiwoHome.init();
	if($('#playimages').length){
		zhiwoFocus.init();
	}
})



