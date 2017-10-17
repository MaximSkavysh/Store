/**
 * Created by SkavyshM on 10/16/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: {type: String, required :true},
    serial_number: {type: String, required :true},
    description: {type: String, required :true},
    full_description: {type: String, required :false},
    price: {type: Number, required: true},
    imagePath:{type:String, required:true}

});

productSchema.virtual('url').get(function(){
    return 'index' + this._id;
});


module.exports = mongoose.model('Product',productSchema);