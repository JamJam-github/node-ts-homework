import express from 'express'
import router from './config/route'
import testRoute from './controller/test'

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    // console.log('nodemon')
    console.log(req.query)
    const {name} = req.query
    res.send(`Hello ${name}`)
});

app.get('/memo', (req, res, next) => {
    console.log(req.query)
    const {name} = req.query
    res.send(`Hello ${name}`)
});


app.use(router);
app.use(testRoute);

app.listen(8080, () => {
    console.log('Server running')
});