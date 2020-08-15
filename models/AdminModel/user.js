var db = require.main.require('./models/database/database');

module.exports ={

	get: function(id, callback){
		var sql = "select * from users where id="+id;
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	getAllEmp: function(callback){
		var sql = "select * from users where usertype!='admin'";
		console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	getEmpById: function(id,callback){
		var sql = "select * from users where id="+id;
		//console.log(sql);
		db.getResults(sql, function(result){
			if(result.length > 0){
				//console.log(result);
				callback(result[0]);
			}else{
				callback([]);
			}
		});
	},

	userValidation: function(user, callback){
		var sql = "select * from users where username='"+user.uname+"' and password='"+user.password+"'";
		//console.log(sql);
		db.getResults(sql, function(result){
			console.log(result);
			if(result.length > 0){
				callback(result);
			}else{
				callback([]);
			}
		});
	},

	addUser: function(user, callback){
		var sql = "insert into users values('', '"+user.fullname+"', '"+user.phone+"', '"+user.gender+"','"+user.username+"','"+user.password+"','"+user.designation+"','"+user.designation+"')";
		console.log(user);
		console.log(sql);
		db.execute(sql, function(insertId){
					if(insertId>0){
						callback(true);
			}
			else
				callback(false);
			// if(status){
			// 	callback(true);
			// }else{
			// 	callback(false);
			// }
		});
	},

	userUpdate: function(user, callback){
		var sql = "update users set fullname='"+user.username+"',phone='"+user.phone+"',gender='"+user.gender+"',username='"+user.username+"',password='"+user.password+"',designation='"+user.designation+"' where id="+user.id+" ";
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	userDelete: function(id, callback){
		var sql = "delete from users where id="+id;
		db.execute(sql, function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	blockUser: function(id, callback){
		var sql = "UPDATE users SET permission=0 where id="+id;
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				console.log('true');
				callback(true);
			}else{
				console.log('false');
				callback(false);
			}
		});
	},
	unblockUser: function(id, callback){
		var sql = "UPDATE users SET permission=1 where id="+id;
		console.log(sql);
		db.execute(sql, function(status){
			if(status){
				console.log('true');
				callback(true);
			}else{
				console.log('false');
				callback(false);
			}
		});
	}
}
