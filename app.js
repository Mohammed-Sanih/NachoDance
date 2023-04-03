const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const app= express();
var mongoose= require("mongoose")
const port = 8000;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  var Contact = mongoose.model('Contact', contactSchema); 

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.set('view engine','pug')
app.set('views',path.join(__dirname, 'views'))

app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug');
});
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug');
});
app.get('/about',(req,res)=>{
    const params = {}
    res.status(200).render('about.pug');
});
app.get('/package',(req,res)=>{
    const params = {}
    res.status(200).render('package.pug');
});
app.get('/info',(req,res)=>{
    const params = {}
    res.status(200).render('info.pug');
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send("item have been saved")
    }).catch(()=>{
        res.send("item was not saved")
    })
});


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});