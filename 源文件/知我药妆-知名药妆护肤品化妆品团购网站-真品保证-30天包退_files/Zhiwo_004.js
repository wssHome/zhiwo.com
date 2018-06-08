/**
 * Ntalker客户通代码部署
 */

NTKF_PARAM = {};
NTKF_PARAM.siteid = "kf_9913";
NTKF_PARAM.settingid = "kf_9913_1354149025526";
if(zhiwoUID > 0) {
	NTKF_PARAM.uid = zhiwoUID;
	NTKF_PARAM.uname = zhiwoLoginName;
}

NTKF_PARAM.ntalkerparam = {};

if (RUN_CONTROL == 'Group' && RUN_ACTION == 'detail')
{
	// NTKF_PARAM.itemid = '0'+goods_id;

	NTKF_PARAM.ntalkerparam.item = {};
	NTKF_PARAM.ntalkerparam.item.id = '0' + G.goods.goodsId;

	// console.info(NTKF_PARAM);
}
else if (RUN_CONTROL == 'Seaamoy' && RUN_ACTION == 'detail')
{
    // NTKF_PARAM.itemid = '0'+goods_id;

    NTKF_PARAM.ntalkerparam.item = {};
    NTKF_PARAM.ntalkerparam.item.id = '0' + G.goods.goodsId;

     //console.info(NTKF_PARAM);
}

else if (RUN_CONTROL == 'Mall' && RUN_ACTION == 'product')
{
	// NTKF_PARAM.itemid = goods_id;

	NTKF_PARAM.ntalkerparam.item = {};
	NTKF_PARAM.ntalkerparam.item.id = G.goods.goodsId;

	// console.info(NTKF_PARAM);
}
else if (RUN_CONTROL == 'Cart' && RUN_ACTION == 'pay') 
{
	NTKF_PARAM.orderid = G.order.order_id;
	NTKF_PARAM.orderprice = G.order.order_sumprice;

	// console.info(NTKF_PARAM);
}
else if (RUN_CONTROL == 'Cart' && RUN_ACTION == 'show')
{
	NTKF_PARAM.ntalkerparam.cartprice = $("#item-buy-total-t").text();
	NTKF_PARAM.ntalkerparam.items = [];

	var p = 0;
	$("input").each(function() {
		var itemKey = $(this).attr("item_key");
		if (itemKey != undefined) {
			var sep = itemKey.indexOf("_");
			if (sep > 0) {
				var type = itemKey.substr(0, sep);
				if (type == "mall" || type == "group") {
					var goodsId = parseInt(itemKey.substr(sep + 1)); // 商品ID
					if (type == "group") {
						goodsId = '0' + goodsId;
					}

					var count = parseInt($(this).val()); // 购买数量
					NTKF_PARAM.ntalkerparam.items[p++] = {
						"id" : goodsId,
						"count" : count
					}
				}
			}
		}
	});

	// console.info(NTKF_PARAM);
}
else if (RUN_CONTROL == 'Cart' && RUN_ACTION == 'confirmation')
{
	NTKF_PARAM.ntalkerparam.cartprice = $("#need_amount_").text();
	NTKF_PARAM.ntalkerparam.items = [];

	var p = 0;
	$("#cart_products").find(".cart_item").each(function() {
		var itemKey = $(this).attr("id");
		if (itemKey != undefined) {
			var sep = itemKey.indexOf("_");
			if (sep > 0) {
				var type = itemKey.substr(0, sep);
				if (type == "mall" || type == "group") {
					var goodsId = parseInt(itemKey.substr(sep + 1)); // 商品ID
					if (type == "group") {
						goodsId = '0' + goodsId;
					}

					var count = parseInt($(this).find(".number_box").text()); // 购买数量
					NTKF_PARAM.ntalkerparam.items[p++] = {
						"id" : goodsId,
						"count" : count
					}
				}
			}
		}
	});

	// console.info(NTKF_PARAM);
}
else if (RUN_CONTROL == 'Mall' && RUN_ACTION == 'products')
{
	var url = window.location.href;
	var ids = url.substr(url.indexOf("products/") + 9);
	var sep = ids.indexOf(".");
	if (sep > 0) { ids = ids.substr(0, sep); }

	var tmpIds = ids.split("-");
	ids = []; p = 0;
	for (var i in tmpIds) {
		ids[p++] = parseInt(tmpIds[i]);
	}

	var brandId = ids[0] != undefined ? ids[0] : 0;
	var catId = ids[1] != undefined ? ids[1] : 0;
	var efficacyId = ids[2] != undefined ? ids[2] + 10000 : 10000;

	var priceInterval = ['', '0-50元', '50-100元', '100-200元', '200-500元', '500-1000元', '1000元以上'];
	var pIndex = ids[5] != undefined ? ids[5] : 0;
	var price = priceInterval[pIndex] != undefined ? priceInterval[pIndex] : "";

	NTKF_PARAM.ntalkerparam.categoryid = catId;
	NTKF_PARAM.ntalkerparam.brandid = brandId;
	NTKF_PARAM.ntalkerparam.efficacyId = efficacyId;
	NTKF_PARAM.ntalkerparam.price = price;

	// console.info(NTKF_PARAM);
}

$(function() {
	$('#online_service').on('click', function () {
		NTKF.im_openInPageChat('kf_9913_1354149025526');
		return false;
	});
	$('#sidebar_servers .sitem_btn').on('click', function () {
		NTKF.im_openInPageChat('kf_9913_1354149025526');
		return false;
	});
});
