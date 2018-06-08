/**
 * EMARBOX监测代码(EmarBox Tracking Code)部署
 */
(function() {
	//商品列表页加入购物车
	$(document).on('click','.put-cart.embox', function(){
		var d = $(this).attr('data').split('_');
		setItem('cart',d[0],d[1],d[2],d[3],d[4],d[5]);
	});
	function setItem(type,goods_id,goods_name,goods_price,goods_num,cat_id,cat_name) {
		var goods_num = goods_num || '1';
		var cat_id = cat_id || '';
		var cat_name = cat_name || '';
		_adwq.push(['_setDataType',type]);
		_adwq.push(['_setCustomer',zhiwoUID]);
		_adwq.push(['_setItem',goods_id,goods_name,goods_price,goods_num,cat_id,cat_name]);
		_adwq.push(['_trackTrans']);
		var isIE = !!document.all;
		var debug = (window.location.href).match(new RegExp("[\?\&]debug=true(\&?)","i"));
		if (!isIE && debug) {
			console.log(type,goods_id,goods_name,goods_price,goods_num,cat_id,cat_name);
		}
	}
	
	if (RUN_CONTROL == 'Cart' && RUN_ACTION == 'pay') {
		if (G.order.order_items.length > 0) {
			_adwq.push(['_setDataType', 'order']);
			_adwq.push(['_setCustomer', zhiwoUID]);
			_adwq.push(['_setOrder', G.order.order_id, G.order.order_sumprice]);
			for (var i=0; i<G.order.order_items.length; i++) {
				var goods_id = G.order.order_items[i][0];
				var goods_price = G.order.order_items[i][2];
				var goods_num = G.order.order_items[i][1];
				_adwq.push(['_setItem',goods_id,'',goods_price,goods_num,'','']);
			}
			_adwq.push(['_trackTrans']);
		}
	} else if (RUN_CONTROL == 'Cart' && RUN_ACTION == 'show') {
		$('.item-buy-delete').click(function () {
			var tr = $(this).parents('tr');
			var goods_id = tr.attr('id').split('_')[1];
			var goods_name = tr.find('.name').text();
				goods_name = $.trim(goods_name);
			var goods_price = tr.find('#item-buy-price-group_'+goods_id).text();
			var goods_num = tr.find('.item-buy-quantity-input').val();
			
			setItem('delete',goods_id,goods_name,goods_price,goods_num);
			return false;
		});
	} else if ( (RUN_CONTROL == 'Group' && RUN_ACTION == 'detail') || (RUN_CONTROL == 'Mall' && RUN_ACTION == 'product')) {
		//收藏
		$('#btn_favorite').click(function(){
			_adwq.push(['_setAction', '6vhsgg', zhiwoUID.toString(), G.goods.goodsId.toString() ]); 
		});
        
        //添加购物车
		$('#btn_add_cart').click(function() {
			var goods_num = $('#buy_number').val();
			setItem('cart',G.goods.goodsId.toString(), G.goods.name.toString(), G.goods.price.toString(), goods_num.toString(),G.goods.catId.toString(), G.goods.catName.toString());
		});
		
		//团购添加购物车
		$('#btn_buy').click(function() {
			setItem('cart',G.goods.goodsId.toString(), G.goods.name.toString(), G.goods.price.toString(), '1',G.goods.catId.toString(), G.goods.catName.toString());
		});
	}
})();
