const express = require('express')
const app = express()
const path = require("path");
const mongoose = require('mongoose')
const collection = require('./mongodb')
app.set('view engine', 'ejs')
const templatepath = path.join(__dirname, '../templates');
app.set("views", templatepath);
app.use(express.static('public'))
const dbURL = ""
mongoose.connect(dbURL)
.then(()=>{
    console.log('connected to database')
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})

app.get('/', (req, res) => {
  res.redirect('/login')
})
app.get('/login', (req, res) => {
    collection.find().then((result)=>{
        res.render('login', { title: 'Home page', blogs: result })
    }).catch((err)=>{
        console.log(err)
    })
  })

app.use(express.urlencoded({ extended: true })) //middleware
app.post('/login',(req,res)=>{
    const data = new collection(req.body)
    data.save().then(()=>{
        res.redirect('./login')
    }).catch((err)=>{
        console.log(err)
    })
  })

app.post('/home',async (req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.name})
        if(check.password == req.body.password){
            res.render('home', { title: 'Home page' })
        }
        else{
            res.redirect('/login')
        }
    }
    catch{
        res.redirect('/login')
    }
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.use((req, res) => {
    res.render('404')
})
