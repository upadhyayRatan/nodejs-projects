var http=require('http');
var assert=require('assert');
var url = require('url');

assert(5<7);
var x = { a : { n: 0 } };
var y = { a : { n: 0 } };
var z = { a : { n: '0' } };
assert.deepEqual(x, y, "My message goes here");//throws error and terminate program if not true
//assert.deepStrictEqual(x,z)

var buffer=Buffer.from('abc')//converts abc to streams of binary data
var buf1=Buffer.alloc(15)//creates empty buffer
console.log(buffer);

var crypto = require('crypto');

var mykey = crypto.createCipher('aes-128-cbc', 'mypassword');
console.log("mykey",mykey);
var mystr = mykey.update('abc', 'utf8', 'hex')
mystr += mykey.final('hex');

console.log(mystr);

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/html'});
    //res.write(req.url);
    let x=url.parse(req.url,true).query;
    console.log(x)
    let q=url.parse(req.url,true).query;
    let text=q.year+" "+q.month ;
    res.end(text);
}).listen(8080);
