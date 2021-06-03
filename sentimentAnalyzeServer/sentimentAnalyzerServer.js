const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY
    let api_url = process.env.API_URL

    const NLUv1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth')

    return new NLUv1({
        version: "2020-08-01",
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
}


const app = new express();
const NLUInstance = getNLUInstance();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    NLUInstance.analyze({
        language: 'en',
        url: req.query.url,
        features: {
            emotion: {}
        }
    }).then(response => {
        return res.send(response.result.emotion.document.emotion)
    }).catch(err => {
        return res.send(err);
    });
});

app.get("/url/sentiment", (req, res) => {
    NLUInstance.analyze({
        language: 'en',
        url: req.query.url,
        features: {
            sentiment: {}
        }
    }).then(response => {
        return res.send(response.result.sentiment.document.label)
    }).catch(err => {
        return res.send(err);
    });
});

app.get("/text/emotion", (req, res) => {
    NLUInstance.analyze({
        language: 'en',
        text: req.query.text,
        features: {
            emotion: {}
        }
    }).then(response => {
        return res.send(response.result.emotion.document.emotion)
    }).catch(err => {
        return res.send(err);
    });
});

app.get("/text/sentiment", (req, res) => {
    NLUInstance.analyze({
        language: 'en',
        text: req.query.text,
        features: {
            sentiment: {}
        }
    }).then(response => {
        return res.send(response.result.sentiment.document.label)
    }).catch(err => {
        console.log(err);
        return res.send(err);
    });;
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

