var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	//TODO: SERVER
	var list = [
		{
			"name": "宋江",
			"tel": "13245678904",
			"partment": "框架",
			"email": "songjiang@ctrip.com"
		},
		{
			"name": "武松",
			"tel": "13245678905",
			"partment": "酒店",
			"email": "wusong@ctrip.com"
		},
		{
			"name": "无用",
			"tel": "13245678906",
			"partment": "商旅",
			"email": "wuyong@ctrip.com"
		},
		{
			"name": "李逵",
			"tel": "13245678907",
			"partment": "团队游",
			"email": "likui@ctrip.com"
		},
		{
			"name": "公孙胜",
			"tel": "13245678908",
			"partment": "搜索",
			"email": "gongsunsheng@ctrip.com"
		},
		{
			"name": "关胜",
			"tel": "13245678909",
			"partment": "机票",
			"email": "guansheng@ctrip.com"
		},
		{
			"name": "林冲",
			"tel": "13245678910",
			"partment": "团购",
			"email": "linchong@ctrip.com"
		},
		{
			"name": "卢俊义",
			"tel": "13245678911",
			"partment": "机酒",
			"email": "lujunyi@ctrip.com"
		}
	];
	
	res.render('user', {
		title: '通讯录',
		header_title: '联系人',
		back: true,
		list: list
	});
});

module.exports = router;