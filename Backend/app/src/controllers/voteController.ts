import express, { Request, Response } from 'express';
import * as services from '../services/voteServices';

const router = express.Router()

router.post('/create', async (req: Request, res: Response) => {
    try {
        const { title, description, duration } = req.body;
        const addNewPool = await services.createPool(title, description, duration);

        return res.status(201).json({
            message: 'Voting pool created successfully.',
            addNewPool });

    } catch (error: any) {

        return res.status(400).json({ message: error.message })
    }
});

router.post('/vote', async (req: Request, res: Response) => {
    try {
        const { poolId, option } = req.body;
        const transaction = await services.prepareVote(poolId, option);

        return res.status(200).json({
            message: 'Sign and send this transaction from the voter wallet.', 
            transaction,
        });
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
});

router.get('/results/:id', async (req: Request, res: Response) => {
    try {

        const id = req.params.id;

        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid pool ID.' })}

        const results = await services.getResults(id);
        return res.status(200).json(results);
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
});

export default router;