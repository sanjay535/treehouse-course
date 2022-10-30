function home(req, res){ 
    if(req.url==="/"){
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.write('Header\n')
        res.write('Body\n')
        res.end('Footer');
    }
    
}

function user(req, res){
   const username=req.url.replace('/','');
   if(username.length>0){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.write('Header\n')
    res.write(username+'\n')
    res.end('Footer');
   }
  
}

module.exports={
  home,
  user
}