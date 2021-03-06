const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
//Paths for express
console.log("This is a test")
const pubPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '/partials')
const viewsPath = path.join(__dirname, './views')
const port = process.env.PORT || 3000



app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(pubPath))

app.get('', (req, res) =>{

    res.render('index', {
        title: 'What is the weather? ',
    }) 
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
    } )
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(data.latitude, data.longitude , (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location: data.location,
                forcast : forecastData
            })
        } )
    })

})

app.get('/products', (req,res) =>{

    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        producst: []
    })
})

app.get('*', (req, res) =>{
    res.render('404',{
        title: '404 webpage not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})