module.exports = (sequelize, DataTypes) => {
	var Identified_browser = sequelize.define('Identified_browser',{
		id : {
			type : DataTypes.BIGINT.UNSIGNED,
			primaryKey : true,
			autoIncrement : true
		},
		site_id : {
			type : DataTypes.BIGINT.UNSIGNED
		},
		device_id : {
			type : DataTypes.STRING(40)
		},
		unique_id : {
			type : DataTypes.STRING(40)
		},
		name : {
			type : DataTypes.STRING(10)
		},
		version : {
			type : DataTypes.STRING(10)
		},
		public_ip : {
			type : DataTypes.STRING(15),
			allowNull : true
		},
		local_ip : {
			type : DataTypes.STRING(15),
			allowNull : true
		},
		coordinate : {
			type : DataTypes.STRING,
			allowNull : true
		},
		pushable : {
			type : DataTypes.BOOLEAN,
			defaultValue : false
		},
		webpush : {
			type : DataTypes.TEXT,
			allowNull : true
		}
	});

	return Identified_browser;
};