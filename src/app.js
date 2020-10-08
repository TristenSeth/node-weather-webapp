const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const pub_dir = path.join(__dirname, "../public")
const views_path = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', views_path)
hbs.registerPartials(partialsPath)

app.use(express.static(pub_dir))


//render handlebars template page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Tristen Nollman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Tristen Nollman"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "This is a help message",
        title: "Help",
        name: "Tristen Nollman"
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        //did not provide address value
        return res.send({
            error: "Please provide an address query."
        })
    }

    //did provide an address, want to geocode it
    geocode(req.query.address, (geo_error, {lat, long, place_name} = {}) => {
        //check for geocoding error
        if (geo_error) {
            return res.send({
                error: geo_error
            })
        }

        //no error, so we have values for lat, long and place_name. Use for forecast
        forecast(lat, long, (forecast_error, {weather_description, temp, real_feel, humidity} = {}) => {
            if (forecast_error) {
                return res.send({
                    error: forecast_error
                })
            }
            res.send({
                address: req.query.address, 
                forecast: "Current weather for " + place_name + " is " + weather_description 
                + " with a temperature of " + temp + " and a real feel of " + real_feel + " and a humidity level of " + humidity             
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        name: 'Tristen Nollman',
        error: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404 Error",
        name: 'Tristen Nollman',
        error: "page not found."
    })
})

//start server on given port
app.listen(port, () => {
    console.log("Server is up and running on " + port + "!")
})