module.exports = (sequelize, DataTypes) => {
	var Site_user = sequelize.define('Site_user',{
		id : {
			type : DataTypes.BIGINT.UNSIGNED,
			primaryKey : true,
			autoIncrement : true
		},
		site_id : {
			type : DataTypes.BIGINT
		},
		user_uid : {
			type : DataTypes.STRING(320)
		},
		first_name : {
			type : DataTypes.STRING(40)
		},
		last_name : {
			type : DataTypes.STRING(40)
		},
		full_name : {
			type : DataTypes.STRING(40)
		},
		picture : {
			type : DataTypes.STRING(320)
		}
	});

	Site_user.associate = function(models) {
	}

	return Site_user;
};