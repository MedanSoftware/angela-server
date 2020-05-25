module.exports = (group) => {
	var database = {
		default : {
			'hostname'	: 'localhost',
			'username' 	: 'root',
			'password' 	: '',
			'database'	: 'angela',
			'dbdriver'	: 'mysqli',
			'dbprefix'	: '',
			'char_set'	: 'utf8mb4',
			'dbcollat'	: 'utf8mb4_unicode_ci'
		}
	}

	return database[group];
}