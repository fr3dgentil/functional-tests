// IO operations in a referentially transparent-ish way (Monad)

class IO {
	constructor(effect){
		this.effect = effect;
	}
	static of(a){
		return new IO( () => a );
	}
	static from(fn){
		return new IO(fn);
	}
	map(fn){
		return new IO( () => fn( this.effect() ));
	}
	run(){return this.effect();}
}

// Usage exemple:

// var read = qS => () => document.querySelector(qS).innerHTML;
// var write = qS => val => document.querySelector(qS).innerHTML = val;
//
// var readTitle = read('#title');
// var writeTitle = write('#title');
//
// IO.from(readTitle).map(_.startCase).map(writeTitle).run();
