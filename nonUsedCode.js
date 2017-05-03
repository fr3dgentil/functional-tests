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

var findCheese = id => MongoClient.connect(url, function(err, db) {
	db.collection('cheese').find({CheeseId: id}).toArray(function(err, docs) {

			Either.of(docs).filter(isNotEmpty).
      map(arr => arr.map(x => x.CheeseNameFr)).map(removeEmpty)
			console.log('db');

	});
	db.close();
	return 'hehe';
});

console.log( findCheese(629) );

for (var i = 0; i < 100; i++) {
	console.log(i);
}
