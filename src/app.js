const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//To define path for express config file
const directoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup static directory to serve
app.use(express.static(directoryPath))

//Setup handlers and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req, res ) => {
    res.render('index', {
        title : "I'm the forecast way",
        name : "Gopal Jha"
    })
})

app.get('/weather',(req, res ) => {
    if(!req.query.address){

        return res.send('Please provide an address.')
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, { temperature } = {}) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                temperature,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/about',(req, res ) => {
    res.render('about', {
        title : "Summer days",
        name : "Gopal Jha"
    })
})


app.get('/help',(req, res ) => {
    res.render('help', {
        helpText : "This is a helptext page.",
        title : "Help",
        name :"Gopal Jha"
    })
})

app.get('/help/*',(req, res ) => {
    res.render('404', {
        title : "Help Support",
        name :"Gopal Jha",
        message : "The article help not found."
    })
})

app.get('*',(req, res ) => {
    res.render('404', {
        title : "404 page",
        name :"Gopal Jha",
        message : "Page not found : 404"
    })
})
app.listen('3000', () => {
    console.log('The server is started at port 3000')
})