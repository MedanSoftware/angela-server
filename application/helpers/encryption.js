var cryptojs = require('crypto-js');

/**
 * base64 encode
 * 
 * @param  {String} string
 * @return {String}
 */
module.exports.base64_encode = (string) => {
	return cryptojs.enc.Base64.stringify(cryptojs.enc.Utf8.parse(string));
}

/**
 * base64 decode
 * 
 * @param  {String} hash
 * @return {String}
 */
module.exports.base64_decode = (hash) => {
	return cryptojs.enc.Utf8.stringify(cryptojs.enc.Base64.parse(hash));
}

/**
 * md5
 * 
 * @param  {String} string
 * @return {String}
 */
module.exports.md5 = (string) => {
	return cryptojs.MD5(string).toString();
}

/**
 * sha1
 * 
 * @param  {String} string
 * @return {String}
 */
module.exports.sha1 = (string) => {
	return cryptojs.SHA1(string).toString();
}