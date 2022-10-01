module.exports.square = function(num) {
	return num ** 2;
}

module.exports.cube = function (num) {
	return num ** 3;
}

module.exports.avg = function (arr) {
	return sum(arr, 1) / arr.length;
}

module.exports.digitsSum = function(num) {
	return sum(String(num).split(''));
}

// допоміжних функція
function sum(arr) {
	let res = 0;
	for (let elem of arr) {
		res += +elem;
	}
	return res;
}