var express = require('express');
var router = express.Router();
var userModel 	= require.main.require('./models/AdminModel/user');

router.get('/',function(req,res){
  if(req.session.usertype=="employee"){
  res.render('employee',{
    title:'Employee | Home'
  });
}
else{
  res.redirect('/Login');
}
});


router.get('/myProfile',function(req,res){
  if(req.session.usertype=="employee"){
var id=req.session.userId;
var label=['Name','Phone','Gender','Designation','Username','Password'];
    var data=[];
    userModel.getEmpById(id,function(result){
        data.push(result.fullname);
        data.push(result.phone);
        data.push(result.gender);
        data.push(result.designation);
        data.push(result.username);
        data.push(result.password);
        data.push(result.id);
      //console.log(data);
      res.render('profile',{
        msg:"",
        label:label,
        data:data
      });
  	});
}
else{
  res.redirect('/Login');
}
});


router.get('/Update',function(req,res){
  if(req.session.usertype=="employee"){
var id=req.session.userId;
var label=['Name','Phone','Gender','Designation','Username','Password'];
    var data=[];
    userModel.getEmpById(id,function(result){
        data.push(result.fullname);
        data.push(result.phone);
        data.push(result.gender);
        data.push(result.designation);
        data.push(result.username);
        data.push(result.password);
        data.push(result.id);
      //console.log(data);
      res.render('edit',{
        msg:"",
        label:label,
        data:data
      });
  	});
}
else{
  res.redirect('/Login');
}
});

router.post('/Update',function(req,res){
var id=req.query.id;
var data=[];
var label=['Name','Phone','Gender','Designation','Username','Password'];

data.push(req.body.fullname);
data.push(req.body.phone);
data.push(req.body.gender);
data.push(req.body.designation);
data.push(req.body.username);
data.push(req.body.password);
data.push(req.body.id);

var user={
  fullname:req.body.num0,
  phone:req.body.num1,
  gender:req.body.num2,
  designation:req.body.num3,
  username:req.body.num4,
  password:req.body.num5,
  id:id
}
// console.log(user);
userModel.userUpdate(user,function(result){
    res.redirect('/Admin/AllEmpList');
  });
//goAgain("Username Min Length 8 !");

//console.log(data);
// function goAgain(msg) {
//   res.render('edit',{
//     msg:msg,
//     label:label,
//     data:data
//     });
// }
});

router.get('/Delete',function(req,res){
if(req.session.username!=null){
    var id=req.query.id;
    userModel.userDelete(id,function(result){
      res.redirect('/Admin/AllEmpList');
    });
}
else{
  res.redirect('/Login');
}
});

router.get('/Search',function(req,res){
if(req.session.username!=null){
    //var id=req.query.id;
    console.log(req);
}
else{
  res.redirect('/Login');
}
});
module.exports = router;
