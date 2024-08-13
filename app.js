const express= require('express');
const app = express();
const userModel =require('./usermodel');
const path = require('path');
const { name } = require('ejs');



app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
   
app.get('/', function(req,res){
  res.render('index');
 
})


app.get('/read', async function(req,res){
  
  let allusers= await userModel.find()
  res.render('read', {users:allusers});
 
})


app.post('/create', async function(req,res){
 let {name, email, image}= req.body;

  let createduser= await userModel.create({
    name:name,
    email:email,
    image:image
  })
  res.redirect("/read");
}) 


app.get('/delete/:id',async function(req,res){

  let users= await userModel.findOneAndDelete({_id:req.params.id})

   res.redirect("/read");
 })


 app.get('/edit/:userid', async function(req,res){

  let user= await userModel.findOne({_id:req.params.userid})
  res.render('edit', {user});
 
})

app.post('/update/:userid', async function(req,res){
  let {name, email, image}= req.body;
  let user= await userModel.findOneAndUpdate({_id:req.params.userid}, {name, email, image}, {new:true})
  res.redirect("/read");
 
})
app.listen(3000);