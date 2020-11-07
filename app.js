const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");



});


app.post("/", (req, res) => {
    const query = "https://api.openweathermap.org/data/2.5/weather?"
    const unit = "metric";
    const apiKey = "c7eddd19e344cc2c2e431cb88e5d0184";
    const city = req.body.cityName;
    const country = req.body.countryName;
    const url = query + "q=" + city + "," + country + "&units=" + unit + "&appid=" + apiKey;
    https.get(url, (resp) => {

        console.log(resp.statusCode);
        resp.on('data', (data) => {

            const converted = JSON.parse(data);
            const descrip = converted.weather[0].description;
            const temp = converted.main.temp;
            const icon = converted.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"



            res.write("<h1>Temperature in "+city+ " is " + temp + " Degree Celcius </h1>");
            res.write("<h1>Weather Description of " + city+ " is " + descrip+ "</h1>");
            res.write("<img src=" + imgUrl + ">");
            res.send();
        });
    })

})
app.listen(8080, () => {
    console.log("Running On Port 8080!");
})