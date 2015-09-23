var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	//TODO: get data from server
	var List = [
		{
			"partment": "框架",
			"type": "前端研发",
			"color": "#00AFC9"
		},
		{
			"partment": "机票",
			"type": "后端研发",
			"color": "#FFD600"
		},
		{
			"partment": "机票",
			"type": "用户产品",
			"color": "#126AFF"
		},
		{
			"partment": "框架",
			"type": "数据产品",
			"color": "#F80728"
		},
		{
			"partment": "酒店",
			"type": "前端研发",
			"color": "#05C147"
		},
		{
			"partment": "酒店",
			"type": "数据产品",
			"color": "#F84CB4"
		},
		{
			"partment": "公共",
			"type": "前端产品",
			"color": "#EE810D"
		}
	];

	res.render('index', {
		title: 'test',
		header_title: '首页',
		back: false,
		list: list
	});
});

module.exports = router;