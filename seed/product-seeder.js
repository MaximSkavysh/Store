/**
 * Created by SkavyshM on 10/10/2017.
 */
var Product = require('../models/Category');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shop');

var products =[
    new Product({
        name:'Ремень из кожи питона',
        serial_number:'rfrewf',
        description: 'Awesome Game!!!!',
        full_description:'Blaa bfhfeklfwnrjebnfnfjrhf hhfjinfjireui hhdfikdeyuf',
        price: 10,
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png'

    }),
    new Product({

        name:'Кошелек',
        serial_number:'455drfwrfds',
        description: 'Awesome Game!!!!',
        full_description:'Blaa bfhfeklfwnrjebnfnfjrhf hhfjinfjireui hhdfikdeyuf',
        price: 10,
        imagePath: 'http://eu.blizzard.com/static/_images/games/wow/wallpapers/wall2/wall2-1440x900.jpg'
    }),
    new Product({
        name:'Чехол',
        serial_number:'45rwr5dds',
        description: 'Awesrfome Game!!!!',
        full_description:'Blaa bfhfeklfwnrjebnfnfjrhf hhfjinfjireui hhdfikdeyuf',
        price: 10,
        imagePath: 'https://support.activision.com/servlet/servlet.FileDownload?file=00PU000000Rq6tz'

    })

];
var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}