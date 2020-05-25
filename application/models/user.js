module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('User',{
		id : {
			type : DataTypes.BIGINT.UNSIGNED,
			primaryKey : true,
			autoIncrement : true
		},
		email : {
			type : DataTypes.STRING(320)
		},
		username : {
			type : DataTypes.STRING(16)
		},
		password : {
			type : DataTypes.STRING(40)
		},
		first_name : {
			type : DataTypes.STRING(40)
		},
		last_name : {
			type : DataTypes.STRING(40)
		},
		profile_picture : {
			type : DataTypes.STRING(10)
		},
		status : {
			type : DataTypes.ENUM('active', 'non-active', 'pending', 'temporarily_banned', 'banned')
		}
	});

	User.associate = function(models) {
	}

	return User;
};