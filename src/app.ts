import express from 'express'
import memoRoute from './services/memos/route'
import userRoute from './services/users/route';
import replyRoute from './services/replys/route';

const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));

app.get("/", (req, res) => {
    res.json({message: "Welcome to my application."});
});


app.use("/memos", memoRoute);
app.use("/users", userRoute);
app.use("/replys", replyRoute);

app.listen(8080, () => {
    console.log('Server running')
});