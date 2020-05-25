/**
 * array object find value
 * 
 * @param  {Array} arrayName
 * @param  {String} searchKey
 * @param  {String} searchValue
 * @return {Mixed}
 */
module.exports.arrayobject_find_value = (arrayName, searchKey, searchValue) => {
	let find = arrayName.findIndex(i => i[searchKey] === searchValue);
	return (find !== -1)?find:false;
}

/**
 * foreach
 * 
 * @param  {Array/Object} obj
 * @param  {String} iterator
 * @return {String}
 */
module.exports.foreach = (obj, iterator) => {
	if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
		obj.forEach(iterator)
	} else if (obj.length === +obj.length) {
		for (var i = 0, l = obj.length; i < l; i++) {
			iterator(obj[i], i, obj)
		}
	} else {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				iterator(obj[key], key, obj)
			}
		}
	}
}