const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');


//express app

const app = express();
//connect to mongodb
//const dbURI = 'mongodb+srv://hello-one:two12345@nodetuts.941dvsj.mongodb.net/node-tuts?retryWrites=true&w=majority';
//const dbURI = 'mongodb+srv://goodsnews:three123456@nodetuts.941dvsj.mongodb.net/node-tuts?retryWrites=true&w=majority';
const dbURI = 'mongodb+srv://goodsnews:three123456@nodetuts.941dvsj.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology:true})
.then((result) => {
    app.listen('3000');
    console.log("Server listening at port: 3000")
})

.catch((err) => {
    console.log(err)
    console.log("Server error")
});
// register view engine
app.set('view engine', 'ejs');

//lisen for requests

//app.listen(3000);
//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
/*app.get('/add-blog', (req, res) => {
const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
});

blog.save()
  .then((result) =>{
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  });

});

app.get('/all-blogs', (req, res) =>{
    Blog.find()
    .then((result) =>{
        res.send(result);
    })
    .catch((err) =>{
        console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
 Blog.findById()
 .then((result) =>{
    res.send(result)
    
 })
 .catch((err) =>{
    console.log(err);
});
})
*/
// routes


app.get('/', (req, res) => {

    res.redirect('/blogs')
   /* const blogs =[
        {title: 'welcome Management', snippet: 'Certification Training Course  Download Course Contents'},
        {title:   'Program Management', snippet: 'Certification Training Course  Download Course Contents' },
        { title: ' Program Management', snippet: 'Certification Training Course  Download Course Contents'},
    ];
    res.render('index', {title: 'Home', blogs});
    */
   // res.send('<p>home page</p>');
   //res.sendFile('./views/index.html', {root:__dirname});

});



app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});

});


//blog routes
app.use('/blogs',blogRoutes);



//404 page
app.use( (req, res) => {
    res.status('404').render('404', {title: '404'});

    //res.status(404).sendFile('./views/404.html', {root:__dirname})
});