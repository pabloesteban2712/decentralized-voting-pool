import express, { Request, Response } from 'express';
import * as services from '../services/userServices';

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
    try {

        const { name, username, mail, password } = req.body;

        const addNewUser = await services.createUser(name, username, mail, password);

        return res.status(200).json({
            message: 'Creation succesful', 
            addNewUser });

    } catch (error: any) {

        return res.status(400).json({ message: error.message })
    }
})

router.post('/login', async (req: Request, res: Response) => {
    try {

        const { username, password } = req.body;

        const { accessToken, refreshToken } = await services.logInUser(username, password)

        return res.status(200).json
            ({
                message: 'LogIn succesful',
                accessToken,
                refreshToken
            })

    } catch (error: any) {

        return res.status(400).json({ message: error.message })
    }
})

router.post('/refresh', async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'No refresh token '});
        }

        const newAccessToken = await services.refreshAccessToken(refreshToken);

        return res.status(200).json({
            accessToken: newAccessToken
        });

    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }

})

export default router;