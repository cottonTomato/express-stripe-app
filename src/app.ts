import express from 'express';
import 'express-async-errors';
import { join } from 'path';
import dotenv from 'dotenv';
import { paymentController } from './controllers/stripeController';
import { notFoundHandler, errorHandler } from './middleware';

dotenv.config();

const port = process.env.PORT ?? 8080;
const staticPath = join(__dirname, '../public');

const app = express();

app.use(express.json());
app.use(express.static(staticPath));

app.get('/', function (req, res) {
    const indexPath = join(staticPath + '/index.html');
    res.sendFile(indexPath);
});

app.post('/stripe', paymentController);

app.use(notFoundHandler);
app.use(errorHandler);

function startServer() {
    try {
        app.listen(port, () => {
            console.log(`Server Listening to port: ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
}

startServer();
