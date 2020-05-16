let express = require('express');
let bodyParser = require('body-parser')
let app = express();

//setting server port 
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

// array that would be moved to DB
let resturants = [
    {name: 'KFC', image: 'https://www.joc.com/sites/default/files/field_feature_image/KFC_0.png'},
    {name: 'McDonalds', image: 'https://images.dailyhive.com/20200414055957/mcdonalds.jpeg'},
    {name: 'A&W', image: 'https://www.awfranchising.com/wp-content/uploads/2018/05/14263996_10154100819938075_8542279236289727642_n.png'}
]

//setting server to view ejs
app.set('view engine', 'ejs')

app.post('/resturants', function(req, res){
    let name = req.body.name;
    let image = req.body.image;
    let newResturant = {name: name, image: image}

    // adding new resturant from NEW resturantS ROUTE to resturant array
    resturants.push(newResturant)
    //redirects to resturants showing the added resturants
    res.redirect('/resturants');

})
// turning server on 
app.listen(PORT, () => console.log(`Yelp Server running on port ${PORT}`));

// resturants page 
app.get('/resturants', function(req, res){
   
    res.render('resturants', {resturants: resturants})
})


app.get('/resturants/new', function(req, res){
    res.render('new.ejs')
})

// setting landing page route
app.get('/', function(req, res){
    res.render('landing')
})



