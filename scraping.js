var express = require("express");
var app = express();
var request = require("request");
var cheerio = require("cheerio");
var port = process.env.PORT || 5000;


app.get("/",function(request,response){
	response.send("Hello Express!!");
});

app.get("/news/:text/:text2/:text3",function(req,response){
	var url = "http://www.prothomalo.com/" + req.params.text+"/"+ req.params.text2+"/"+ req.params.text3;
	request(url,function(err,resp,body){
		if(!err){
			var $ = cheerio.load(body);
			var title, details, source;
	        var news = { title : "", details : "", source : ""};

			var newsTitle = $(".right_title .title");
			var newsTitleText = newsTitle.text();

			var newsDetails = $(".jw_detail_content_holder");
			var newsDetails = newsDetails.text();

			var news = {
				"title" : newsTitleText,
				"details" : newsDetails
			};
			response.setHeader("Content-Type","application/json");
			response.send(news);
		}
		
	});
});

app.listen(port, function() {
	console.log('Our app is running on ' + port);
});