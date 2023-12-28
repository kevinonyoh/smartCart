import "dotenv/config.js";
import express from "express";
import cors from "./middleware/cors.js";
import logs from "./middleware/logs.js";
import error from "./middleware/error.js";
import routes from "./routes/index.js"; 
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors);
app.use(logs);
app.set('view engine', 'ejs');
app.use("", routes);

app.get("/sign")
app.use(error);

app.get('/', (req,res) => res.send('app is working fine!'));


app.get('/health-check', (req, res) => {
    res.json({
        success: true,
        message: 'Smart cart API is working fine!'
    });
});

const Port = process.env.PORT;

app.listen(Port, () => { console.log(`Server running on port ${Port}`) });
