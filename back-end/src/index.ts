import express, { Application } from 'express';
import router from './routes';
import mongoose from 'mongoose';

const app: Application = express();
const PORT: number = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/todo').then(() => {
    console.log("database connected at port 27017");
});

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});