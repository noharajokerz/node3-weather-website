const express = require('express');
let path = require('path');
let hbs = require('hbs');
let geoCode = require('./util/geocode');
let forecast = require('./util/forecast');

const app = express();

// Define paths for Express configs
let publicDirPath = path.join(__dirname,'../public')
let viewPath = path.join(__dirname,'../templates/views') // เปลี่ยนให้ hbs มอง path ที่ไม่ใช่ default 
let partialsPath = path.join(__dirname,'../templates/partials') 

// Setting up handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// Setting up static directory to serve
app.use(express.static(publicDirPath)); // it default location is 'views'

app.get('', (req, res, next) => {

    // res.send('<h1>Weather app<h1>');
    // Lec 47

    res.render('index',{title: 'Weather',name: 'Nohara Joker'})

});

app.get('/about', (req, res, next) => {
    // Lec 47 For call render hbs file
    res.render('about',{title: 'About me',name: 'Nohara Joker'});

});

app.get('/help', (req, res, next) => {
    // Lec 47 For call render hbs file
    res.render('help',{
                        title: 'Help',
                        helpText: 'This is sime helpful text.',
                        name: 'Nohara JokerZ'
                        }
    );

});

app.get('/help/*',(req, res, next)=>{
    res.render('404',{
                        title: '404',
                        name: 'Nohara Joker',
                        errorMessage: 'Article not found.'
                     }
    );
});

// #Lec45 comment เพื่อให้เวลาเรียก Link ตัว Express จะพ่น HTML จากคำสั่ง express.static(publicDirPath)
// app.get('/help', (req, res, next) => {

//     res.json([{name: 'joker',location: 'Bangkok'},{name: 'Fern',location: 'Bangkok'}]);

// });

// app.get('/about', (req, res, next) => {

//     res.send('about');

// });

app.get('/weather', (req, res, next) => {

    // Validate Data
    if(!req.query.address) {
        return res.send({
            error: 'You have to provide address.'
        });
    }
    
    geoCode(req.query.address, (error,resGeoData)=>{

        if (error) {
            return res.send({error});
        }

        let {latitude,longitude,location} = resGeoData;

        forecast(latitude,longitude,(error,resForecast)=>{
            
            if (error) {
                return res.send({error});
            }

            res.send({
                        forcast: resForecast,
                        location,
                        address: req.query.address
                    });

        });

    });

    // res.send({
    //     Forcast: 'rainy',
    //     location: 'Bangkok',
    //     address: req.query.address
    // });

});


app.get('/products',(req,res)=>{
    // Lec54

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term.'
        });

        // การใส่ return จะเป็นการ stop การทำงาน fn คือ code ด้านล่างจะไม่ทำงานต่อ
    }

    console.log(req.query);

    res.send({
        product: []
    });
});

app.get('*',(req, res, next)=>{
    res.render('404',{
                        title: '404',
                        name: 'Nohara Joker',
                        errorMessage: 'Page not found.'
                     }
    );

});

app.listen(3000,()=> {

    console.log('Server is up on port 3000')

});