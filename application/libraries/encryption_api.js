var crypto_js = require('crypto-js');

class Encryption_api {

	constructor(encryption_key) {
        this.encryption_key = encryption_key;
    }

	// encrypt method length
	get encryptMethodLength()
	{
		var encryptMethod = this.encryptMethod;
		var aesNumber = encryptMethod.match(/\d+/)[0];
		return parseInt(aesNumber);
	}

	// encrypt size
	get encryptKeySize()
	{
		var aesNumber = this.encryptMethodLength;
		return parseInt(aesNumber / 8);
	}

	// encrypt method
	get encryptMethod()
	{
		return 'AES-256-CBC';
	}

	// encrypt
	encrypt(string, key)
	{
		var key = (key == undefined)?this.encryption_key:key;
		var iv = crypto_js.lib.WordArray.random(16);
		var salt = crypto_js.lib.WordArray.random(256);
		var iterations = 999;
		var encryptMethodLength = (this.encryptMethodLength/4);
		var hashKey = crypto_js.PBKDF2(key, salt, {'hasher': crypto_js.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});
		var encrypted = crypto_js.AES.encrypt(string, hashKey, {'mode': crypto_js.mode.CBC, 'iv': iv});
		var encryptedString = crypto_js.enc.Base64.stringify(encrypted.ciphertext);
		var output = {
			'ciphertext': encryptedString,
			'iv': crypto_js.enc.Hex.stringify(iv),
			'salt': crypto_js.enc.Hex.stringify(salt),
			'iterations': iterations
		};

		return crypto_js.enc.Base64.stringify(crypto_js.enc.Utf8.parse(JSON.stringify(output)));
	}

	// decrypt
	decrypt(encryptedString, key)
	{
		var key = (key == undefined)?this.encryption_key:key;
		var json = JSON.parse(crypto_js.enc.Utf8.stringify(crypto_js.enc.Base64.parse(encryptedString)));
		var salt = crypto_js.enc.Hex.parse(json.salt);
		var iv = crypto_js.enc.Hex.parse(json.iv);
		var encrypted = json.ciphertext;
		var iterations = parseInt(json.iterations);
		if (iterations <= 0) {
			iterations = 999;
		}
		var encryptMethodLength = (this.encryptMethodLength/4);
		var hashKey = crypto_js.PBKDF2(key, salt, {'hasher': crypto_js.algo.SHA512, 'keySize': (encryptMethodLength/8), 'iterations': iterations});
		var decrypted = crypto_js.AES.decrypt(encrypted, hashKey, {'mode': crypto_js.mode.CBC, 'iv': iv});

		return decrypted.toString(crypto_js.enc.Utf8);
	}
}

export { Encryption_api }