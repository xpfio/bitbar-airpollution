#!/usr/bin/env /usr/local/bin/node

// <bitbar.title>HK Air Quality</bitbar.title>
// <bitbar.version>v1.0</bitbar.version>
// <bitbar.author>Xavier</bitbar.author>
// <bitbar.author.github>xpfio</bitbar.author.github>
// <bitbar.desc>Hong Kong Air Quality</bitbar.desc>
// <bitbar.image>http://i.imgur.com/Kff8QSL.png</bitbar.image>
// <bitbar.dependencies>node</bitbar.dependencies>
// <bitbar.abouturl>TODO</bitbar.abouturl>

/* jshint -W100 */

var http = require('http');

function request(host, path) {
    return new Promise(function(resolve, reject) {
        http.request({
            host: host,
            path: path,
            method: 'GET'
        }, function(resp) {
            var body = '';
            resp.setEncoding('utf8');
            resp.on('data', function(chunk) {
                body += chunk;
            });
            resp.on('end', function() {
                resolve(JSON.parse(body));
            });
        }).end();
    });
}


request('api.waqi.info','/feed/here/?token=c7f0d89aa462f86752c0b85110c51a37ed7a7468').then(function(body) {
    if (body.data.aqi <= 50){
        console.log('💚' + body.data.aqi + '\n---');
    }
    else if (body.data.aqi <= 100){
        console.log('💛' + body.data.aqi + '\n---');
    }
    else if (body.data.aqi <= 150){
        console.log('💔' + body.data.aqi + '\n---');
    }
    else if (body.data.aqi <= 200){
        console.log('☠' + body.data.aqi + '\n---');
    }
    else {
        console.log('⚰' + body.data.aqi + '\n---');
    }
});