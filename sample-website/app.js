const http=require('http');
const routes=require('./routes.js');

http.createServer(function(req, res){
    console.log(req.url)
    routes.home(req, res);
    routes.user(req, res);
}).listen(3000, ()=>{
    console.log('Server started on http://localhost:3000')
});

