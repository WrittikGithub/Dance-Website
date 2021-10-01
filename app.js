const express = require("express");
const { request } = require("https");
const path= require ("path");
const { render } = require("pug");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/DanceContact', {useNewUrlParser: true});
const port = 49674;


//Define Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  var  contact = mongoose.model('contact', contactSchema);


// app.use(express.static('statiic',options));
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//END POINTS
app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug', params);

});
app.get('/contact', (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug', params);
});


app.post('/contact', (req, res)=>{ 
    var Mydata = new contact(req.body)
    Mydata.save().then(()=>{
        res.send("This data has been saved successfuly");
    }).catch(()=>{
        res.status(400).send("Item was not saved")
    });
    //res.status(200).render('contact.pug');
})
//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});