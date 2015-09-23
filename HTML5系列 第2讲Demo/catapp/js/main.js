var App = (function() {
	var pages = {};
	var run = function() {
		$.each(pages, function(k, v) {
			var sectionId = '#' + k + '_section';
			$('body').delegate(sectionId, 'pageinit', function() {
				v.init && v.init.call(v);
			});
			$('body').delegate(sectionId, 'pageshow', function(e, isBack) {
				//页面加载的时候都会执行
				v.show && v.show.call(v);
				//后退时不执行
				if (!isBack && v.load) {
					v.load.call(v);
				}
			});
		});
	
		J.Transition.add('flip', 'slideLeftOut', 'flipOut', 'slideRightOut', 'flipIn');
		Jingle.launch({
			showWelcome : true,
            welcomeSlideChange : function(i){
                switch(i){
                    case 0 :
                        J.anim('#welcome_jingle','welcome_jinlge',1000);
						setTimeout(function(){
							$("#css_jingle_welcome").remove();
							$("#jingle_welcome").remove();
							
						},1000)
						
                        break;
                    case 1 :
                        $('#r_head,#r_body,#r_hand_left,#r_hand_right,#r_foot_left,#r_foot_right').hide()
                        J.anim($('#r_head').show(),'r_head',500,function(){
                            J.anim($('#r_body').show(),'r_body',1200,function(){
                                J.anim($('#r_hand_left').show(),'r_hand_l',500);
                                J.anim($('#r_hand_right').show(),'r_hand_r',500,function(){
                                    J.anim($('#r_foot_left').show(),'r_foot_l',500);
                                    J.anim($('#r_foot_right').show(),'r_foot_r',500,function(){
                                        J.anim('#welcome_robot','welcome_robot',2000);
                                    });
                                });
                            });
                        });
                        break;
                    case 2 :
                        $('#w_box_1,#w_box_2,#w_box_3,#w_box_4').hide()
                        J.anim($('#w_box_1').show(),'box_l',500,function(){
                            J.anim($('#w_box_2').show(),'box_r',500,function(){
                                J.anim($('#w_box_3').show(),'box_l',500,function(){
                                    J.anim($('#w_box_4').show(),'box_r',500);
                                });
                            });
                        });
                        break;
                }
            },
			// welcomeSlideChange:false,
			showPageLoading: false,
			remotePage: {
				'#about_section': 'remote/about_section.html'
			}
		});
		setTimeout(function(){
			$('#App_section').addClass("active").show();
			
		},500)

	};
	var page = function(id, factory) {
		return ((id && factory) ? _addPage : _getPage).call(this, id, factory);
	}
	var _addPage = function(id, factory) {
		pages[id] = new factory();
	};
	var _getPage = function(id) {
		return pages[id];
	}

	//动态计算chart canvas的高度，宽度，以适配终端界面
	var calcChartOffset = function() {
		return {
			height: $(document).height() - 44 - 30 - 60,
			width: $(document).width()
		}

	};
	return {
		run: run,
		page: page,
		calcChartOffset: calcChartOffset
	}
})();



//打开监控页面
function AppMonitor() {
	var $lineChart = null;
	var $barChart = null;
	var $delay = null;
	var $request_c = null;
	var $request_vs = null;
	var $success_c = null;
	var $success_vs = null;
	var $request_A_c = null;
	var $request_A_vs = null;
	var $dely_c = null;
	var $dely_vs = null;
	
	var renderChart = function(type, data, data3) {
		if (type == 'request') {
			$lineChart.show();
			$barChart.hide();
			$delay.hide();
			new JChart.Line(data, {
				id: 'chart_drag_line_canvas',
				smooth: false,
				fill: false,
				datasetGesture: true,
				datasetOffsetNumber: 10
			}).draw(true);
			$('#chartTitle_sp').text('请求数（个/每分钟）');
			$success_c.text('95.736%');
			$success_vs.text('95.484%');
			$request_c.text('93,984');
			$request_vs.text('202,242');
			$request_A_c.text('100.000%');
			$request_A_vs.text('215.188%');
			$dely_c.text('12,614');
			$dely_vs.text('8,605');

		}

		if (type === 'success') {
			$lineChart.hide();
			$delay.hide();
			$barChart.show();
			new JChart.Line(data, {
				id: 'chart_drag_bar_canvas',
				datasetGesture: true,
				datasetOffsetNumber: 10
			}).draw(true);
			$('#chartTitle_sp').text('成功率（％/每分钟）');
			$success_c.text('96.736%');
			$success_vs.text('95.34%');
			$request_c.text('91,984');
			$request_vs.text('102,242');
			$request_A_c.text('100.000%');
			$request_A_vs.text('165.188%');
			$dely_c.text('12,634');
			$dely_vs.text('8,905');
		}

		if (type === 'delay') {
			$lineChart.hide();
			$barChart.hide();
			$delay.show();
			new JChart.Line(data3, {
				id: 'chart_drag_delay_canvas',
				datasetGesture: true,
				datasetOffsetNumber: 10,
				smooth: false,
				fill: false
			}).draw(true);
			$('#chartTitle_sp').text('超时平均值（毫秒/每分钟）');
			$success_c.text('97.736%');
			$success_vs.text('99.34%');
			$request_c.text('92,984');
			$request_vs.text('109,242');
			$request_A_c.text('100.000%');
			$request_A_vs.text('195.188%');
			$dely_c.text('12,834');
			$dely_vs.text('9,905');
		}
	};

	(function() {
		var wh = App.calcChartOffset();
		$lineChart = $('#chart_drag_line_canvas');
		$barChart = $('#chart_drag_bar_canvas');
		$delay = $('#chart_drag_delay_canvas');
		$success_c = $('#success_value_c');
		$success_vs = $('#success_value_vs');
		$request_c = $('#success_request_c');
		$request_vs = $('#success_request_vs');
		$request_A_c = $('#success_requestA_c');
		$request_A_vs = $('#success_requestA_vs');
		$dely_c = $('#success_delay_c');
		$dely_vs = $('#success_delay_c');
		
		var LINE_HEIGHT = 200;
		var newValue =  wh.height - LINE_HEIGHT;
		if(newValue < 200){
			 newValue = 200;
		}
		$lineChart.attr('width', wh.width).attr('height', newValue);
		$barChart.attr('width', wh.width).attr('height', newValue);
		$delay.attr('width', wh.width).attr('height', newValue);

		

		var data = {
			labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
			datasets: [{
				name: '当前值',
				color: "#368CE9",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [65, 59, 90, 81, 56, 55, 40, 20, 13, 20, 11, 60, 65, 59, 90, 81, 56, 55, 40, 20, 11, 20, 10, 60, 11, 60, 65]
			}, {
				name: '对比值',
				color: "#FFBB00",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [28, 48, 40, 19, 96, 27, 100, 40, 40, 70, 11, 89, 28, 48, 40, 19, 96, 27, 100, 40, 40, 70, 10, 89, 28, 48, 40]
			}]
		};

		var data3 = {
			labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
			datasets: [{
				name: '当前值',
				color: "#3C9BFD",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [165, 159, 90, 81, 56, 55, 40, 120, 13, 20, 11, 60, 165, 59, 390, 81, 56, 55, 840, 20, 11, 20, 10, 60, 11, 60, 65]
			}, {
				name: '对比值',
				color: "#FACC02",
				pointColor: "#00C349",
				pointBorderColor: "#fff",
				data: [28, 48, 140, 19, 96, 227, 100, 40, 40, 770, 11, 89, 28, 48, 40, 19, 96, 327, 100, 40, 40, 470, 10, 89, 28, 48, 40]
			}]
		};
		$('#changeDragChartType').on('change', function(e, el) {
			$lineChart.attr('width', wh.width).attr('height',newValue);
			$barChart.attr('width', wh.width).attr('height', newValue);
			$delay.attr('width', wh.width).attr('height', newValue);

			renderChart(el.data('type'), data, data3);

		})
		renderChart('request', data);
	})();
}


$("#module_list").delegate("li","tap",function(){
	var $li = $(this).find(">i");
	var href = $(this).data("href");
	var text = $(this).find("strong").text();
	if($(this).find(".alizarin").css("display")!=="none"){
		J.showToast("您现在有［"+$(this).find(".alizarin").html()+"］个错误警告！！",'error',1000);
	}
	
	$(this).find(".alizarin").hide();
	
	
	
	$(this).find(".alizarin").html(0);
	clearNotice();
	if($li.hasClass("next")){
		J.Router.goTo("#"+href);
	}else{
		$("#module_list").find(".next").removeClass("next");
		$li.addClass("next");
		
		
		if($("#"+href).length){
			J.Router.goTo("#"+href);
		}else{
			$("#empty_section").find(".title").text(text);
			J.Router.goTo("#empty_section");
		}
	}
})


$("#module_article").delegate("li","tap",function(){
	var $this = $(this);
	var $i = $(this).find(">i");
	var href = $this.data("href");
	var icon = $this.data("icons");
	var text = $this.text();
	console.log(this)
	
	if($i.hasClass("checkbox-unchecked")){
		$i.removeClass("checkbox-unchecked").addClass("checkbox-checked");
		$this.addClass("active");
		var $li = $('<li  data-selected="selected" class="" data-href="'+href+'" id="module_'+href+'"></li>');
		
	
		var html = [
			'	<i class="icon"></i>',
			'	<div class="tag alizarin">8</div>',
			'	<a >',
			'		<i class="icon '+icon+'"></i>',
			'		<strong>'+text+'</strong>',
			'	</a>'
		];
		$li.html(html.join(""));
		$li.appendTo($("#module_list"));
		//
	}else{
		if($this.hasClass("active")){
			$i.removeClass("checkbox-checked").addClass("checkbox-unchecked");
			$this.removeClass("active");
			console.log("module_"+href)
			console.log($("#module_"+href)[0])
			$("#module_"+href).remove();
			//
		}else{
		
		}
		
	}
});

function addModule(){
	
}
function deleteModule(){
	
}

function createProblem(){

//随机生成
	var data = [];
	var ids = [];
	for (var i = 0; i < 15; i++) {
		data[i] = Math.ceil(Math.random() * 1200);
		if(data[i] <= 70){
			data[i] = 70 + Math.ceil(Math.random()*10);
		}
		ids[i] = Math.ceil(Math.random() * 10000);
		if(ids[i] <= 1000){
			ids[i] = 1000 + Math.ceil(Math.random()*106);
		}
	}
	
	var tagValue = 0;　
	//排序
	for (i = 0; i < data.length; i++) {
		var min = data[i];
		var temp;
		var index = i;
		for (var j = i + 1; j < data.length; j++) {
			if (data[j] > min) {
				min = data[j];
				index = j;
			}
		}
	
		temp = data[i];
		data[i] = min;
		data[index] = temp;
	}
	//渲染
	console.log(data);
	console.log(ids);
	$('#__mychart').empty();
	$('#__ids').empty();
	
	for(i = 0; i< data.length; i++){
		var rate = Math.floor((data[i]/ data[0]) * 100) + '%';
		var color = '';
		if(data[i] >= 1000){
			color = '#E10B70';
		}
		if(data[i] >= 500 && data[i] < 1000){
			color = '#E6BC00';
		}
		if(data[i] < 500){
			color = '#3BC1FF';
		}
		
		var str = '<div onclick="showTip()" style="height:15px;padding-left:1px;box-sizing:border-box;background-color:';
		str += color + ';margin-bottom:4px;';
		str += 'width:' + rate + ';font-size:0.9em;color:#fff;font-style:italic;">';
		str += data[i] + '</div>'
		$('#__mychart').append(str);
		
		var idStr = '<div style="font-size:0.9em;color:#999;margin-bottom:2px;">';
		idStr += ids[i] + '</div>';
		$('#__ids').append(idStr);
	}
	
	window.showTip = function showTip(){
		$('#__id_tip').text("");
		var str = ['酒店产品查询服务器', '机票产品查询服务器', '汽车服务器', '商旅', '团队游'];
		var index = parseInt(Math.random() * 5);
		$('#__id_tip').text(str[index]);
	}
}
createProblem();				


App.page('add_module', function() {
	this.init = function() {
		
	}
})






App.page('app', function() {
	this.init = function() {
		// J.Scroll('#index_section nav.header-secondary', {
			// hScroll: true,
			// hScrollbar: false
		// });
		
		
		AppMonitor();
		$('#App_article').css('overflow', 'scroll');
		$('#index_section nav.header-secondary a').on('tap', function(e) {
			if (!$(this).hasClass("active")) {
				$(this).parent().find(".active").removeClass("active");
				$(this).addClass("active");
			}

			var text = $(this).text();
			var id = "#" + text + "_article";
			var noid = "#No_article";
			if ($(id).length) {
				J.Router.showArticle(id, $(id));
			} else {
				J.Router.showArticle(noid, $(noid));
			}


			if ($(e.srcElement).text() === 'App') {
				AppMonitor();
				$('#App_article').css('overflow', 'scroll');
			}

		})
		$('#index_section #btn_add_module').on('tap', function() {
			J.Router.goTo('#add_module');
		});

	}
});
function ramNotice(){
	var len = $("#module_list").find("li").length;
	var ram =Math.round(Math.random()*(len-1));
	var $li = $("#module_list").find("li").get(ram);
	var $alizarin = $($li).find(".alizarin");
	if($alizarin.css("display")!=="none"){
	
	}else{
		val = 0;
	}
	if(val==".."){
		curVla="..";
	}else{
		var val = $alizarin.text()*1;
		
		var curVla = val+1;
		if(curVla>9){
			curVla="..";
		}
	}
	
	$alizarin.text(curVla)
	$alizarin.show();
	clearNotice();
	autoPlay();
}
setInterval(function(){
	ramNotice();
},1000*8);
function clearNotice(){
	var len = 0;
	$("#module_list").find(".alizarin").each(function(){
		if($(this).css("display")!="none"){
			len = 1;
			return false
		}
	})
	console.log(len)
	if(len){
		$("header .alizarin").show();
	}else{
		$("header .alizarin").hide();
	}
}

var playHandle;

function autoPlay(){
	console.log("autoPlay");
	playHandle &&(clearTimeout(playHandle), playHandle=null);
	playHandle = setTimeout(function(){
		var myAuto = document.getElementById('myaudio');
		myAuto.play();
		setTimeout(function(){
			myAuto.pause();
		}, 1200);
	}, 1000);
	
}


$(function() {
	App.run();
});