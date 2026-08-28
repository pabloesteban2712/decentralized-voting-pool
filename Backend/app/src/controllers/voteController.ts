import express, { Request, Response } from 'express';
import * as services from '../services/voteServices';

const router = express.Router()

router.post('/create', async (req: Request, res: Response) => {
    try {

        const { title, description, duration, vote, userAlreadyVote } = req.body;

        const addNewPool = await services.createPool(title, description, duration, vote, userAlreadyVote);

        return res.status(200).json({ 
            message: 'Creation succesful', 
            addNewPool });

    } catch (error: any) {

        return res.status(400).json({ message: error.message })
    }
});

router.post('/vote', async (req: Request, res: Response) => {
    try {
        
    } catch (error: any) {
        
        return res.status(400).json({ message: error.message })
    
    }
});

router.get('/results/:id', async (req: Request, res: Response) => {
    try {

    } catch (error: any) {

        return res.status(400).json({ message: error.message })
    
    }
});