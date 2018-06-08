var Zhiwo = Zhiwo || {};
window.debug = function($obj) {
	if (window.console && window.console.log) {
		window.console.log($obj)
	}
};
window.parseBool = function(string) {
	if (string == "true" || string == true) {
		return true
	} else if (string == "false" || string == false) {
		return false
	}
};
jQuery.fn.hasAttr = function(attr) {
	var ret = jQuery(null).not(document);
	this.each(function() {
		if ($(this).attr(attr)) {
			ret = ret.add($(this))
		}
	});
	return ret
};
Zhiwo.Core = {
	init: function() {
		Zhiwo.Core.enableBookmark();
		Zhiwo.Core.enableCopySharingToPasteboard();
		Zhiwo.Core.enableEcommerceTracking();
		Zhiwo.Core.initSearchForm();
	},
	enableBookmark: function() {
		var $this = $('#bookmark_us');
		if ($this.length > 0) {
			$this.click(function() {
				if ($.browser.mozilla) {
					window.sidebar.addPanel('知我药妆', 'http://www.zhiwo.com', '')
				} else if ($.browser.msie) {
					window.external.addFavorite('http://www.zhiwo.com', '知我药妆')
				} else {
					alert('您的浏览器不支持点击收藏，请按快捷键Ctrl+d收藏知我药妆')
				}
			})
		}
	},
	enableCopySharingToPasteboard: function() {
		var $this = $("#share-copy-button");
		if ($this.length > 0) {
			$this.click(function(e) {
				e.preventDefault();
				if ($.browser.msie) {
					var link = $("#share-copy-text");
					if (link && link.length > 0) {
						var copied = document.getElementById("share-copy-text").createTextRange();
						copied.execCommand("Copy");
						alert('复制成功！')
					}
				} else {
					alert("对不起，您的浏览器不支持复制按钮，请选择左边文字进行复制和粘贴。")
				}
			})
		}
	},
	enableSubscribe: function() {
		if ($("#form_subscribe").length > 0) {
			$("#form_subscribe").submit(function() {
				$.ajax({
					type: $(this).attr('method'),
					url: $(this).attr('action'),
					dataType: 'json',
					data: $(this).serialize(),
					success: function(data) {
						if (data.status == 0) {
							alert(data.msg)
						} else {
							alert('订阅成功！以后每天知我网的团购信息会发送到您的邮箱！您可随时在知我网邮件中取消订阅。')
						}
					}
				});
				return false
			})
		};
		if ($("#tip-deal-subscribe-form").length > 0) {
			$("#tip-deal-subscribe-form").submit(function() {
				$.ajax({
					type: $(this).attr('method'),
					url: $(this).attr('action'),
					dataType: 'json',
					data: $(this).serialize(),
					success: function(data) {
						if (data.status == 0) {
							alert(data.msg)
						} else {
							$('#tip-deal-subscribe-body').html('<table><tr><td width="343" valign="middle" height="65px" align="right"><strong>订阅成功！每天团购信息会发送到您的邮箱！</strong></td></tr></table>')
						}
					}
				});
				return false
			})
		};
		var $input_mail = $('#form_subscribe input[name=email]');
		if ($input_mail.length > 0) {
			$input_mail.click(function() {
				if ($input_mail.val() === '请输入您的邮箱') {
					$input_mail.val('');
					$input_mail.css('color', '#333')
				}
			});
			$input_mail.blur(function() {
				if ($input_mail.val() === '') {
					$input_mail.val('请输入您的邮箱');
					$input_mail.css('color', '#AEAEAE')
				}
			})
		};
		_$resubscribe = $('#resubscribe');
		if (_$resubscribe.length > 0) {
			_$resubscribe.find('a').click(function() {
				_$resubscribe.find('.text').css('display', 'none');
				_$resubscribe.find('.enter-address').show('fast');
				$('#enter-address-mail').focus()
			})
		}
	},
	clearAdhocNotification: function(container, isRecursive) {
		if (isRecursive == null) {
			isRecursive == true
		};
		if (isRecursive) {
			container.find('.notification_center').remove()
		} else {
			container.children('.notification_center').remove()
		}
	},
	postAdhocNotification: function(container, shouldAutoDismiss, position, notification, shouldForceShowNotification) {
		var message = notification.message;
		var type = notification.type || "information";
		var shouldForceShowNotification = (shouldForceShowNotification != undefined) ? shouldForceShowNotification: false;
		var shouldAutoDismiss = (shouldAutoDismiss != undefined) ? shouldAutoDismiss: true;
		var position = (position != undefined) ? position: "append";
		var notification = $("<div class='notification_center'><div class='message'></div><div class='clear'></div></div>");
		$(notification).find(".message").html(message);
		if (type == "success") {
			$(notification).addClass('success_notification')
		} else if (type == "error") {
			$(notification).addClass('error_notification')
		} else if (type == "warning") {
			$(notification).addClass('warning_notification')
		} else if (type == "information") {
			$(notification).addClass('information_notification')
		}
		if (position == "prepend") {
			container.children('.notification_center').remove();
			container.prepend(notification)
		} else if (position == "append") {
			container.children('.notification_center').remove();
			container.append(notification)
		} else if (position == "before") {
			container.siblings('.notification_center').remove();
			container.before(notification)
		} else if (position == "after") {
			container.siblings('.notification_center').remove();
			container.after(notification)
		};
		if (shouldForceShowNotification) {
			$(window).scrollTop($(notification).offset().top - 50)
		}
		if (shouldAutoDismiss) {
			$(notification).oneTime(1000,
			function() {
				$(notification).remove()
			})
		}
	},
	jsonToString: function(obj) {
		var THIS = this;
		switch (typeof(obj)) {
		case 'string':
			return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
		case 'array':
			return '[' + obj.map(THIS.jsonToString).join(',') + ']';
		case 'object':
			if (obj instanceof Array) {
				var strArr = [];
				var len = obj.length;
				for (var i = 0; i < len; i++) {
					strArr.push(THIS.jsonToString(obj[i]))
				}
				return '[' + strArr.join(',') + ']'
			} else if (obj == null) {
				return 'null'
			} else {
				var string = [];
				for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));
				return String.fromCharCode(123) + string.join(',') + String.fromCharCode(125)
			}
		case 'number':
			return obj;
		case false:
			return obj
		}
	},
	submitForm: function(obj, vars, checkCallback) {
		var obj = $(obj);
		while (obj.size()) {
			if (obj.is("form")) break;
			obj = obj.parent()
		}
		if (obj.is("form")) {
			if (checkCallback && !checkCallback(obj)) return;
			if (vars) {
				for (var k in vars) {
					var e = $("[name=" + k + "]", obj);
					if (!e.size()) e = $("<input type='hidden' name='" + k + "' />").appendTo(obj);
					e.val(vars[k])
				}
			}
			obj.submit();
			return true
		}
	},
	copyToClipboard: function(obj) {
		if (window.clipboardData != undefined) {
			window.clipboardData.setData('Text', $(obj).val());
			Zhiwo.Core.postAdhocNotification($("#view_url"), true, "append", {
				type: 'success',
				isAttached: true,
				message: "分享链接已经拷贝到剪贴板中，您可以在其他网站中粘贴此链接"
			})
		} else {
			Zhiwo.Core.postAdhocNotification($("#view_url"), true, "append", {
				type: 'success',
				isAttached: true,
				message: "您可以把选中的链接内容拷贝粘贴到想分享的网站中"
			});
			obj.focus();
			obj.select()
		}
	},
	hasEcommerceTrackingItem: false,
	enableEcommerceTracking: function() {
		var _$orderPaymentSuccess = $('#cart .order_status tr');
		if (_$orderPaymentSuccess.length > 0) {
			Zhiwo.Core.hasEcommerceTrackingItem = true;
			_$orderPaymentSuccess.each(function() {
				var orderInfo = $(this).attr("order_info");
				if (orderInfo != null && orderInfo.length > 0) {
					var data = jQuery.parseJSON(orderInfo);
					if (data.status == 1) {
						var order = data.order;
						with(order) {
							window._gaq = window._gaq || [];
							_gaq.push(['_addTrans', order_id, 'cosmetics.store.zhiwo', total_price, '', delivery_fee, '', '', '']);
							for (var item in item_details) {
								with(item_details[item]) {
									_gaq.push(['_addItem', order_id, deal_hash_id, deal_short_name, attribute_selections, deal_price, quantity])
								}
							}
						}
					}
				}
			})
		}
	},
	DialogBox : {
		screenConvert: function()
		{
			var objScreen = document.getElementById("ScreenOver");
			if(!objScreen) var objScreen = document.createElement("div");
			objScreen.id = "ScreenOver";
			var width = document.body.scrollWidth;
			var height = document.body.scrollHeight;
			objScreen.style.cssText = "position:absolute;left:0px;top:0px;width:"+width+"px;height:"+height+"px;margin:0px;padding:0px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000;z-index:3;";
			document.body.appendChild(objScreen);
			var allselect = document.getElementsByTagName("select");
			for (var i=0; i<allselect.length; i++) allselect[i].style.visibility = "hidden";
		},
		screenClean : function()
		{
			var objScreen = document.getElementById("ScreenOver");
			if (objScreen) objScreen.style.display = "none";
			var allselect = document.getElementsByTagName("select");
			for (var i=0; i<allselect.length; i++) allselect[i].style.visibility = "visible";
		},

		t_DiglogX:0,
		t_DiglogY:0,
		t_DiglogW:0,
		t_DiglogH:0,

		locate : function()
		{
			if (window.innerWidth)
			{
				//netscape
				var wW = window.innerWidth;
				var wH = window.innerHeight;
				var bgX = window.pageXOffset;
				var bgY = window.pageYOffset;
			}
			else
			{
				//ie
				var dde = document.documentElement;
				var wW = dde.offsetWidth;//页面可视宽度
				var wH = dde.offsetHeight;//页面可视高度
				var bgX = dde.scrollLeft;//页面滚动宽度
				var bgY = dde.scrollTop;//页面滚动高度
			}
			this.t_DiglogX = parseInt(bgX + ((wW - this.t_DiglogW)/2));
			this.t_DiglogY = parseInt(bgY + ((wH - this.t_DiglogH)/2));
		},
		open : function(showdata,ow,oh,width,height)
		{
			this.screenConvert();
			var objDialog = document.getElementById("DialogBox");
			if (!objDialog) objDialog = document.createElement("div");
			this.t_DiglogW = ow;
			this.t_DiglogH = oh;
			this.locate();
			objDialog.id = "DialogBox";
			objDialog.style.cssText = "position:absolute;left:"+this.t_DiglogX+"px;top:"+this.t_DiglogY+"px;margin:0 auto;padding:0px;width:"+width+"px;height:"+height+"px;background-color:#fff;z-index:10;border:solid #ccc 1px;";
			objDialog.innerHTML = showdata;
			document.body.appendChild(objDialog);
		},
		close : function()
		{
			this.screenClean();
			var objDialog = document.getElementById("DialogBox");
			if (objDialog) objDialog.style.display = "none";
		}
	},
	initSearchForm: function() {
		$('.search_form input[name="keyword"]').focusin(function() {
			if ($(this).val() == '请输入关键词') {
				$(this).val('');
			}
		}).focusout(function() {
			if ($(this).val() == '') {
				$(this).val('请输入关键词');
			}
		});
		$('.search_form').submit(function() {
			var keyword = $(this).find('input[name="keyword"]').val();
			if (keyword == '请输入关键词') {
				$(this).find('input[name="keyword"]').focus().val('');
				return false;
			}
		});
	},
	imageSlide: function() {
		var num = $(".image_reel img").length - 1;
		if (num > 0) {
			$(".paging").show().css({zIndex: 99});
		}
		$('.paging .curr').html('01'+'/0'+(num+1));
		rotate = function(){
			var triggerID = $active;
			if ($active < 0) {
				var triggerID = num;
			} else if ($active > num) {
				var triggerID = 0;
			}
			$('.paging .curr').attr('rel', triggerID);
			$('.paging .curr').html('0'+(triggerID+1)+'/0'+(num+1));
			$(".image_reel img").eq(triggerID).animate({opacity: '1.0'}, 500).parent('a').siblings().find('img').animate({opacity: '0.0'}, 500);
			$(".image_reel img").eq(triggerID).css({zIndex: 2}).parent('a').siblings().find('img').css({zIndex: 1});
		};
		rotateSwitch = function(){
			play = setInterval(function(){
				$active = ~~$('.paging .curr').attr('rel') + 1;
				rotate();
			}, 4000);
		};
		rotateSwitch();
		$(".paging .prev").click(function() {
			$active = ~~$('.paging .curr').attr('rel') - 1;
			clearInterval(play);
			rotate();
			rotateSwitch();
			return false;
		});
		$(".paging .next").click(function() {
			$active = ~~$('.paging .curr').attr('rel') + 1;
			clearInterval(play);
			rotate();
			rotateSwitch();
			return false;
		});
	}
};