const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

//use files from 'public' folder
app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next)=>{
    const randomQuote = getRandomElement(quotes);
    const response = {quote:randomQuote}
    res.status(200).send(response);
})

app.get('/api/quotes', (req, res, next)=>{
    const person = req.query.person;
    if(person){
        const returnQuotes = quotes.filter(quote=>quote.person === person)
        const response = {quotes:returnQuotes}
        res.status(200).send(response);
    } else {
        const response = {quotes:quotes}
        res.status(200).send(response);
    }
})

app.post('/api/quotes', (req, res, next)=>{
    const newQuote = req.query;
    if(newQuote.quote && newQuote.person){
        const pushQuote = {quote:newQuote.quote, person:newQuote.person};
        quotes.push(pushQuote);
        res.status(201).send({quote: pushQuote}); 
    } else {
        res.status(400).send();
    }

})

app.listen(PORT, ()=>{
    console.log("Server.js is listening on port: " + PORT)
})

