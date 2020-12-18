const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

let schema = mongoose.Schema({
    name: String
});
schema.metods.meow = function() {
    console.log(this.get('name'));
};

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });

kitty.save(function(error, kitty, affected) {
    console.log('meow');
});