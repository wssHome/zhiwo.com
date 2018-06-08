var Zhiwo = Zhiwo || {};
Zhiwo.Footer = {
	init : function()
	{
	}
};

//baidu统计
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F847ad921252038e1bbad55b2b00628d8' type='text/javascript'%3E%3C/script%3E"));

//google 统计
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-67414661-1', 'auto');
ga('send', 'pageview');

//第三方合作
var _mvq = _mvq || [];
_mvq.push(['$setAccount', 'm-449-1']);
_mvq.push(['$logConversion']);
(function() {
	var mvl = document.createElement('script');
	mvl.type = 'text/javascript'; mvl.async = true;
	mvl.src = ('https:' == document.location.protocol ? 'https://static-ssl.mediav.com/mvl.js' : 'http://static.mediav.com/mvl.js');
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(mvl, s); 
})();	

//
var j_protocol = (location.protocol == "https:");
var gtmac="833";
document.write('<script type="text/javascript" async="async" src="'+ (j_protocol ? "https://sslcdn.istreamsche.com" : "http://ga.istreamsche.com") +'/stat/j_REACH.js"></scri'+'pt>');

//
var _gtc = _gtc || [];
_gtc.push(["fnSetAccount", "833"]);
document.write("<script type=\"text/javascript\" async=\"async\" src=\""+ ((location.protocol == "https:")? "https://sslcdn.istreamsche.com":"http://ga.istreamsche.com") +"/stat/gtc.js\"></scri"+"pt>");

//
var _trc_=_trc_ || {}, _prm_=_prm_ || {};  (function() {  var e = document.createElement("script");  e.src = "//trac.imarvelous.cn/tracking.js?462ee408f8f8a1a0a0adbe5b5cc8853b";  var s = document.getElementsByTagName("script")[0];  s.parentNode.insertBefore(e, s);  })();

