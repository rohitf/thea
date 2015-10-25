var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Initialize Schema

var phraseSchema = new Schema ({  //LATER - Trim schema
    phrase: { type: String, lowercase: true },
    links: Array
});

module.exports = mongoose.model('phraseCollection', phraseSchema,'Phrases');