const express = require('express')
const path    = require('path')
const hbs     = require("hbs")

const forecast = require("./utils/forecast")

const app = express()

//define paths for Express config
const publicPath   = path.join(__dirname,"../public")
const viewsPath    = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//setup hanldebars,views and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.get('', (req, res) => {
    res.render(
        'index',
        {
            title : 'Weather',
            author: 'Devil In The Heaven'
              
        }
    )
})

app.get('/help',(req,res)=>{
    res.render(
        'help',
        {
            title : "Help",
            author: 'Devil In The Heaven'

        }
    )
})

app.get('/about',(req,res)=>{
   res.render(
       'about',
       {
           title : "About",
           author: 'Devil In The Heaven'

       }
   )
})

app.get('/weather',(req,res)=>{
    if (!((req.query.longitude)&&(req.query.latitude))){
        return res.send(
            {
                error : "longitude & latitude must be provided"
            }
        )
    }
        
    forecast.forecasting(
        req.query.longitude , 
        req.query.latitude ,
        (error,data)=>
        {
            if(error){
                return res.send(
                    {
                        error : error
                    }
                )}
            res.send (
                {
                    data :data
                }
            )
        }
    )
       
})

app.get('/help/*', (req,res)=>{
    res.send("Help Article Not Found")
})


app.get('*', (req,res)=>{
    res.render('404',
    {
        title: "404",
        author: "Devil In the Heaven",
        errorMessage: "Page Not Found"

    }
    )
})

app.listen(3000,()=>{
    console.log("server started at port 3000")
})