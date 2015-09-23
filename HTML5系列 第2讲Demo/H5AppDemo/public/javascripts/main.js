(function($, window, undefined){
	
	$('.lixianren_item').on('click', function(e){
		//TODO: var el = e.srcElement || e.target;
		//TODO: 根据type和partment加载数据，这里演示统一处理数据
		location.href ='/user';
		
		
	});
	
	
	$('.app_back').on('click', function(){
		location.href = '/';
	});
	
})($, window, undefined);
