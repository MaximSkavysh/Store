/**
 * Created by SkavyshM on 10/17/2017.
 */
console.log('This script populates a some test products, authors, genres and categories to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

//Get arguments passed on command line
var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

var async = require('async')
var Product = require('./models/Product')

var Category = require('./models/Category')


var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));


var products = []
var categories = []


function productCreate(name, serial_number, description, full_description, price, imagePath, cb) {
    productDetail = {
        name: name,
        serial_number: serial_number,
        description: description,
        fill_description: full_description,
        price: price,
        imagePath: imagePath
    }
    

    var product = new Product(productDetail);
    product.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log('New Product: ' + product);
        products.push(product)
        cb(null, product)
    }  );
}

function categoryInstanceCreate(product, categoryName,  status, cb) {
    categoryDetail = {
        product: product,
        categoryName: categoryName,
        status: status
    }


    var category = new Category(categoryDetail);
    category.save(function (err) {
        if (err) {
            console.log('ERROR CREATING category: ' + category);
            cb(err, null)
            return
        }
        console.log('New category: ' + category);
        categories.push(category)
        cb(null, product)
    }  );
}
/////////////////////////////////////////////////////////////to do below

function createBooks(cb) {
    async.parallel([
            function(callback) {
                productCreate('The Name of the Wind (The Kingkiller Chronicle, #1)', 'I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.', '9781473211896', authors[0], [genres[0],], callback);
            },
            function(callback) {
                productCreate("The Wise Man's Fear (The Kingkiller Chronicle, #2)", 'Picking up the tale of Kvothe Kingkiller once again, we follow him into exile, into political intrigue, courtship, adventure, love and magic... and further along the path that has turned Kvothe, the mightiest magician of his age, a legend in his own time, into Kote, the unassuming pub landlord.', '9788401352836', authors[0], [genres[0],], callback);
            },
            function(callback) {
                productCreate("The Slow Regard of Silent Things (Kingkiller Chronicle)", 'Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms. A young woman lives there, tucked among the sprawling tunnels of the Underthing, snug in the heart of this forgotten place.', '9780756411336', authors[0], [genres[0],], callback);
            },
            function(callback) {
                productCreate("Apes and Angels", "Humankind headed out to the stars not for conquest, nor exploration, nor even for curiosity. Humans went to the stars in a desperate crusade to save intelligent life wherever they found it. A wave of death is spreading through the Milky Way galaxy, an expanding sphere of lethal gamma ...", '9780765379528', authors[1], [genres[1],], callback);
            },
            function(callback) {
                productCreate("Death Wave","In Ben Bova's previous novel New Earth, Jordan Kell led the first human mission beyond the solar system. They discovered the ruins of an ancient alien civilization. But one alien AI survived, and it revealed to Jordan Kell that an explosion in the black hole at the heart of the Milky Way galaxy has created a wave of deadly radiation, expanding out from the core toward Earth. Unless the human race acts to save itself, all life on Earth will be wiped out...", '9780765379504', authors[1], [genres[1],], callback);
            },
            function(callback) {
                productCreate('Test Product 1', 'Summary of test product 1', 'ISBN111111', authors[4], [genres[0],genres[1]], callback);
            },
            function(callback) {
                productCreate('Test Product 2', 'Summary of test product 2', 'ISBN222222', authors[4], false, callback)
            }
        ],
        // optional callback
        cb);
}


function createBookInstances(cb) {
    async.parallel([
            function(callback) {
                categoryInstanceCreate(products[0], 'London Gollancz, 2014.', false, 'Available', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[1], ' Gollancz, 2011.', false, 'Loaned', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[2], ' Gollancz, 2015.', false, false, callback)
            },
            function(callback) {
                categoryInstanceCreate(products[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
            },
            function(callback) {
                categoryInstanceCreate(products[0], 'Imprint XXX2', false, false, callback)
            },
            function(callback) {
                categoryInstanceCreate(products[1], 'Imprint XXX3', false, false, callback)
            }
        ],
        // optional callback
        cb);
}



async.series([
        createBooks,
        createBookInstances
    ],
// optional callback
    function(err, results) {
        if (err) {
            console.log('FINAL ERR: '+err);
        }
        else {
            console.log('BOOKInstances: '+categories);

        }
        //All done, disconnect from database
        mongoose.connection.close();
    });
