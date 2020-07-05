module.exports = (sequelize, DataTypes) => {
	var Site = sequelize.define('Site',{
		id : {
			type : DataTypes.BIGINT.UNSIGNED,
			primaryKey : true,
			autoIncrement : true
		},
		owner : {
			type : DataTypes.BIGINT.UNSIGNED
		},
		api_key : {
			type : DataTypes.STRING(10)
		},
		url : {
			type : DataTypes.STRING(240)
		},
		name : {
			type : DataTypes.STRING(240)
		},
		webpush_key : {
			type : DataTypes.STRING(10)
		},
		description : {
			type : DataTypes.STRING(240),
			allowNull : true
		},
		status : {
			type : DataTypes.ENUM('active', 'non-active', 'banned')
		}
	});

	return Site;
};