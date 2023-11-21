import "dotenv/config.js";
import express from "express";
import cors from "./middleware/cors.js";
import logs from "./middleware/logs.js";
import error from "./middleware/error.js";
import routes from "./routes/index.js"; 


const app = express();

app.use(express.json());
app.use(cors);
app.use(logs);
app.use("/smart-Cart-project/", routes);
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
