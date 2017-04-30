var compose = (...fns) => function(val) {
	function r(fns) {
		if (!fns.length) return val;
		else return fns[0](r(fns.slice(1)));
	}
	return r(fns);
}

class Either {
	constructor(value) {
		this._value = value;
	}
	get value() {
		return this._value;
	}
	static left(a) {
		return new Left(a);
	}
	static right(a) {
		return new Right(a);
	}
	static fromNullable(val) {
		return val ? Either.right(val) : Either.left(val);
	}
	static of (a) {
		return Either.right(a);
	}
}
class Left extends Either {
	map(_) {
		return this;
	}
	get value() {
		throw new TypeError("Can't extract the value of a Left.");
	}
	getOrElse(other) {
		return other;
	}
	orElse(f) {
		return f(this._value);
	}
	chain(_) {
		return this;
	}
	getOrElseThrow(a) {
		throw new Error(a);
	}
	filter(_) {
		return this;
	}
	toString() {
		return `Either.Left(${this.value})`;
	}
}
class Right extends Either {
	map(f) {
		return Either.of(f(this.value));
	}
	getOrElse(_) {
		return this.value;
	}
	orElse(_) {
		return this;
	}
	chain(f) {
		return Either.fromNullable(f(this.value));
	}
	getOrElseThrow(_) {
		return this.value;
	}
	filter(f) {
		return f(this.value) ? Either.right(this.value) : Either.left(this.value);
	}
	toString() {
		return `Either.Right(${this.value})`;
	}
}

var isNotEmpty = arr => arr.length ? true : false;

var removeEmpty = arr => {
	var newArr = [];
	arr.forEach(item => {
		if (item) newArr.push(item)
	});
	return newArr;
}

var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/csv';
var find = col => MongoClient.connect(url, function(err, db) {
	db.collection(col).find({}).limit(10).toArray(function(err, docs) {

		console.log(
			Either.of(docs).filter(isNotEmpty).
      map(arr => arr.map(x => x.CheeseNameFr)).map(removeEmpty)
		);

	});
	db.close();
});

process.stdin.on('data', function(col) {
	find( col.toString().match(/.*[^\n]/)[0] );
});
