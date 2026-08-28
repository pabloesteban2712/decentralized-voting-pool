import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import userRoutes from './controllers/userControllers';

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/app', userRoutes)

app.get('/app/', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "Server is running!"
    })    
});

app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}/app/`);
});