import express, { Application } from 'express';
import router from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const PORT: number = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("" + process.env.DB_URL).then(() => {
    console.log("database connected");
});

app.use('/api', router);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running`);
});