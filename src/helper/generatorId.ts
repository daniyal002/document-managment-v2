export function getId(length = 16) {
	let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	
	
	
		let res = Math.floor(Math.random() * chars.length);
	
	return res;
}