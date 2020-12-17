
const express    = require('express');

const bodyParser = require("body-parser");
const app=express();

var request = require("request");
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var arr=[]

app.get("/", function(req, res){
   res.render("index2");
});


  app.get("/ppl", function(req, res){
      var url = "https://ppluserss.free.beeceptor.com/";
      request(url, function(error, response, body){
          if(!error && response.statusCode == 200) {
              var data = JSON.parse(body)
              if(arr.length==0){
                for(var i=0;i<data.length;i++){
                  arr.push(data[i]);
                }
              }

              res.render("index", {data: arr});
          }
      });
  });



app.get("/ppl/:id",function(req,res){
  var item=(req.params.id);
  for(i=0;i<arr.length;i++){
    if(arr[i].id==item){
      res.render('show',dat=arr[i]);
    }
  }
});


let port=process.env.PORT;
if(port==null || port==""){
  port=3000;
}

app.listen(port,function(){
  console.log('server running');
});

