module.exports = (sequelize, DataTypes) => {
	var Online = sequelize.define('Online',{
		id : {
			type : DataTypes.BIGINT.UNSIGNED,
			primaryKey : true,
			autoIncrement : true
		},
		site_id : {
			type : DataTypes.BIGINT
		},
		group : {
			type : DataTypes.STRING(10)
		},
		user_id : {
			type : DataTypes.BIGINT,
			allowNull : true
		},
		device_id : {
			type : DataTypes.STRING(40)
		},
		browser_id : {
			type : DataTypes.STRING(40)
		},
		identify : {
			type : DataTypes.TEXT
		}
	});

	Online.associate = function(models) {
		this.belongsTo(models.User, { foreignKey : 'user_id', targetKey : 'id' });
	}

	return Online;
};