const request = require('request');
const fs = require('fs');

var cheerio = require('cheerio');


// let start_url = "http://gifcc.com/thread-5415-1-1.html"



// request.get(start_url, function(error, response, body){
// 	console.log(response.statusCode)
	
// 	let gifurl = /http:\/\/wx2.sinaimg.cn[^>=]+gif/.exec(body)[0]
// 	console.log(gifurl)

// 	request(gifurl).pipe(fs.createWriteStream(gifurl.split('/')[4]))
	
// })



let start_url = "http://gifcc.com/forum-47-1.html";

function doDownload(page){
	console.log("=======start to parse page %d=========", page)
	let nurl = 'http://gifcc.com/forum-47-1.html'
	request.get(nurl, function(error, response, body){
		var $ = cheerio.load(body);
		var res = $('#waterfall li')
	    $('#waterfall li div a').each(function(value,element){
	    	if(element['attribs']['href'].startsWith('thread')){
	    		console.log('start parse ','http://gifcc.com/'+element['attribs']['href'])
	    		request.get('http://gifcc.com/'+element['attribs']['href'], function(error, response, body){
					console.log(response.statusCode)
					try{
						let gifurl = /http:\/\/[\w\/.]+.gif\b/.exec(body)[0]
						console.log(gifurl)
						request(gifurl).pipe(fs.createWriteStream(gifurl.split('/')[4]))
						console.log('download job Done')
					}catch(err){
						console.log('parse error,,,,,', element['attribs']['href'])
					}
					
		
				})
	    	}

	    })	
	})
}

doDownload(12)


