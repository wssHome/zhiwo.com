
var Zhiwo = Zhiwo || {};
Zhiwo.Account = {
	init: function() {
		if (RUN_CONTROL == 'Account' && RUN_ACTION == 'login')
		{
			Zhiwo.Account.enableLoginCheck();
		}
		if (RUN_CONTROL == 'Account' && RUN_ACTION == 'signup')
		{
			Zhiwo.Account.enableSignupValidation();
		}
		if(RUN_CONTROL == 'Account' && RUN_ACTION == 'repwd') //找回密码
		{
			Zhiwo.Account.enableRepwdCheck();
		}
		if(RUN_CONTROL == 'Account' && RUN_ACTION == 'repwdemail') //找回密码第2步
		{
			Zhiwo.Account.enableRepwdemail();
		}
		if(RUN_CONTROL == 'Account' && RUN_ACTION == 'resetpwd') //重新设置密码
		{
			Zhiwo.Account.resetpwd();
		}
		if (RUN_CONTROL == 'Account' && RUN_ACTION == 'show')
		{
			Zhiwo.Account.enableAccountShow();
		}
		if (RUN_CONTROL == 'Account' && RUN_ACTION == 'recharge')
		{
			Zhiwo.Account.enableRechargeTopup();
		}
		if (RUN_CONTROL == 'Order' && RUN_ACTION == 'comment')
		{
			Zhiwo.Account.enableRating();
		}
		if (RUN_CONTROL == 'Mall' && RUN_ACTION == 'show')
		{
			Zhiwo.Account.enableTabSwitch();
		}
		if (RUN_CONTROL == 'Membership' && RUN_ACTION == 'coupons')
		{
			Zhiwo.Account.enableReceiveCoupons();
		}
		if (RUN_CONTROL == 'Membership' && RUN_ACTION == 'favorite')
		{
			Zhiwo.Account.enableFavorite();
		}
	},
	validationDefault: {
		regex: {
			username: /^[\.\w\u4e00-\u9fa5\uF900-\uFA2D]{2,16}$/ig,
			email: /^[\w\.\-\+]+@([\w\-]+\.)+[a-z]{2,4}$/ig,
			mobile: /(^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[57])[0-9]{8}$)/,
			verifyCode:/[A-Za-z0-9]/
		}
	},
	enableLoginCheck: function() {
		$this = $('#login-username');
		if ($this.length > 0) {
			$this.click(function() {
				if($this.val() == '用户名/邮箱/手机号'){
					$this.val('');
				}
			}).focusout(function() {
				if($this.val() == ''){
					$this.val('用户名/邮箱/手机号');
				}
			})
		}
	},
	enableSignupValidation: function() {
		var $this_type = $('#signup-type'),signupType = 'mobile';
		//输入手机号
		var $this_mobile = $('#signup-user-form .mobile');
		if ($this_mobile.length > 0) {
			$this_mobile.each(function(index) {
				var $this = $(this).find('input[name=mobile]');
				$this.attr('isValid', false);
				$this.focusout(function() {
					if(signupType == 'mobile') {
						setTimeout(
						function() {
							validateMobileExistence.call($this, true, true, $this.parent().siblings('.error'))
						},800)
					} else {
						$this.attr('isValid', true);
					}
				}).focusin(function() {
					clearMessage($this.parent().siblings('.error'))
				})
			})
		};
		//输入密码
		var $this_password = $('#signup-user-form .password');
		if ($this_password.length > 0) {
			$this_password.each(function(index) {
				var $this = $(this).find('input[name=password]');
				$this.attr('isValid', false);
				$this.focusout(function() {
					validatePassword.call($this, true, true, $this.parent().siblings('.error'));
					if ($this_password.siblings('.password_confirm').children().children('input').val() != "") {
						$this_password.siblings('.password_confirm').children().children('input').trigger('focusout')
					}
				}).focusin(function() {
					clearMessage($this.parent().siblings('.error'))
				})
			})
		};
		//输入重复密码验证
		var $this_password_confirm = $('#signup-user-form .password_confirm');
		if ($this_password_confirm.length > 0) {
			$this_password_confirm.each(function(index) {
				var $this = $(this).find('input[name=password2]');
				$this.attr('isValid', false);
				$this.focusout(function() {
					validatePasswordConfirm.call($this, $this_password_confirm.siblings('.password').children().children('input').val(), true, true, $this.parent().siblings('.error'))
				}).focusin(function() {
					clearMessage($this.siblings('.error'))
				})
			})
		};

		//输入验证码
		var $this_verifycode = $('#signup-user-form .verifycode');
		if ($this_verifycode.length > 0) {
			$this_verifycode.each(function(index) {
				var $this = $(this).find('input[name=verify_code]');
				$this.attr('isValid', false);
				$this.focusout(function() {
				setTimeout(
				function() {
					validateVerifyCodeExistence.call($this, true, true, $this.parent().siblings('.error'))
				},0)

				}).focusin(function() {
					clearMessage($this.parent().siblings('.error'))
				})
			})
		};

		//输入手机号验证
		function validateMobileExistence(shouldShowSuccessMessage, shouldShowErrorMessage, messageContainer) {
			var isValid = false;
			var message = '';
			var $this = this;
			var mobile = $this.val();
			if(!mobile.match(Zhiwo.Account.validationDefault.regex.mobile)) {
				message = '手机格式有误，请重新输入';
				showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer);
				$this.attr('isValid', isValid);
				return false;
			}
			$.ajax({
				url: '/account/ajax/check/mobile',
				type: 'POST',
				dataType: 'json',
				data: {
					mobile: mobile
				},
				success: function(data, textStatus, xhr) {
					isValid = data.status;
					message = data.msg;
					showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer);
					$this.attr('isValid', isValid);
				},
				error: function(xhr, textStatus, errorThrown) {
					isValid = false;
					message = '验证失败！请检查网络连接:)';
					showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer);
					$this.attr('isValid', isValid);
				}
			})
		};

		//输入验证码验证
		function validateVerifyCodeExistence(shouldShowSuccessMessage, shouldShowErrorMessage, messageContainer) {
			var isValid = false;
			var message = '';
			var $this = this;
			var verifycode = $this.val();
			if(!verifycode.match(Zhiwo.Account.validationDefault.regex.verifyCode)) {
				message = '验证码有误,请重新输入';
				showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer);
				$this.attr('isValid', isValid);
				return false;
			}
			$.ajax({
				url: '/account/ajax/getverifycode/verifycode',
				type: 'POST',
				dataType: 'json',
				data: {
					verifycode: verifycode
				},
				success: function(data, textStatus, xhr) {
					if(data.error_no)
					{
						isValid = true;
						message = data.msg;
					}else{
						isValid = false;
						message = data.msg;
					}
					showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer);
					$this.attr('isValid', isValid);
				},
				error: function(xhr, textStatus, errorThrown) {
					isValid = false;
					message = '验证失败！请检查网络连接:)';
					showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer);
					$this.attr('isValid', isValid);
				}
			})
		};
		//输入密码验证
		function validatePassword(shouldShowSuccessMessage, shouldShowErrorMessage, messageContainer) {
			var isValid = false;
			var message = '';
			var $this = this;
			var password = $this.val();
			isValid = password.length > 5 && password.length<16 ? true: false;
			if (!isValid) {
				message = '密码长度需6-16位字符';
			}
			showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer);
			$this.attr('isValid', isValid)
		};
		//输入重复密码验证
		function validatePasswordConfirm(password, shouldShowSuccessMessage, shouldShowErrorMessage, messageContainer) {
			var isValid = false;
			var message = '';
			var $this = this;
			var confirmPassword = $this.val();
			if (password.length != 0) {
				isValid = (password == confirmPassword) ? true: false;
				if (!isValid) {
					if (confirmPassword.length == 0) {
						message = '请输入确认密码！';
					} else {
						message = '两次输入的密码不匹配';
					}
				}
				showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer)
			}
			$this.attr('isValid', isValid)
		};
		var $this_send_sms_code = $('#signup-user-form #send_sms');
		if ($this_send_sms_code.length > 0) {
			$this_send_sms_code.click(function() {
				var mobile = $('#signup-user-form #signup-mobile').val();
				if(mobile == '' || !mobile.match(Zhiwo.Account.validationDefault.regex.mobile)){
					return false;
				}
				$this_send_sms_code.html('正在发送中...');
				$.ajax({
					url: '/account/ajax/sendsms',
					type: 'POST',
					dataType: 'json',
					data: {
						mobile: mobile
					},
					success: function(data, textStatus, xhr) {
						if(data.status == true){
							$this_send_sms_code.html('');
							alert('验证码已发送，请在90秒内完成注册');
						}else{
							$this_send_sms_code.html('重新获取验证码');
							alert('验证码发送失败！');
						}
					},
					error: function(xhr, textStatus, errorThrown) {
						$this_send_sms_code.html('重新获取验证码');
						alert('验证码发送失败！请检查网络连接');
					}
				})
			})
		};
		var $this_signup_user_form = $('#signup-user-form');
		if ($this_signup_user_form.length > 0) {
			$this_signup_user_form.each(function(index) {
				var $this = $(this);
				$this.submit(function() {
					submitForm.call($this);
					return parseBool($this.attr('allValid'))
				})
			})
		};
		function submitForm() {
			var allValid = true;
			$this = this;
			$this.find('input').each(function(index) {
				if (signupType == 'email' && $(this).attr('name') == 'mobile') {
					return true; //continue
				}
				if (signupType == 'mobile' && $(this).attr('name') == 'email') {
					return true;
				}
				if ($(this).attr('isValid') != null && !parseBool($(this).attr('isValid'))) {
					allValid = false;
					$(this).trigger('focusout');
				}
			});
			$(this).attr('allValid', allValid)
		};

		function clearMessage(messageContainer) {
			$(messageContainer).html('')
		};
		function showMessage(shouldShowSuccessMessage, shouldShowErrorMessage, isValid, message, messageContainer) {
			var tip = $("<div class='f-input-tip'><div class='message'></div></div>");
			if (isValid) {
				$(tip).addClass('success')
			} else {
				$(tip).addClass('error')
			}
			$(tip).find('div.message').text(message);
			if (shouldShowSuccessMessage && isValid) {
				$(messageContainer).html(tip);
				$(tip).css('display', 'block')
			}
			if (shouldShowErrorMessage && !isValid) {
				$(messageContainer).html(tip);
				$(tip).fadeIn('fast')
			}
		};
		$("#change_code").click(function(){
			$("#verify_code").attr("src", "/verifyCode?random=" + Math.random());
		});
	},

	enableRepwdCheck:function()
	{
		//输入账户
		var $this_username = $(".u_info_account");
		if($this_username.length > 0)
		{
			var $this = $('.u_info_account .sign_txt');
			$this.attr('isValid', false);
			$this.focusout(function(){
				setTimeout(function() {
					validateUser.call()
				},800);

			}).focusin(function(){
				$('.u_info_account .error').html('');
			});
		};
		//输入验证码
		var $this_verifycode = $('.u_info_code');
		if ($this_verifycode.length > 0) {
			var $this = $('.u_info_code .sign_txt');
			$this.attr('isValid', false);
			$this.focusout(function() {
				setTimeout(function() {
						validateverifycode.call()
					},0)
			}).focusin(function() {
				$('.u_info_code .error').html('');
			})
		};
		//输入登录名验证
		function validateUser(urlsername) {
			var isValid = false;
			var username = $(".u_info_account .sign_txt").val();
			var error = $(".u_info_account .sign_txt").parent().siblings('.error');
			if(username.indexOf("@") > 0 )
			{
				var pattern = Zhiwo.Account.validationDefault.regex.email;
				if ( !pattern.test(username) ) {
					message = '输入的邮箱格式不正确！';
					error.html(message);
					return false;
				}
			}else{
				if(!username.match(Zhiwo.Account.validationDefault.regex.mobile))
				{
					message = '输入的手机格式不正确！';
					error.html(message);
					return false;
				}
			}
			$.ajax({
				url: '/account/ajax/check/uname',
				type: 'POST',
				dataType: 'json',
				data: {
					username: username
				},
				success: function(data, textStatus, xhr) {
					isValid = data.status;
					message = data.msg;
					error.html(message);
					$(".u_info_account .sign_txt").attr('isValid', isValid);
				},
				error: function(xhr, textStatus, errorThrown) {
					isValid = false;
					message = '验证失败！请检查网络连接:)';
					error.html(message);
					$(".u_info_account .sign_txt").attr('isValid', isValid);
				}
			})
		};
		//输入验证码验证
		function validateverifycode(urlsername) {
			var isValid = false;
			var verifycode = $('.u_info_code .sign_txt').val();
			var error = $('.u_info_code .sign_txt').parent().siblings('.error');
			if(verifycode.length < 0)
			{
				message = '请输入验证码';
				error.html(message);
				return false;
			}
			$.ajax({
				url: '/account/ajax/getverifycode/verifycode',
				type: 'POST',
				dataType: 'json',
				data: {
					verifycode: verifycode
				},
				success: function(data, textStatus, xhr) {
					isValid = data.error_no;
					message = data.msg;
					error.html(message);
					$('.u_info_code .sign_txt').attr('isValid', isValid);
				},
				error: function(xhr, textStatus, errorThrown) {
					isValid = false;
					message = '验证失败！请检查网络连接:)';
					error.html(message);
					$('.u_info_code .sign_txt').attr('isValid', isValid);
				}
			})
		};

		var $this_repwd_user_form = $('#repwd-user-form');
		if ($this_repwd_user_form.length > 0) {
			$this_repwd_user_form.each(function(index) {
				var $this = $(this);
				$this.submit(function() {
					submitForm.call($this);
					return parseBool($this.attr('allValid'))
				})
			})
		};

		//表单提交
		function submitForm() {
			var allValid = true;
			$this = this;
			$this.find('input').each(function(index) {

				if ($(this).attr('isValid') != null && !parseBool($(this).attr('isValid'))) {
					allValid = false;
					$(this).trigger('focusout');
				}
			});
			$(this).attr('allValid', allValid)
		};

		$("#change_code").click(function(){
			$("#verify_code").attr("src", "/verifyCode?random=" + Math.random());
		});
	},

	enableRepwdemail:function()
	{

		//发送手机短信验证码
		var $this_getcode = $('.repwdphone_h').find('.getcode');
		$this_getcode.click(function(){
			var username = $('input[name=username]').val();
			var member_id = $('input[name=account_id]').val();
			var stime = $('input[name=time]').val();
			if(stime > 0)
			{
				$('.error').html('2分钟之内，不能重复发送短信！');
				return false;
			}
			$.ajax({
				url: '/account/ajax/repwdsendsms',
				type: 'POST',
				dataType: 'json',
				data: {
					username: username,
					member_id: member_id,
				},
				success: function(data, textStatus, xhr) {
					if(data.errno == 0)
					{
						$('.error').html('2分钟之内，不能重复发送短信！');
						$('.codesend_tip').show().find('.getcode_tip').html('('+ data.time +')秒后重新获取');
						$('input[name=time]').val(data.time);
					}else if(data.errno == 1)
					{
						$('.error').html('');
						$('.codesend_tip').show().find('.getcode_tip').html('('+ data.time +')秒后重新获取');
						$('input[name=time]').val(data.time);
						$('.codesend_end').html('验证码已发送，请查收短信');
					}else{
						$('.error').html('发送失败！请检查网络:)');
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					$('.error').html('发送失败！请检查网络:)');
				}
			});
		});
		var isValid = 0;
		$('input[name=code]').attr('isValid', isValid);
		//验证手机短信验证码
		var $this_code = $('input[name=code]');
		$this_code.attr('isValid', isValid);
		$this_code.focusout(function(){
			var code = $(this).val();
			var username = $('input[name=username]').val();
			$.ajax({
				url: '/account/ajax/getverifycode',
				type: 'POST',
				dataType: 'json',
				data: {
					username: username,
					code: code,
				},
				success: function(data, textStatus, xhr) {
					if(data.errno == -1)
					{
						$('.error').html('该验证码已被使用,请重新获取！');
						$('input[name=code]').attr('isValid', isValid);
					}else if(data.errno == 0){
						$('.error').html('验证码不正确！');
						$('input[name=code]').attr('isValid', isValid);
					}else{
						$('.error').html('');
						isValid = 1;
						$('input[name=code]').attr('isValid', isValid);
					}
				},
				error: function(xhr, textStatus, errorThrown) {
					$('.error').html('发送失败！请检查网络:)');

				}

			});
		}).focusin(function(){
			$('.error').html('');
			$('.codesend_tip').hide().find('.getcode_tip');
		});

		var $this_repwemall_user_form = $('#repwemall-user-form');
		if ($this_repwemall_user_form.length > 0) {
			$this_repwemall_user_form.each(function(index) {
				var $this = $(this);
				$this.submit(function() {
					submitForm.call($this);
					return parseBool($this.attr('allValid'))
				})
			})
		};

		//表单提交
		function submitForm() {
			var allValid = true;
			$this = this;
			$this.find('input').each(function(index) {
				if ($(this).attr('isValid') != null && !parseBool($(this).attr('isValid'))) {
					allValid = false;
					$(this).trigger('focusout');
				}
			});
			$(this).attr('allValid', allValid);
		};
	},

	enableRechargeTopup: function() {
		$this = $('#recharge-form');
		if ($this.length > 0) {
			$this.submit(function() {
				var amount = $('#recharge-form input[name=amount]').val();
				if (isNaN(amount) || amount == '') {
					$('#inner-notify').css('display', 'block');
					$('#inner-notify').html('请输入正确的金额');
					$('#recharge-form input[name=amount]').focus();
					return false
				}
				amount = parseInt(amount);

				if (amount < 1) {
					$('#inner_notify').css('display', 'block');
					$('#inner_notify').html('提示: 每次最小充值金额为1元');
					$('#recharge-form input[name=amount]').focus();
					return false
				}

				if (amount > 500) {
					$('#inner_notify').css('display', 'block');
					$('#inner_notify').html('提示: 充值金额超出部分银行支付限额，建议每次充值小于500元');
					$('#recharge-form input[name=amount]').focus();
					return false
				}
			})
		}
	},
	enableRating: function() {
		var STAR_WIDTH = 17;
		if ($(".service_rating .rating.editable").length > 0) {
			$('.service_rating .rating').click(function(pos) {
				var $this = $(this),
				r_value = valueByWidth(pos.clientX - $this.offset().left);
				$this.find('.value').width(widthByValue(r_value));
				$this.find('.value').trigger('widthChange', r_value);
				$this.find('input').val(r_value)
			}).mousemove(function(pos) {
				var $this = $(this),
				r_value = valueByWidth(pos.clientX - $this.offset().left);
				$this.find('.value').addClass("cf_val");
				$this.find('.value').width(widthByValue(r_value));
				$this.find('.value').trigger('widthChange', r_value)
			}).mouseleave(function() {
				var $this = $(this),
				r_value = $this.find('input').val();
				$(this).find('.value').width(widthByValue(r_value));
				$(this).find('.value').removeClass("cf_val");
				$(this).find('.value').trigger('widthChange', r_value)
			});
			$('.service_rating .rating .value').bind('widthChange',
			function(event, value) {
				var $hintContainer = $(this).parents('.service_rating').find('.hint');
				switch (parseInt(value)) {
				case 0:
					$hintContainer.text('');
					break;
				case 1:
					$hintContainer.text('非常差');
					break;
				case 2:
					$hintContainer.text('差');
					break;
				case 3:
					$hintContainer.text('一般');
					break;
				case 4:
					$hintContainer.text('好');
					break;
				case 5:
					$hintContainer.text('非常好');
					break
				}
			});
			$('.service_rating .rating .value').each(function() {
				var value = $(this).find('input').val();
				if (value == 0) {
					$(this).width(0)
				} else {
					$(this).width(widthByValue(value))
				}
				$(this).trigger('widthChange', value)
			})
		};
		function valueByWidth(width) {
			var value = parseInt(width / STAR_WIDTH + 1);
			value = Math.max(Math.min(value, 5), 1);
			return value
		}
		function widthByValue(value) {
			return parseInt(value) * STAR_WIDTH
		}
	},
	enableTabSwitch: function() {
		$this = $(".tab_group");
		if ($this.length > 0) {
			$this.each(function(index) {
				var groupName = $(this).attr('group_name');
				var bindMethod = $(this).attr('bind_method');
				$(this).find('a').bind(bindMethod,
				function(event) {
					var show = $(this).attr('show');
					$(this).addClass('selected');
					$(this).siblings('a').removeClass('selected');
					$('.' + groupName).hide();
					$('#' + show).show()
				})
			})
		}
	},
	help_left_nav: function() {
		var containers = $('.nav .nav_sub .menu_list li');
		if (containers.length <= 0) {
			return false
		}
		var expand = function(box, arrow) {
			var status = box.css('display');
			if (status == 'block') {
				arrow.removeClass("down");
				box.hide()
			} else {
				arrow.addClass("down");
				box.show()
			}
		};
		containers.each(function() {
			var trigger = $(this).find('.first_category'),
			arrow = $(this).find('.arrow'),
			box = $(this).find('.second_category');
			if (box.length > 0) {
				trigger.click(function() {
					expand(box, arrow)
				})
			}
		});
		var cur_page = $('#Z_Page_Label').val(),
		cur_nav = $('#' + cur_page),
		cur_box,
		cur_arrow;
		$(cur_nav).addClass("selected");
		if ($(cur_nav).parent().hasClass("second_category")) {
			cur_box = $(cur_nav).parent();
			cur_arrow = cur_box.prev().find('.arrow');
			expand(cur_box, cur_arrow)
		}
	},
	enableFavorite: function() {
		var  $favorite_list=$("#favorite_list");
		var  $tr_favorite_list=$("#favorite_list tr.alt");
		var delFavoriteSingle = function() {
			var goods_id = $(this).closest("tr").attr('id');
			var url = '/membership/ajax/dislike';
			var params ='goods_ids[]=' + goods_id + '&tr_ids[]=' + goods_id;
			var respHandle = function(data) {
				if(data.error_no==0) {
					for(var i in data.error_callback) {
						$("#"+data.error_callback[i]).remove();
					}
				} else {
					alert(data.error_msg);
				}
			};
			$.post(url, params, respHandle);
		};

		$('.del-favorite').click(delFavoriteSingle);		//单个删除
	},
	enableAccountShow: function() {
		var $btn_get_contonpads = $("#btn_get_contonpads");
		var getContonPads = function() {
			if($(this).attr("get")=="true") {
				alert("领取失败！\n\n您本月已经领取过一次了！");
				return false;
			}
			$.post(
				'/activity/ajax/checkcottonpads',
				function(res) {
					if (res.errorno == -1){
						var redirect = escape('/activity/getcottonpads.html');
						window.location.href="/account/login?redirect="+redirect;
					} else if(res.errorno == 0) {
						alert("领取成功！\n\n请到到购物车查看。");
						$(this).attr("get","true");
					} else if (res.errorno == -2){
						alert("领取失败！\n\n您没有领取权限！");
						return false;
					} else if (res.errorno == -3){
						alert("领取失败！\n\n您本月已经领取过一次了！");
						return false;
					} else {
						alert('领取失败！');
						return false;
					}
				});
		};
		$btn_get_contonpads.click(getContonPads);
	},
	enableReceiveCoupons: function(){
		$("#search_key").focusin(function() {
			if ($(this).val() == '请输入活动码') {
				$(this).val('');
			}
		}).focusout(function() {
			if ($(this).val() == '') {
				$(this).val('请输入活动码');
			}
		});
		$("#receive").click(function(){
			var act_key=$("#search_key").val();
			$.post('receive/coupons',{act_key:act_key},
				function(data){
				if(data==-1){alert("没有此活动，请核对活动码，重新输入！");}
				if(data==-2){alert("此活动不发放优惠券！");}
				if(data==-3){alert("没有设置优惠券!");}
				if(data==-4){alert("活动已结束！");}
				if(data==-5){alert("活动还没有开始！");}
				if(data==-6){alert("发放失败!");}
				if(data==0){alert("成功发放优惠券!");window.location.href="/membership/coupons"}
				if(data==-7){alert("已领取过优惠券，生成新的订单可再次领取优惠券！");}
				if(data==-8){alert("已参加过活动，生成新的订单可再次领取优惠券！");}
				if(data==-3){alert("没有设置优惠券!");}
				},"json"
			);
		});
		$("#search_key").keydown(function(event){if(event.keyCode==13){
		var act_key=$("#search_key").val();
			$.post('receive/coupons',{act_key:act_key},
				function(data){
				if(data==-1){alert("没有此活动，请核对活动码，重新输入！");}
				if(data==-2){alert("此活动不发放优惠券！");}
				if(data==-3){alert("没有设置优惠券!");}
				if(data==-4){alert("活动已结束！");}
				if(data==-5){alert("活动还没有开始！");}
				if(data==-6){alert("发放失败!");}
				if(data==0){alert("成功发放优惠券!");window.location.href="/membership/coupons"}
				if(data==-7){alert("已领取过优惠券，生成新的订单可再次领取优惠券！");}
				if(data==-8){alert("已参加过活动，生成新的订单可再次领取优惠券！");}
				if(data==-3){alert("没有设置优惠券!");}
				},"json"
			);
		}})
	},
	repwdSendmail: function() {
		var sEmail = $(":text[name='email']").val();
		if (sEmail == "") {
			$("#fwPromptID").html("请您输入邮箱！");
			return false;
		}

		var pattern = Zhiwo.Account.validationDefault.regex.email;
		if ( !pattern.test(sEmail) ) {
			$("#fwPromptID").html("您输入的邮箱格式不正确！");
			return false;
		}

		$("#fwPromptID").html("");
		return true;
	},
	resetpwd: function() {
		//输入密码
		var $this_password = $('#resetpwdform .password');
		if ($this_password.length > 0) {
			$this_password.each(function(index) {
				var $this = $(this).find('input[name=password]');
				$this.attr('isValid', false);
				$this.focusout(function() {
					validatePassword.call($this, true, true, $this.parent().siblings('.error'));
					if ($this_password.siblings('.password2').children().children('input').val() != "") {
						$this_password.siblings('.password2').children().children('input').trigger('focusout')
					}
				}).focusin(function() {
					$this.parent().siblings('.error').html('');
				})
			})
		};
		//输入重复密码验证
		var $this_password2 = $('#resetpwdform .password2');
		if ($this_password2.length > 0) {
			$this_password2.each(function(index) {
				var $this = $(this).find('input[name=password2]');
				$this.attr('isValid', false);
				$this.focusout(function() {
					validatePasswordConfirm.call($this, $this_password2.siblings('.password').children().children('input').val(), true, true, $this.parent().siblings('.error'))
				}).focusin(function() {
					$this.parent().siblings('.error').html('');
				})
			})
		};
		//输入密码验证
		function validatePassword(shouldShowSuccessMessage, shouldShowErrorMessage, messageContainer) {
			var isValid = false;
			var message = '';
			var $this = this;
			var password = $this.val();
			isValid = password.length > 5 && password.length<16 ? true: false;
			if (!isValid) {
				message = '密码长度需6-16位字符';
			}
			$this.parent().siblings('.error').html(message);
			$this.attr('isValid', isValid)
		};
		//输入重复密码验证
		function validatePasswordConfirm(password, shouldShowSuccessMessage, shouldShowErrorMessage, messageContainer) {
			var isValid = false;
			var message = '';
			var $this = this;
			var confirmPassword = $this.val();
			if (password.length != 0) {
				isValid = (password == confirmPassword) ? true: false;
				if (!isValid) {
					if (confirmPassword.length == 0) {
						message = '请输入确认密码！';
					} else {
						message = '两次输入的密码不匹配';
					}
				}
				$this.parent().siblings('.error').html(message);
			}
			$this.attr('isValid', isValid)
		};
		//表单
		var $this_resetpwdform = $('#resetpwdform');
		if ($this_resetpwdform.length > 0) {
			$this_resetpwdform.each(function(index) {
				var $this = $(this);
				$this.submit(function() {
					submitForm.call($this);
					return parseBool($this.attr('allValid'))
				})
			})
		};

		//提交表单
		function submitForm() {
			var allValid = true;
			$this = this;
			$this.find('input').each(function(index) {
				if ($(this).attr('isValid') != null && !parseBool($(this).attr('isValid'))) {
					allValid = false;
					$(this).trigger('focusout');
				}
			});
			$(this).attr('allValid', allValid)
		};
	}
};
