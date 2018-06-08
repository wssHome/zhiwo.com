/*
 * jQuery placeholder, fix for IE6,7,8,9
 * @author JENA
 * @since 20131115.1504
 * @website ishere.cn
 */
var JPlaceHolder = {
    //检测
    _check : function(){
        return 'placeholder' in document.createElement('input');
    },
    //初始化
    init : function(){
        if(!this._check()){
            this.fix();
        }
    },
    //修复
    fix : function(){
        $(':input[placeholder],textarea[placeholder]').each(function(index, element) {
            var self = $(this), 
                txt = self.attr('placeholder');
            
            var pos = self.position(),
                h = self.outerHeight(true), 
                paddingleft = self.css('padding-left');

            var holder = $('<i class="inputtip"></i>').text(txt).appendTo(self.parent());
            self.focus(function() {
                holder.hide();
            }).blur(function(e) {
                if(!self.val()){
                    holder.show();
                }
            });
            holder.click(function(){
                holder.hide();
                self.focus();
            });
        });
    }
};
