const express = require("express");
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'))

app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method}, ${req.url}`
    fs.appendFile('server.log', log + '/n',(err)=>{
        if (err) {
            console.log(err)
        }
    })
next()
})

// app.use((req, res, next)=>{
//     res.send('<h1> This site is currently undergoing maintenance </h1>')
// })



hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
  });


app.get("/", (req, res)=>{
  res.render('index', ({
    pageTitle: 'Home',
    welcomeMessage: 'Welcome to my website'
  }))
})

app.get('/about', (req, res)=>{
    res.render('about.hbs', ({
        pageTitle: 'about',
       
    }))
})

app.get('/projects', (req, res)=>{
    res.render('projects.hbs', ({
        pageTitle: 'projects',
        message: 'My Projects'
    }))
})

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Page Not Found',
        anotherMessage: 'Checking the json format'
    })
})

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})