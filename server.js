const { request } = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
});

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let randQuote = getRandomElement(quotes);
    let result = {quote: randQuote};
    res.send(result);
});

app.get('/api/quotes/', (req, res, next) => {
    const person = req.query.person;
    if(person === undefined) {
        res.send({quotes: quotes});
    } else {
        const result = quotes.filter(element => element.person === person);
        res.send({quotes: result});
    }
});

app.post('/api/quotes', (req, res, next) => {
    const quote = req.query.quote;
    const person = req.query.person;
    if (quote !== '' || person !== ''){
        const newQuote = {quote: quote, person: person};
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send();
    }
});