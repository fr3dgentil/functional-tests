// Monad Maybe
class Maybe {
	static just(a) {
		return new Just(a);
	}
	static nothing() {
		return new Nothing();
	}
	static fromNullable(a) {
		return a !== null ? new Just(a) : new Nothing();
	}
	static of (a) {
		return new Just(a);
	}
	get isJust() {
		return false;
	}
	get isNothing() {
		return false;
	}
}
class Just extends Maybe {
	constructor(value) {
		super();
		this._value = value;
	}
	get value() {
		return this._value;
	}
	map(f) {
		return Maybe.fromNullable(f(this.value));
	}
	getOrElse() {
		return this.value;
	}
	filter(f) {
		return Maybe.fromNullable(f(this.value) ? this.value : null);
	}
	get isJust() {
		return true;
	}
	toString() {
		return `Maybe.Just(${this.value})`;
	}
}
class Nothing extends Maybe {
	map() {
		return this;
	}
	get value() {
		throw new TypeError(`Can't extract the value of a Nothing.`);
	}
	getOrElse(other) {
		return other;
	}
	filter() {
		return this.value;
	}
	get isNothing() {
		return true;
	}
	toString() {
		return 'Maybe.Nothing';
	}
}

// Usage exemple:

// var isEven = x => x % 2 === 0 ? true : false;
// console.log( Maybe.of(1).filter(isEven).map(x => ++x) );
// 8787878
// console.log( new Nothing('hehe') )

module.exports = Maybe;
