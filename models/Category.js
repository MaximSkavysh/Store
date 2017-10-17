/**
 * Created by SkavyshM on 10/2/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    product: [{type: Schema.ObjectId, ref: 'Product',required: true}],
    categoryName:{type: String, required: true},
    status: {type: String, required: true, enum:['Available','Coming soon','Sold','Under the order'], default:'Sale'}

});

/*categorySchema.virtual('url').get(function(){
    return 'index/'+this._id;
});*/

module.exports = mongoose.model('Category',categorySchema);